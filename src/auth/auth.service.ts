import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      // Check if the email already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }

      // Generate the password hash
      const hash = await argon.hash(dto.password);

      // Save the new user in the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // Return the signed JWT token
      return this.signToken(user.id, user.email);
    } catch (error) {
      // Prisma known error: unique constraint violation
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }

      // Catch other Prisma errors or unexpected issues
      console.error('Error during signup:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async signin(dto: AuthDto) {
    try {
      // Find the user by email
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      // If the user does not exist, throw an exception
      if (!user) {
        throw new UnauthorizedException('Credentials Incorrect');
      }

      // Compare passwords
      const pwMatches = await argon.verify(user.hash, dto.password);

      // If the password is incorrect, throw an exception
      if (!pwMatches) {
        throw new UnauthorizedException('Credentials Incorrect');
      }

      // Return the signed JWT token
      return this.signToken(user.id, user.email);
    } catch (error) {
      console.error('Error during signin:', error);
      throw error;
    }
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');

    // Sign the JWT token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret, // Use secret from environment variables
    });

    return { access_token: token };
  }
}

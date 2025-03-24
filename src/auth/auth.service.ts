import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';  // Corrected import for PrismaClientKnownRequestError
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: AuthDto) {
        try {
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
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    // Handle unique constraint violation error for the email field
                    throw new ForbiddenException('Credentials taken');
                }
            }
            // Re-throw error if it wasn't a Prisma known request error
            throw error;
        }
    }

    async signin(dto: AuthDto) {
        // Find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,  // Ensure email is marked as @unique in Prisma schema
            },
        });

        // If the user does not exist, throw an exception
        if (!user) {
            throw new ForbiddenException('Credentials Incorrect');
        }

        // Compare passwords
        const pwMatches = await argon.verify(user.hash, dto.password);

        // If the password is incorrect, throw an exception
        if (!pwMatches) {
            throw new ForbiddenException('Credentials Incorrect');
        }

        // Return the signed JWT token
        return this.signToken(user.id, user.email);
    }

    // Method to sign and return the JWT token
    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };

        const secret = this.config.get('JWT_SECRET');  // Use the secret from environment variables

        // Sign the JWT token with the payload and secret
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,  // Use the secret from the environment
        });

        return {
            access_token: token,
        };
    }
}

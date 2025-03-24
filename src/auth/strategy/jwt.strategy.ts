import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from '../../prisma/prisma.service';
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private config: ConfigService, 
        private prisma: PrismaService,
    ) {
        // Always ensure that the JWT_SECRET is set properly in the environment variables
        const jwtSecret = config.get('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set.');
        }
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret, // Use the JWT secret from environment variables
        });
    }

    async validate(payload: { sub: number; email: string }) {
        // Find the user based on the provided 'sub' (user ID) from the JWT payload
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        // If the user is not found, throw an UnauthorizedException
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // Omit sensitive information like the password hash
        const { hash, ...userWithoutHash } = user;

        // Return only the necessary information to be added to the request object
        return { userId: payload.sub, email: payload.email, user: userWithoutHash };
    }
}

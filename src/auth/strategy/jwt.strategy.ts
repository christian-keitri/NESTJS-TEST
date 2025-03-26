import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from '../../prisma/prisma.service';
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
         config: ConfigService, 
        private prisma: PrismaService,
    ) {
        const jwtSecret = config.get('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set.');
        }
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret, 
        });
    }

    async validate(payload: { sub: number; email: string }) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            const { hash, ...userWithoutHash } = user;
            return { userId: payload.sub, email: payload.email, user: userWithoutHash };
        } catch (error) {
            throw new UnauthorizedException('User authentication failed');
        }
    }
}

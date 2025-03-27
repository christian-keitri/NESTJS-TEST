import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //make sure that its all imported in app module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  
})
export class PrismaModule {}

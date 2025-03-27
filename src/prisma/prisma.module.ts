<<<<<<< HEAD
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //make sure that its all imported in app module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  
})
export class PrismaModule {}
=======
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //make sure that its all imported in app module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  
})
export class PrismaModule {}
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284

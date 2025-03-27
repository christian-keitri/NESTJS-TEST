<<<<<<< HEAD
import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateBookmarkDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    @IsNotEmpty()
    link: string;
  }
=======
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBookmarkDto {
    
    @IsString()
    @IsNotEmpty()
    title: string
    
    @IsString()
    @IsOptional()
    description?: string
   
    @IsString()
    @IsNotEmpty()
    link: string
}
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284

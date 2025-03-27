<<<<<<< HEAD
import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class EditBookmarkDto {
    @IsString()
    @IsOptional()
    title?: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    @IsOptional()
    link?: string;
  }
=======
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditBookmarkDto {
    
    @IsString()
    @IsOptional()
    title?: string
    
    @IsString()
    @IsOptional()
    description?: string
   
    @IsString()
    @IsOptional()  //for validation to know 
    link?: string //for typescript to know 
}
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284

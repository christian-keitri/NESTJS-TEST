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

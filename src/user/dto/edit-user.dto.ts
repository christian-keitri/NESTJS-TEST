import { IsEmail, IsOptional, IsString } from "class-validator"

export  class EditUserDto {
    @IsEmail ()
    @IsOptional()
    email?: string;

    @IsString ()
    @IsOptional ()
<<<<<<< HEAD
    firstName? : string;
=======
    firstname? : string;
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284

    @IsString()
    @IsOptional()
    lastname?: string;
}
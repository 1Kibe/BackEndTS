import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsEmailUnique } from 'src/Validation/Is-email-unique';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @Length(3, 255)
  nome: string;

  @IsEmailUnique()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 255)
  senha: string;
  
}

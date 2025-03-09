import { IsNotEmpty, Length } from 'class-validator';

export class CreateUniversidadeDto {
  @IsNotEmpty()
  @Length(3, 255)
  nome: string;

  @IsNotEmpty()
  @Length(14, 18)
  CNPJ: string;
}

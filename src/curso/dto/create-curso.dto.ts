import { IsNotEmpty, Length } from 'class-validator';

export class CreateCursoDto {
  @IsNotEmpty()
  @Length(3, 255)
  nome: string;

  @IsNotEmpty()
  @Length(1, 255)
  CargaHoraria: number;
}
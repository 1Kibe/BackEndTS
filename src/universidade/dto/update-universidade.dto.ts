import { PartialType } from '@nestjs/mapped-types';
import { CreateUniversidadeDto } from './create-universidade.dto';

export class UpdateUniversidadeDto extends PartialType(CreateUniversidadeDto) {}

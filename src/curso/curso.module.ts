import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { Prismamodule } from '../prisma/prisma.module';

@Module({
imports: [Prismamodule],
controllers: [CursoController],
providers: [CursoService],
})
export class CursoModule {}

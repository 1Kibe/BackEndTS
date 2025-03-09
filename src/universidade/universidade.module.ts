import { Module } from '@nestjs/common';
import { UniversidadeService } from './universidade.service';
import { UniversidadeController } from './universidade.controller';
import { Prismamodule } from '../prisma/prisma.module';

@Module({
  imports: [Prismamodule],
  controllers: [UniversidadeController],
  providers: [UniversidadeService],
})
export class UniversidadeModule {}

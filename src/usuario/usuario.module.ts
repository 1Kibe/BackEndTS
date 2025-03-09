import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Prismamodule } from 'src/prisma/prisma.module';

@Module({
  imports:[Prismamodule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports:[]
})
export class UsuarioModule {}
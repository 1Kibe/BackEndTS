import { BadGatewayException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    try {
      return await this.prisma.usuario.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuário por e-mail: ' + error.message);
    }
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExists = await this.findByEmail(createUsuarioDto.email);

    if (usuarioExists) {
      throw new BadGatewayException('Já existe um usuário com este e-mail');
    }

    try {
      return await this.prisma.usuario.create({
        data: {
          nome: createUsuarioDto.nome,
          email: createUsuarioDto.email,
          senha: createUsuarioDto.senha,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar usuário: ' + error.message);
    }
  }

  // Outros métodos...
}
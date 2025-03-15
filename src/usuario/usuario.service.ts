import { BadGatewayException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.usuario.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuários: ' + error.message);
    }
  }

  async findOne(id: number) {
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: { id },
      });
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
      return usuario;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuário: ' + error.message);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const usuario = await this.prisma.usuario.update({
        where: { id },
        data: updateUsuarioDto,
      });
      return usuario;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar usuário: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.usuario.delete({
        where: { id },
      });
      return { message: 'Usuário removido com sucesso' };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao remover usuário: ' + error.message);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.usuario.findUnique({
        where: { email: email },
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
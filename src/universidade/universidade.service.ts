import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUniversidadeDto } from './dto/create-universidade.dto';
import { UpdateUniversidadeDto } from './dto/update-universidade.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UniversidadeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUniversidadeDto: CreateUniversidadeDto) {
    try {
      return await this.prisma.universidade.create({
        data: {
          nome: createUniversidadeDto.nome,
          CNPJ: createUniversidadeDto.CNPJ
        },
      });
    } catch (error) { 
      throw new Error('Erro ao criar universidade: ' + error.message);
    }
  }

  async findAll() {
    return this.prisma.universidade.findMany();
  }

  async findOne(id: number) {
    const universidade = await this.prisma.universidade.findUnique({
      where: { id },
    });

    if (!universidade) {
      throw new NotFoundException(`Universidade com ID ${id} não encontrada`);
    }

    return universidade;
  }

  async update(id: number, updateUniversidadeDto: UpdateUniversidadeDto) {
    await this.findOne(id);

    try {
      return await this.prisma.universidade.update({
        where: { id },
        data: updateUniversidadeDto,
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar universidade: ${error.message}`);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.universidade.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Erro ao remover universidade: ${error.message}`);
    }
  }
}

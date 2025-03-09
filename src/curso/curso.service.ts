import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CursoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCursoDto: CreateCursoDto) {
    try {
      return await this.prisma.curso.create({
        data: {
          nome: createCursoDto.nome,
          CargaHoraria: Number(createCursoDto.CargaHoraria),
        },
      });
    } catch (error) {
      throw new Error('Erro ao criar curso: ' + error.message);
    }
  }

  async findAll() {
    return this.prisma.curso.findMany();
  }

  async findOne(id: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { id },
    });

    if (!curso) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }

    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    await this.findOne(id);

    try {
      return await this.prisma.curso.update({
        where: { id },
        data: updateCursoDto,
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar curso: ${error.message}`);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.curso.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Erro ao remover curso: ${error.message}`);
    }
  }
}
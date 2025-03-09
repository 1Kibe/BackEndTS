import { Injectable, NotFoundException } from '@nestjs/common'; // ✅ Importação corrigida
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
          CargaHoraria: createCursoDto.CargaHoraria
        },
      });
    } catch (error) { 
      throw new Error('Erro ao criar curso: ' + error.message); // ✅ Corrigida mensagem de erro
    }
  }

  async findAll() {
    return this.prisma.curso.findMany();
  }

  async findOne(id: number) { // ✅ Mudado de `string` para `number`
    const curso = await this.prisma.curso.findUnique({
      where: { id },
    });

    if (!curso) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }

    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) { // ✅ Mudado de `string` para `number`
    await this.findOne(id); // Verifica se o curso existe antes de atualizar

    try {
      return await this.prisma.curso.update({
        where: { id },
        data: updateCursoDto,
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar curso: ${error.message}`);
    }
  }

  async remove(id: number) { // ✅ Mudado de `string` para `number`
    await this.findOne(id); // Verifica se o curso existe antes de remover

    try {
      return await this.prisma.curso.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Erro ao remover curso: ${error.message}`);
    }
  }
}

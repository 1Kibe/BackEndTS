import { BadGatewayException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUniversidadeDto } from './dto/create-universidade.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUniversidadeDto } from './dto/update-universidade.dto';

@Injectable()
export class UniversidadeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.universidade.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar universidades: ' + error.message);
    }
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
      throw new InternalServerErrorException('Erro ao atualizar universidade: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.prisma.universidade.delete({
        where: { id },
      });
      return { message: 'Universidade removida com sucesso' };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao remover universidade: ' + error.message);
    }
  }

  async findByCNPJ(CNPJ: string) {
    try {
      return await this.prisma.universidade.findUnique({
        where: { CNPJ },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar universidade por CNPJ: ' + error.message);
    }
  }

  async create(createUniversidadeDto: CreateUniversidadeDto) {
    const universidadeExists = await this.findByCNPJ(createUniversidadeDto.CNPJ);

    if (universidadeExists) {
      throw new BadGatewayException('Já existe uma universidade com este CNPJ');
    }

    try {
      return await this.prisma.universidade.create({
        data: {
          nome: createUniversidadeDto.nome,
          CNPJ: createUniversidadeDto.CNPJ,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar universidade: ' + error.message);
    }
  }

  // Outros métodos...
}
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniversidadeService } from './universidade.service';
import { CreateUniversidadeDto } from './dto/create-universidade.dto';
import { UpdateUniversidadeDto } from './dto/update-universidade.dto';

@Controller('universidade')
export class UniversidadeController {
  constructor(private readonly universidadeService: UniversidadeService) {}

  @Post()
  create(@Body() createUniversidadeDto: CreateUniversidadeDto) {
    return this.universidadeService.create(createUniversidadeDto);
  }

  @Get()
  findAll() {
    return this.universidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universidadeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniversidadeDto: UpdateUniversidadeDto) {
    return this.universidadeService.update(+id, updateUniversidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universidadeService.remove(+id);
  }
}

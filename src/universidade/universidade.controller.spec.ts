import { Test, TestingModule } from '@nestjs/testing';
import { UniversidadeController } from './universidade.controller';
import { UniversidadeService } from './universidade.service';

describe('UniversidadeController', () => {
  let controller: UniversidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversidadeController],
      providers: [UniversidadeService],
    }).compile();

    controller = module.get<UniversidadeController>(UniversidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

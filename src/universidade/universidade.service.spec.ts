import { Test, TestingModule } from '@nestjs/testing';
import { UniversidadeService } from './universidade.service';

describe('UniversidadeService', () => {
  let service: UniversidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversidadeService],
    }).compile();

    service = module.get<UniversidadeService>(UniversidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LawService } from './law.service';

describe('LawService', () => {
  let service: LawService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LawService],
    }).compile();

    service = module.get<LawService>(LawService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

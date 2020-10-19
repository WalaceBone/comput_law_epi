import { Test, TestingModule } from '@nestjs/testing';
import { LawController } from './law.controller';

describe('Law Controller', () => {
  let controller: LawController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LawController],
    }).compile();

    controller = module.get<LawController>(LawController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

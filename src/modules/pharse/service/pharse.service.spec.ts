import { Test, TestingModule } from '@nestjs/testing';
import { PharseService } from './pharse.service';

describe('PharseService', () => {
  let service: PharseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PharseService],
    }).compile();

    service = module.get<PharseService>(PharseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

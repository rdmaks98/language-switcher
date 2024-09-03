import { Test, TestingModule } from '@nestjs/testing';
import { PharseController } from '../pharse.controller';
import { PharseService } from '../service/pharse.service';

describe('PharseController', () => {
  let controller: PharseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharseController],
      providers: [PharseService],
    }).compile();

    controller = module.get<PharseController>(PharseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

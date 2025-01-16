import { Test, TestingModule } from '@nestjs/testing';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';

describe('ApplyController', () => {
  let applyController: ApplyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApplyController],
      providers: [ApplyService],
    }).compile();

    applyController = app.get<ApplyController>(ApplyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(applyController.getHello()).toBe('Hello World!');
    });
  });
});

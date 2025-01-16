import { Test, TestingModule } from '@nestjs/testing';
import { GrantController } from './grant.controller';
import { GrantService } from './grant.service';

describe('GrantController', () => {
  let grantController: GrantController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GrantController],
      providers: [GrantService],
    }).compile();

    grantController = app.get<GrantController>(GrantController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(grantController.getHello()).toBe('Hello World!');
    });
  });
});

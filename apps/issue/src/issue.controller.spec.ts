import { Test, TestingModule } from '@nestjs/testing';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

describe('IssueController', () => {
  let issueController: IssueController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IssueController],
      providers: [IssueService],
    }).compile();

    issueController = app.get<IssueController>(IssueController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(issueController.getHello()).toBe('Hello World!');
    });
  });
});

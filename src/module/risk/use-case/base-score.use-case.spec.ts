import { Test, TestingModule } from '@nestjs/testing';
import {
  RiskAnswers,
  UserAttributes,
} from 'src/module/insurance/entities/user-attributes.entity';
import { BaseScoreUseCase } from './base-score.use-case';

describe('BaseScoreUseCase', () => {
  let usecase: BaseScoreUseCase;
  let userAttributes: UserAttributes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseScoreUseCase],
    }).compile();

    usecase = module.get<BaseScoreUseCase>(BaseScoreUseCase);
    userAttributes = new UserAttributes();
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  test.each([
    { answer: [1, 0, 1], expected: 2 },
    { answer: [1, 1, 1], expected: 3 },
    { answer: [0, 0, 0], expected: 0 },
    { answer: [0, 1, 0], expected: 1 },
  ])(
    'should calculate base score from $answer',
    async ({ answer, expected }) => {
      userAttributes.riskQuestions = answer as RiskAnswers;
      const baseScore = await usecase.execute(userAttributes);
      expect(baseScore).toBe(expected);
    },
  );
});

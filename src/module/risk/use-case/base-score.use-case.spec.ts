import { Test, TestingModule } from '@nestjs/testing';
import {
  RiskAnswers,
  PersonalInformation,
} from 'src/module/insurance/entities/personal-information.entity';
import { BaseScoreUseCase } from './base-score.use-case';

describe('BaseScoreUseCase', () => {
  let usecase: BaseScoreUseCase;
  let personalInformation: PersonalInformation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseScoreUseCase],
    }).compile();

    usecase = module.get<BaseScoreUseCase>(BaseScoreUseCase);
    personalInformation = new PersonalInformation();
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
      personalInformation.riskQuestions = answer as RiskAnswers;
      const baseScore = await usecase.execute(personalInformation);
      expect(baseScore).toBe(expected);
    },
  );
});

import { Test, TestingModule } from '@nestjs/testing';
import { PersonalInformationDto } from 'src/module/insurance/dto/personal-information.dto';
import { RiskAnswers } from 'src/module/insurance/entities/personal-information.entity';
import { mapDto } from 'src/module/insurance/map/personal-information.map';
import { fake } from 'test/mock';
import { BaseScoreUseCase } from './base-score.use-case';

describe('BaseScoreUseCase', () => {
  let usecase: BaseScoreUseCase;
  let personalInformationDto: PersonalInformationDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseScoreUseCase],
    }).compile();

    usecase = module.get<BaseScoreUseCase>(BaseScoreUseCase);
    personalInformationDto = fake(PersonalInformationDto);
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
      personalInformationDto.risk_questions = answer as RiskAnswers;
      const baseScore = await usecase.execute(mapDto(personalInformationDto));
      expect(baseScore).toBe(expected);
    },
  );
});

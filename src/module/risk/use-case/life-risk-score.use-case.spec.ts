import { Test, TestingModule } from '@nestjs/testing';
import { range } from 'src/common/util/array';
import { PersonalInformationDto } from 'src/module/insurance/dto/personal-information.dto';
import { OwnershipStatusValues } from 'src/module/insurance/entities/house.entity';
import { MaritalStatusValues } from 'src/module/insurance/entities/personal-information.entity';
import { mapDto } from 'src/module/insurance/map/personal-information.map';
import { fake } from 'test/mock';
import { Score } from '../rule/index.rule';
import { LifeRiskScoreUseCase } from './life-risk-score.use-case';

describe('LifeRiskScoreUseCase', () => {
  let usecase: LifeRiskScoreUseCase;
  let personalInformationDto: PersonalInformationDto;
  let initialScore: Score;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LifeRiskScoreUseCase],
    }).compile();

    initialScore = 0;
    usecase = module.get<LifeRiskScoreUseCase>(LifeRiskScoreUseCase);
    personalInformationDto = fake(PersonalInformationDto);
    personalInformationDto.age = 50;
    personalInformationDto.dependents = 0;
    personalInformationDto.house.ownership_status = OwnershipStatusValues.Owned;
    personalInformationDto.marital_status = MaritalStatusValues.Single;
    personalInformationDto.income = 12;
    personalInformationDto.vehicle.year = new Date().getFullYear() - 6;
    personalInformationDto.risk_questions = [0, 0, 0];
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return 1 when has dependents', async () => {
    personalInformationDto.dependents = 1;
    const score = await usecase.execute(
      mapDto(personalInformationDto),
      initialScore,
    );
    expect(score).toBe(1);
  });

  test.each(range(61, 65))(
    'should return null when is over 60 years, age %i',
    async (age) => {
      personalInformationDto.age = age;
      const score = await usecase.execute(
        mapDto(personalInformationDto),
        initialScore,
      );
      expect(score).toBe(null);
    },
  );

  test.each(range(30, 40))(
    'should return -1 when age is between 30 and 40, age %i',
    async (age) => {
      personalInformationDto.age = age;
      const score = await usecase.execute(
        mapDto(personalInformationDto),
        initialScore,
      );
      expect(score).toBe(-1);
    },
  );

  test.each(range(200001, 200008).concat(500000))(
    'should return -1 when income is above 200k, income %i',
    async (income) => {
      personalInformationDto.income = income;
      const score = await usecase.execute(
        mapDto(personalInformationDto),
        initialScore,
      );
      expect(score).toBe(-1);
    },
  );

  it('should return 1 when is married', async () => {
    personalInformationDto.marital_status = MaritalStatusValues.Married;
    const score = await usecase.execute(
      mapDto(personalInformationDto),
      initialScore,
    );
    expect(score).toBe(1);
  });

  test.each(range(1, 29))(
    'should return -2 when is under 30, age %i',
    async (age) => {
      personalInformationDto.age = age;
      const score = await usecase.execute(
        mapDto(personalInformationDto),
        initialScore,
      );
      expect(score).toBe(-2);
    },
  );

  it('should return 0 when rules not affected', async () => {
    const score = await usecase.execute(
      mapDto(personalInformationDto),
      initialScore,
    );
    expect(score).toBe(0);
  });

  it('should return -3 when rules under 30 years and income over 200k match', async () => {
    personalInformationDto.age = 29;
    personalInformationDto.income = 250100;
    const score = await usecase.execute(
      mapDto(personalInformationDto),
      initialScore,
    );
    expect(score).toBe(-3);
  });
});

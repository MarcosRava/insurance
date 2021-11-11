import { Test, TestingModule } from '@nestjs/testing';
import { range } from 'src/common/util/array';
import {
  House,
  OwnershipStatus,
} from 'src/module/insurance/entities/house.entity';
import { PersonalInformation } from 'src/module/insurance/entities/personal-information.entity';
import { Vehicle } from 'src/module/insurance/entities/vehicle.entity';
import { Score } from '../rule/index.rule';
import { HomeRiskScoreUseCase } from './home-risk-score.use-case';

describe('HomeRiskScoreUseCase', () => {
  let usecase: HomeRiskScoreUseCase;
  let personalInformation: PersonalInformation;
  let initialScore: Score;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeRiskScoreUseCase],
    }).compile();

    initialScore = 0;
    usecase = module.get<HomeRiskScoreUseCase>(HomeRiskScoreUseCase);
    personalInformation = new PersonalInformation();
    personalInformation.age = 50;
    personalInformation.dependents = 0;
    personalInformation.house = new House();
    personalInformation.house.ownershipStatus = OwnershipStatus.Owned;
    personalInformation.income = 12;
    personalInformation.vehicle = new Vehicle();
    personalInformation.vehicle.year = 2014;
    personalInformation.riskQuestions = [0, 0, 0];
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return 1 when house is mortgaged ', async () => {
    const anyValue = 234;
    personalInformation.income = anyValue;
    personalInformation.house.ownershipStatus = OwnershipStatus.Mortgaged;
    const score = await usecase.execute(personalInformation, initialScore);
    expect(score).toBe(1);
  });

  it('should return null when has no income', async () => {
    personalInformation.income = 0;
    const score = await usecase.execute(personalInformation, initialScore);
    expect(score).toBe(null);
  });

  it('should return null when has no vehicle', async () => {
    personalInformation.vehicle = null;
    const score = await usecase.execute(personalInformation, initialScore);
    expect(score).toBe(null);
  });

  it('should return null when has no house', async () => {
    personalInformation.house = null;
    const score = await usecase.execute(personalInformation, initialScore);
    expect(score).toBe(null);
  });

  test.each(range(30, 40))(
    'should return -1 when age is between 30 and 40, age %i',
    async (age) => {
      personalInformation.age = age;
      const score = await usecase.execute(personalInformation, initialScore);
      expect(score).toBe(-1);
    },
  );

  test.each(range(200001, 200008).concat(500000))(
    'should return -1 when income is above 200k, income %i',
    async (income) => {
      personalInformation.income = income;
      const score = await usecase.execute(personalInformation, initialScore);
      expect(score).toBe(-1);
    },
  );

  test.each(range(1, 29))(
    'should return -2 when is under 30, age %i',
    async (age) => {
      personalInformation.age = age;
      const score = await usecase.execute(personalInformation, initialScore);
      expect(score).toBe(-2);
    },
  );

  it('should return 0 with default attributes', async () => {
    const score = await usecase.execute(personalInformation, initialScore);
    expect(score).toBe(0);
  });

  it('should return -3', async () => {
    personalInformation.age = 29;
    personalInformation.income = 250100;
    const score = await usecase.execute(personalInformation, initialScore);
    expect(score).toBe(-3);
  });
});

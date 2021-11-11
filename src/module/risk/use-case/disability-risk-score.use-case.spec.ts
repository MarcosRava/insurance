import { Test, TestingModule } from '@nestjs/testing';
import { range } from 'src/common/util/array';
import {
  House,
  OwnershipStatus,
} from 'src/module/insurance/entities/house.entity';
import {
  MaritalStatus,
  PersonalInformation,
} from 'src/module/insurance/entities/personal-information.entity';
import { Vehicle } from 'src/module/insurance/entities/vehicle.entity';
import { DisabilityRiskScoreUseCase } from './disability-risk-score.use-case';

describe('DisabilityRiskScoreUseCase', () => {
  let usecase: DisabilityRiskScoreUseCase;
  let personalInformation: PersonalInformation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisabilityRiskScoreUseCase],
    }).compile();

    usecase = module.get<DisabilityRiskScoreUseCase>(
      DisabilityRiskScoreUseCase,
    );
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
    const score = await usecase.execute(personalInformation);
    expect(score).toBe(1);
  });

  it('should return 1 when has dependents', async () => {
    personalInformation.dependents = 1;
    const score = await usecase.execute(personalInformation);
    expect(score).toBe(1);
  });

  it('should return null when has no income', async () => {
    personalInformation.income = 0;
    const score = await usecase.execute(personalInformation);
    expect(score).toBe(null);
  });

  it('should return null when has no vehicle', async () => {
    personalInformation.vehicle = null;
    const score = await usecase.execute(personalInformation);
    expect(score).toBe(null);
  });

  it('should return null when has no house', async () => {
    personalInformation.house = null;
    const score = await usecase.execute(personalInformation);
    expect(score).toBe(null);
  });

  test.each(range(61, 65))(
    'should return null when is over 60 years, age %i',
    async (age) => {
      personalInformation.age = age;
      const score = await usecase.execute(personalInformation);
      expect(score).toBe(null);
    },
  );

  test.each(range(30, 40))(
    'should return -1 when age is between 30 and 40, age %i',
    async (age) => {
      personalInformation.age = age;
      const score = await usecase.execute(personalInformation);
      expect(score).toBe(-1);
    },
  );

  test.each(range(200001, 200008).concat(500000))(
    'should return -1 when income is above 200k, income %i',
    async (income) => {
      personalInformation.income = income;
      const score = await usecase.execute(personalInformation);
      expect(score).toBe(-1);
    },
  );

  test.each(range(1, 29))(
    'should return -2 when is under 30, age %i',
    async (age) => {
      personalInformation.age = age;
      const score = await usecase.execute(personalInformation);
      expect(score).toBe(-2);
    },
  );

  it('should return 0 with default attributes', async () => {
    const score = await usecase.execute(personalInformation);
    expect(score).toBe(0);
  });

  it('should return -4', async () => {
    personalInformation.age = 29;
    personalInformation.income = 250100;
    personalInformation.maritalStatus = MaritalStatus.Married;
    const score = await usecase.execute(personalInformation);
    expect(score).toBe(-4);
  });
});

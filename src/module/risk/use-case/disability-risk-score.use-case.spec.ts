import { Test, TestingModule } from '@nestjs/testing';
import { range } from 'src/common/util/array';
import {
  House,
  OwnershipStatus,
} from 'src/module/insurance/entities/house.entity';
import {
  MaritalStatus,
  UserAttributes,
} from 'src/module/insurance/entities/user-attributes.entity';
import { Vehicle } from 'src/module/insurance/entities/vehicle.entity';
import { DisabilityRiskScoreUseCase } from './disability-risk-score.use-case';

describe('DisabilityRiskScoreUseCase', () => {
  let usecase: DisabilityRiskScoreUseCase;
  let userAttributes: UserAttributes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisabilityRiskScoreUseCase],
    }).compile();

    usecase = module.get<DisabilityRiskScoreUseCase>(
      DisabilityRiskScoreUseCase,
    );
    userAttributes = new UserAttributes();
    userAttributes.age = 50;
    userAttributes.dependents = 0;
    userAttributes.house = new House();
    userAttributes.house.ownershipStatus = OwnershipStatus.Owned;
    userAttributes.income = 12;
    userAttributes.vehicle = new Vehicle();
    userAttributes.vehicle.year = 2014;
    userAttributes.riskQuestions = [0, 0, 0];
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return 1 when house is mortgaged ', async () => {
    const anyValue = 234;
    userAttributes.income = anyValue;
    userAttributes.house.ownershipStatus = OwnershipStatus.Mortgaged;
    const score = await usecase.execute(userAttributes);
    expect(score).toBe(1);
  });

  it('should return 1 when has dependents', async () => {
    userAttributes.dependents = 1;
    const score = await usecase.execute(userAttributes);
    expect(score).toBe(1);
  });

  it('should return null when has no income', async () => {
    userAttributes.income = 0;
    const score = await usecase.execute(userAttributes);
    expect(score).toBe(null);
  });

  it('should return null when has no vehicle', async () => {
    userAttributes.vehicle = null;
    const score = await usecase.execute(userAttributes);
    expect(score).toBe(null);
  });

  it('should return null when has no house', async () => {
    userAttributes.house = null;
    const score = await usecase.execute(userAttributes);
    expect(score).toBe(null);
  });

  test.each(range(61, 65))(
    'should return null when is over 60 years, age %i',
    async (age) => {
      userAttributes.age = age;
      const score = await usecase.execute(userAttributes);
      expect(score).toBe(null);
    },
  );

  test.each(range(30, 40))(
    'should return -1 when age is between 30 and 40, age %i',
    async (age) => {
      userAttributes.age = age;
      const score = await usecase.execute(userAttributes);
      expect(score).toBe(-1);
    },
  );

  test.each(range(200001, 200008).concat(500000))(
    'should return -1 when income is above 200k, income %i',
    async (income) => {
      userAttributes.income = income;
      const score = await usecase.execute(userAttributes);
      expect(score).toBe(-1);
    },
  );

  test.each(range(1, 29))(
    'should return -2 when is under 30, age %i',
    async (age) => {
      userAttributes.age = age;
      const score = await usecase.execute(userAttributes);
      expect(score).toBe(-2);
    },
  );

  it('should return 0 with default attributes', async () => {
    const score = await usecase.execute(userAttributes);
    expect(score).toBe(0);
  });

  it('should return -4', async () => {
    userAttributes.age = 29;
    userAttributes.income = 250100;
    userAttributes.maritalStatus = MaritalStatus.Married;
    const score = await usecase.execute(userAttributes);
    expect(score).toBe(-4);
  });
});

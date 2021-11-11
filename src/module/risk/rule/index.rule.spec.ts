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
import {
  ageBetween30And40,
  hasDependents,
  houseIsMortgate,
  incomeAbove200k,
  isMarried,
  isOver60,
  isUnder30,
  noHouse,
  noIncome,
  noVehicle,
  Score,
} from './index.rule';

describe('RiskSteps', () => {
  let userAttributes: UserAttributes;
  const riskPoints: Array<Score> = [1, null, -1, -2];

  beforeEach(() => {
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

  test.each(riskPoints)(
    'should return %s when house is mortgaged ',
    (riskPoints: Score) => {
      const anyValue = 234;
      userAttributes.income = anyValue;
      userAttributes.house.ownershipStatus = OwnershipStatus.Mortgaged;
      const score = houseIsMortgate(riskPoints)(userAttributes);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(riskPoints)(
    'should return %s when has no income',
    (riskPoints: Score) => {
      userAttributes.income = 0;
      const score = noIncome(riskPoints)(userAttributes);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(riskPoints)(
    'should return %s when has no vehicle',
    (riskPoints: Score) => {
      userAttributes.vehicle = null;
      const score = noVehicle(riskPoints)(userAttributes);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(riskPoints)(
    'should return %s when has no house',
    (riskPoints: Score) => {
      userAttributes.house = null;
      const score = noHouse(riskPoints)(userAttributes);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(range(30, 40))(
    'should return -1 when age is between 30 and 40, age %i',
    async (age) => {
      userAttributes.age = age;
      const riskPoint = age;
      const score = ageBetween30And40(riskPoint)(userAttributes);
      expect(score).toBe(riskPoint);
    },
  );

  test.each(range(200001, 200008).concat(500000))(
    'should return -1 when income is above 200k, income %i',
    async (income) => {
      userAttributes.income = income;
      const riskPoint = income;
      const score = incomeAbove200k(riskPoint)(userAttributes);
      expect(score).toBe(riskPoint);
    },
  );

  test.each(range(1, 29))(
    'should return %i when is under 30, age %i',
    async (age) => {
      userAttributes.age = age;
      const riskPoint = age;
      const score = isUnder30(riskPoint)(userAttributes);
      expect(score).toBe(riskPoint);
    },
  );

  test.each(range(61, 65))(
    'should return %i when is over 60, age %i',
    async (age) => {
      userAttributes.age = age;
      const riskPoint = age;
      const score = isOver60(riskPoint)(userAttributes);
      expect(score).toBe(riskPoint);
    },
  );

  test.each(riskPoints)(
    'should return %s when is married',
    (riskPoints: Score) => {
      userAttributes.maritalStatus = MaritalStatus.Married;
      const score = isMarried(riskPoints)(userAttributes);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(range(1, 5))(
    'should return %s when has dependents',
    (dependents) => {
      userAttributes.dependents = dependents;
      const riskPoints = dependents;
      const score = hasDependents(riskPoints)(userAttributes);
      expect(score).toBe(riskPoints);
    },
  );
});

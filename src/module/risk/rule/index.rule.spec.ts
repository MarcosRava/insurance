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
  wasVehicleProducedLast5years,
} from './index.rule';

describe('RiskSteps', () => {
  let personalInformation: PersonalInformation;
  const riskPoints: Array<Score> = [1, null, -1, -2];

  beforeEach(() => {
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

  test.each(riskPoints)(
    'should return %s when house is mortgaged ',
    (riskPoints: Score) => {
      const anyValue = 234;
      personalInformation.income = anyValue;
      personalInformation.house.ownershipStatus = OwnershipStatus.Mortgaged;
      const score = houseIsMortgate(riskPoints)(personalInformation);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(riskPoints)(
    'should return %s when has no income',
    (riskPoints: Score) => {
      personalInformation.income = 0;
      const score = noIncome(riskPoints)(personalInformation);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(riskPoints)(
    'should return %s when has no vehicle',
    (riskPoints: Score) => {
      personalInformation.vehicle = null;
      const score = noVehicle(riskPoints)(personalInformation);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(riskPoints)(
    'should return %s when has no house',
    (riskPoints: Score) => {
      personalInformation.house = null;
      const score = noHouse(riskPoints)(personalInformation);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(range(30, 40))(
    'should return -1 when age is between 30 and 40, age %i',
    async (age) => {
      personalInformation.age = age;
      const riskPoint = age;
      const score = ageBetween30And40(riskPoint)(personalInformation);
      expect(score).toBe(riskPoint);
    },
  );

  test.each(range(200001, 200008).concat(500000))(
    'should return -1 when income is above 200k, income %i',
    async (income) => {
      personalInformation.income = income;
      const riskPoint = income;
      const score = incomeAbove200k(riskPoint)(personalInformation);
      expect(score).toBe(riskPoint);
    },
  );

  test.each(range(1, 29))(
    'should return %i when is under 30, age %i',
    async (age) => {
      personalInformation.age = age;
      const riskPoint = age;
      const score = isUnder30(riskPoint)(personalInformation);
      expect(score).toBe(riskPoint);
    },
  );

  test.each(range(61, 65))(
    'should return %i when is over 60, age %i',
    async (age) => {
      personalInformation.age = age;
      const riskPoint = age;
      const score = isOver60(riskPoint)(personalInformation);
      expect(score).toBe(riskPoint);
    },
  );

  test.each(riskPoints)(
    'should return %s when is married',
    (riskPoints: Score) => {
      personalInformation.maritalStatus = MaritalStatus.Married;
      const score = isMarried(riskPoints)(personalInformation);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(range(1, 5))(
    'should return %s when has dependents',
    (dependents) => {
      personalInformation.dependents = dependents;
      const riskPoints = dependents;
      const score = hasDependents(riskPoints)(personalInformation);
      expect(score).toBe(riskPoints);
    },
  );

  test.each(range(1, 5))(
    'should return %s when vehicle was produced in the last 5 years',
    (year) => {
      personalInformation.vehicle.year = new Date().getFullYear() - year;
      const riskPoints = year;
      const score =
        wasVehicleProducedLast5years(riskPoints)(personalInformation);
      expect(score).toBe(riskPoints);
    },
  );
});

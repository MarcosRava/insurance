import { range } from 'src/common/util/array';
import { PersonalInformationDto } from 'src/module/insurance/dto/personal-information.dto';
import {
  House,
  OwnershipStatus,
  OwnershipStatusValues,
} from 'src/module/insurance/entities/house.entity';
import {
  MaritalStatus,
  MaritalStatusValues,
  PersonalInformation,
} from 'src/module/insurance/entities/personal-information.entity';
import { Vehicle } from 'src/module/insurance/entities/vehicle.entity';
import { mapDto } from 'src/module/insurance/map/personal-information.map';
import { fake } from 'test/mock';
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
  let personalInformationDto: PersonalInformationDto;
  const riskPoints: Array<Score> = [1, null, -1, -2];

  beforeEach(() => {
    personalInformationDto = fake(PersonalInformationDto);
    personalInformationDto.age = 50;
    personalInformationDto.dependents = 0;
    personalInformationDto.house.ownership_status = OwnershipStatusValues.Owned;
    personalInformationDto.marital_status = MaritalStatusValues.Single;
    personalInformationDto.income = 12;
    personalInformationDto.vehicle = new Vehicle();
    personalInformationDto.vehicle.year = 2014;
    personalInformationDto.risk_questions = [0, 0, 0];
  });

  test.each(riskPoints)(
    'should return %s when house is mortgaged ',
    (riskPoints: Score) => {
      const anyValue = 234;
      personalInformationDto.income = anyValue;
      personalInformationDto.house.ownership_status =
        OwnershipStatusValues.Mortgaged;
      const score = houseIsMortgate(riskPoints)(mapDto(personalInformationDto));
      expect(score).toBe(riskPoints);
    },
  );

  test.each(riskPoints)(
    'should return %s when has no income',
    (riskPoints: Score) => {
      personalInformationDto.income = 0;
      const score = noIncome(riskPoints)(mapDto(personalInformationDto));
      expect(score).toBe(riskPoints);
    },
  );

  test.each(riskPoints)(
    'should return %s when has no vehicle',
    (riskPoints: Score) => {
      personalInformationDto.vehicle = null;
      const score = noVehicle(riskPoints)(mapDto(personalInformationDto));
      expect(score).toBe(riskPoints);
    },
  );

  test.each(riskPoints)(
    'should return %s when has no house',
    (riskPoints: Score) => {
      personalInformationDto.house = null;
      const score = noHouse(riskPoints)(mapDto(personalInformationDto));
      expect(score).toBe(riskPoints);
    },
  );

  test.each(range(30, 40))(
    'should return -1 when age is between 30 and 40, age %i',
    async (age) => {
      personalInformationDto.age = age;
      const riskPoint = age;
      const score = ageBetween30And40(riskPoint)(
        mapDto(personalInformationDto),
      );
      expect(score).toBe(riskPoint);
    },
  );

  test.each(range(200001, 200008).concat(500000))(
    'should return -1 when income is above 200k, income %i',
    async (income) => {
      personalInformationDto.income = income;
      const riskPoint = income;
      const score = incomeAbove200k(riskPoint)(mapDto(personalInformationDto));
      expect(score).toBe(riskPoint);
    },
  );

  test.each(range(1, 29))(
    'should return %i when is under 30, age %i',
    async (age) => {
      personalInformationDto.age = age;
      const riskPoint = age;
      const score = isUnder30(riskPoint)(mapDto(personalInformationDto));
      expect(score).toBe(riskPoint);
    },
  );

  test.each(range(61, 65))(
    'should return %i when is over 60, age %i',
    async (age) => {
      personalInformationDto.age = age;
      const riskPoint = age;
      const score = isOver60(riskPoint)(mapDto(personalInformationDto));
      expect(score).toBe(riskPoint);
    },
  );

  test.each(riskPoints)(
    'should return %s when is married',
    (riskPoints: Score) => {
      personalInformationDto.marital_status = MaritalStatusValues.Married;
      const score = isMarried(riskPoints)(mapDto(personalInformationDto));
      expect(score).toBe(riskPoints);
    },
  );

  test.each(range(1, 5))(
    'should return %s when has dependents',
    (dependents) => {
      personalInformationDto.dependents = dependents;
      const riskPoints = dependents;
      const score = hasDependents(riskPoints)(mapDto(personalInformationDto));
      expect(score).toBe(riskPoints);
    },
  );

  test.each(range(1, 5))(
    'should return %s when vehicle was produced in the last 5 years',
    (year) => {
      personalInformationDto.vehicle.year = new Date().getFullYear() - year;
      const riskPoints = year;
      const score = wasVehicleProducedLast5years(riskPoints)(
        mapDto(personalInformationDto),
      );
      expect(score).toBe(riskPoints);
    },
  );
});

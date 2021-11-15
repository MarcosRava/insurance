import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as faker from 'faker';
import { DefineStepFunction } from 'jest-cucumber';
import { AppModule } from 'src/module/app.module';
import { PersonalInformationDto } from 'src/module/insurance/dto/personal-information.dto';
import { OwnershipStatusValues } from 'src/module/insurance/entities/house.entity';
import { MaritalStatusValues } from 'src/module/insurance/entities/personal-information.entity';
import { fake } from 'test/mock';

let app: INestApplication;
let personalInformation: any;
let response;

beforeEach(async () => {
  personalInformation = fake(PersonalInformationDto);
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
});

export const givenIHaveAProfileWhereRulesDontAffect = (
  given: DefineStepFunction,
) => {
  given('I have a profile where rules do not affect', () => {
    personalInformation.age = 50;
    personalInformation.dependents = 0;
    personalInformation.house.ownership_status = OwnershipStatusValues.Owned;
    personalInformation.marital_status = MaritalStatusValues.Single;
    personalInformation.income = 12;
    personalInformation.vehicle.year = new Date().getFullYear() - 6;
    personalInformation.risk_questions = [0, 0, 0];
  });
};
export const givenIdontHaveAVehicle = (given: DefineStepFunction) => {
  given("I don't have a vehicle", () => {
    personalInformation.vehicle = null;
  });
};
export const givenIdontHaveAHouse = (given: DefineStepFunction) => {
  given("I don't have a house", () => {
    personalInformation.house = null;
  });
};
export const givenImOverYears = (given: DefineStepFunction) => {
  given(/^I am over "(\d+)" years old$/, (age) => {
    personalInformation.age = parseInt(age) + faker.datatype.number();
  });
};
export const givenImUnderYears = (given: DefineStepFunction) => {
  given(/^I am under "(\d+)" years old$/, (strAge) => {
    const age = parseInt(strAge);
    personalInformation.age = age - faker.datatype.number(age);
  });
};
export const givenImBetweenYears = (given: DefineStepFunction) => {
  given(
    /^I am between "(\d+)" and "(\d+)" years old$/,
    (strMinAge, strMaxAge) => {
      const minAge = parseInt(strMinAge);
      const maxAge = parseInt(strMaxAge);
      personalInformation.age = faker.datatype.number({
        min: minAge,
        max: maxAge,
      });
    },
  );
};
export const givenIHaveAnsweredRiskQuestions = (given: DefineStepFunction) => {
  given(
    /^I have answered risk questions with "(\d+)" "(\d+)" "(\d+)"$/,
    (answer1, answer2, answer3) => {
      personalInformation.risk_questions = [
        parseInt(answer1),
        parseInt(answer2),
        parseInt(answer3),
      ];
    },
  );
};
export const givenMyIncomeIsAbove = (given: DefineStepFunction) => {
  given(/^my income is above \$(\d+)$/, (age) => {
    personalInformation.income = parseInt(age) + faker.datatype.number();
  });
};
export const givenMyHouseIsMortgaged = (given: DefineStepFunction) => {
  given(/^my house is "(.*)"$/, (ownershipStatus) => {
    personalInformation.house.ownership_status = ownershipStatus;
  });
};
export const givenIHaveDependents = (given: DefineStepFunction) => {
  given('I have dependents', () => {
    personalInformation.dependents = faker.datatype.number({ min: 1 });
  });
};
export const givenIAmMarried = (given: DefineStepFunction) => {
  given(/^I am "(.*)"$/, (maritalStatus) => {
    personalInformation.marital_status = maritalStatus;
  });
};
export const givenMyVehicleProducedLast = (given: DefineStepFunction) => {
  given(/^my vehicle was produced in the last "(\d+)" years$/, (years) => {
    personalInformation.vehicle.year =
      new Date().getFullYear() - parseInt(years);
  });
};
export const whenISubmitMyPersonalInformation = (when: DefineStepFunction) => {
  when('I submit my personal information', async () => {
    response = await request(app.getHttpServer())
      .post('/insurance/profile')
      .send(personalInformation);
  });
};
export const thenIReceiveMyInsuranceProfileAs = (then: DefineStepFunction) => {
  then('I receive my insurance profile as', (table) => {
    table.forEach(({ Insurance, Profile }) =>
      expect(response.body[Insurance]).toBe(Profile),
    );
  });
};

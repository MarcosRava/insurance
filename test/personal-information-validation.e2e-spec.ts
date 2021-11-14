import * as faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { AppModule } from 'src/module/app.module';
import { PersonalInformationDto } from 'src/module/insurance/dto/personal-information.dto';
import { fake } from './mock';
import { answer as validAnswer } from './mock/personal-information.dto.mock';

describe('Personal information validation - InsuranceController (e2e)', () => {
  let app: INestApplication;
  let personalInformation: any;

  const randomWithout =
    (...args) =>
    () => {
      const num = faker.datatype.number();
      return args.includes(num) ? randomWithout(...args) : num;
    };

  beforeEach(async () => {
    personalInformation = fake(PersonalInformationDto);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/insurance/profile (POST)', () => {
    it('should accept valid body', () => {
      return request(app.getHttpServer())
        .post('/insurance/profile')
        .send(personalInformation)
        .expect(StatusCodes.OK);
    });

    describe('Validations', () => {
      const nonNumbers = [null, undefined, 'Invalid', '23', [], true, {}];
      const nonIntegerEqualOrGreaterThanZero = [-1, -15, ...nonNumbers];
      test.each(nonIntegerEqualOrGreaterThanZero)(
        'should return bad request with age %s',
        async (age) => {
          personalInformation.age = age;
          const response = await request(app.getHttpServer())
            .post('/insurance/profile')
            .send(personalInformation)
            .expect(StatusCodes.BAD_REQUEST);
          console.log(response.body);
        },
      );

      test.each(nonIntegerEqualOrGreaterThanZero)(
        'should return bad request with dependents %s',
        async (dependents) => {
          personalInformation.dependents = dependents;
          const response = await request(app.getHttpServer())
            .post('/insurance/profile')
            .send(personalInformation)
            .expect(StatusCodes.BAD_REQUEST);
          console.log(response.body);
        },
      );

      test.each(nonIntegerEqualOrGreaterThanZero)(
        'should return bad request with income %s',
        async (income) => {
          personalInformation.income = income;
          const response = await request(app.getHttpServer())
            .post('/insurance/profile')
            .send(personalInformation)
            .expect(StatusCodes.BAD_REQUEST);
          console.log(response.body);
        },
      );

      test.each([
        'Married',
        'Single',
        'otherthing',
        'alone',
        -1,
        0,
        1,
        true,
        false,
        [],
        {},
      ])(
        'should return bad request with marital status %s',
        async (marital_status) => {
          personalInformation.marital_status = marital_status;
          const response = await request(app.getHttpServer())
            .post('/insurance/profile')
            .send(personalInformation)
            .expect(StatusCodes.BAD_REQUEST);
          console.log(response.body);
        },
      );

      const invalidAnswer = randomWithout(1, 0);
      test.each([
        [validAnswer(), validAnswer(), invalidAnswer()],
        [validAnswer(), invalidAnswer(), validAnswer()],
        [invalidAnswer(), validAnswer(), validAnswer()],
        [invalidAnswer(), validAnswer(), invalidAnswer()],
        [invalidAnswer(), invalidAnswer(), validAnswer()],
        [invalidAnswer(), invalidAnswer(), invalidAnswer()],
        [validAnswer(), invalidAnswer(), invalidAnswer()],
        ...nonNumbers,
      ])(
        'should return bad request with risk questions %s',
        async (risk_questions) => {
          personalInformation.risk_questions = risk_questions;
          console.log(personalInformation);
          const response = await request(app.getHttpServer())
            .post('/insurance/profile')
            .send(personalInformation)
            .expect(StatusCodes.BAD_REQUEST);
          console.log(response.body);
        },
      );

      test.each([
        'Owned',
        'Mortgaged',
        'otherthing',
        'alone',
        -1,
        0,
        1,
        true,
        false,
        [],
        {},
      ])(
        'should return bad request with house.ownership_status %s',
        async (ownership_status) => {
          personalInformation.house.ownership_status = ownership_status;
          const response = await request(app.getHttpServer())
            .post('/insurance/profile')
            .send(personalInformation)
            .expect(StatusCodes.BAD_REQUEST);
          console.log(response.body);
        },
      );

      test.each([...nonIntegerEqualOrGreaterThanZero, 0])(
        'should return bad request with vehicle.year %s',
        async (year) => {
          personalInformation.vehicle.year = year;
          const response = await request(app.getHttpServer())
            .post('/insurance/profile')
            .send(personalInformation)
            .expect(StatusCodes.BAD_REQUEST);
          console.log(response.body);
        },
      );
    });
  });
});

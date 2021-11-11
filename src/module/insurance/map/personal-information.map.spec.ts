import { PersonalInformationDto } from '../dto/personal-information.dto';
import {
  OwnershipStatus,
  OwnershipStatusValues,
} from '../entities/house.entity';
import {
  MaritalStatus,
  MaritalStatusValues,
} from '../entities/personal-information.entity';
import { mapDto } from './personal-information.map';

describe('PersonalInformationMapDto', () => {
  let dto: PersonalInformationDto;

  beforeEach(() => {
    dto = {
      age: 30,
      dependents: 1,
      income: 200,
      marital_status: MaritalStatusValues.Married,
      risk_questions: [1, 1, 0],
      house: {
        ownership_status: OwnershipStatusValues.Owned,
      },
      vehicle: {
        year: 2012,
      },
    };
  });
  it('should map dto to entity', () => {
    const expected = {
      age: 30,
      dependents: 1,
      income: 200,
      maritalStatus: MaritalStatus.Married,
      riskQuestions: [1, 1, 0],
      house: {
        ownershipStatus: OwnershipStatus.Owned,
      },
      vehicle: {
        year: 2012,
      },
    };
    const entity = mapDto(dto);
    expect(entity).toEqual(expected);
  });
});

import { Injectable } from '@nestjs/common';
import { PersonalInformationDto } from './dto/personal-information.dto';

@Injectable()
export class InsuranceService {
  riskProfile(personalInformationDto: PersonalInformationDto) {
    return 'This action adds a new insurance';
  }
}

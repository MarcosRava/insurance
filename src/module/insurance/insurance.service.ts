import { Injectable } from '@nestjs/common';
import { UserAttributesDto } from './dto/user-attributes.dto';

@Injectable()
export class InsuranceService {
  riskProfile(userAttributesDto: UserAttributesDto) {
    return 'This action adds a new insurance';
  }
}

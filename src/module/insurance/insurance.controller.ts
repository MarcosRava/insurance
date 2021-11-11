import { Controller, Post, Body } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { PersonalInformationDto } from './dto/personal-information.dto';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post()
  riskProfile(@Body() personalInformationDto: PersonalInformationDto) {
    return this.insuranceService.riskProfile(personalInformationDto);
  }
}

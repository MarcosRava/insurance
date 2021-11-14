import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { RiskProfileDto } from './dto/risk-profile.dto';
import { PersonalInformationDto } from './dto/personal-information.dto';
import { InsuranceService } from './insurance.service';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post('/profile')
  @HttpCode(StatusCodes.OK)
  riskProfile(
    @Body() personalInformationDto: PersonalInformationDto,
  ): Promise<RiskProfileDto> {
    return this.insuranceService.riskProfile(personalInformationDto);
  }
}

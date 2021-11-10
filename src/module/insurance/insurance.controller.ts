import { Controller, Post, Body } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { UserAttributesDto } from './dto/user-attributes.dto';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post()
  riskProfile(@Body() userAttributesDto: UserAttributesDto) {
    return this.insuranceService.riskProfile(userAttributesDto);
  }
}

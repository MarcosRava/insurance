import { Injectable } from '@nestjs/common';
import { RiskProfileDto } from '../risk/dto/risk-profile.dto';
import { RiskService } from '../risk/risk.service';
import { Score } from '../risk/rule/index.rule';
import { PersonalInformationDto } from './dto/personal-information.dto';
import { InsurancePlan, InsurancePlanValues } from './enum/insurance-plan.enum';

interface RiskProfileScore {
  auto: Score;
  disability: Score;
  home: Score;
  life: Score;
}

@Injectable()
export class InsuranceService {
  constructor(private readonly riskService: RiskService) {}

  private getProfile(score: Score): InsurancePlanValues {
    return InsurancePlan.getProfile(score).value;
  }

  private async getProfileScore(
    baseScore: Score,
    personalInfo: PersonalInformationDto,
  ): Promise<RiskProfileScore> {
    const auto = await this.riskService.getAutoScore(personalInfo, baseScore);
    const disability = await this.riskService.getDisabilityScore(
      personalInfo,
      baseScore,
    );
    const home = await this.riskService.getHomeScore(personalInfo, baseScore);
    const life = await this.riskService.getLifeScore(personalInfo, baseScore);

    return {
      auto,
      disability,
      home,
      life,
    };
  }

  async riskProfile(
    personalInfo: PersonalInformationDto,
  ): Promise<RiskProfileDto> {
    const baseScore = await this.riskService.getBaseScore(personalInfo);
    const profileScore = await this.getProfileScore(baseScore, personalInfo);
    const riskProfile = new RiskProfileDto();
    riskProfile.auto = this.getProfile(profileScore.auto);
    riskProfile.disability = this.getProfile(profileScore.disability);
    riskProfile.home = this.getProfile(profileScore.home);
    riskProfile.life = this.getProfile(profileScore.life);
    return riskProfile;
  }
}

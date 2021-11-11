import { Injectable } from '@nestjs/common';
import { PersonalInformationDto } from '../insurance/dto/personal-information.dto';
import { mapDto } from '../insurance/map/personal-information.map';
import { Score } from './rule/index.rule';
import { AutoRiskScoreUseCase } from './use-case/auto-risk-score.use-case';
import { BaseScoreUseCase } from './use-case/base-score.use-case';
import { DisabilityRiskScoreUseCase } from './use-case/disability-risk-score.use-case';
import { HomeRiskScoreUseCase } from './use-case/home-risk-score.use-case';
import { LifeRiskScoreUseCase } from './use-case/life-risk-score.use-case';

@Injectable()
export class RiskService {
  constructor(
    private readonly baseScoreUseCase: BaseScoreUseCase,
    private readonly homeRiskScoreUseCase: HomeRiskScoreUseCase,
    private readonly disabilityRiskScoreUseCase: DisabilityRiskScoreUseCase,
    private readonly autoRiskScoreUseCase: AutoRiskScoreUseCase,
    private readonly lifeRiskScoreUseCase: LifeRiskScoreUseCase,
  ) {}

  async getBaseScore(
    personalInformationDto: PersonalInformationDto,
  ): Promise<Score> {
    const personalInformation = mapDto(personalInformationDto);
    return this.baseScoreUseCase.execute(personalInformation);
  }

  async getHomeScore(
    personalInformationDto: PersonalInformationDto,
    initialScore: Score,
  ): Promise<Score> {
    const personalInformation = mapDto(personalInformationDto);
    return this.homeRiskScoreUseCase.execute(personalInformation, initialScore);
  }

  async getDisabilityScore(
    personalInformationDto: PersonalInformationDto,
    initialScore: Score,
  ): Promise<Score> {
    const personalInformation = mapDto(personalInformationDto);
    return this.disabilityRiskScoreUseCase.execute(
      personalInformation,
      initialScore,
    );
  }

  async getAutoScore(
    personalInformationDto: PersonalInformationDto,
    initialScore: Score,
  ): Promise<Score> {
    const personalInformation = mapDto(personalInformationDto);
    return this.autoRiskScoreUseCase.execute(personalInformation, initialScore);
  }

  async getLifeScore(
    personalInformationDto: PersonalInformationDto,
    initialScore: Score,
  ): Promise<Score> {
    const personalInformation = mapDto(personalInformationDto);
    return this.lifeRiskScoreUseCase.execute(personalInformation, initialScore);
  }
}

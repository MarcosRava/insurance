import { Module } from '@nestjs/common';
import { RiskService } from './risk.service';
import { HomeRiskScoreUseCase } from './use-case/home-risk-score.use-case';
import { BaseScoreUseCase } from './use-case/base-score.use-case';
import { DisabilityRiskScoreUseCase } from './use-case/disability-risk-score.use-case';
import { AutoRiskScoreUseCase } from './use-case/auto-risk-score.use-case';
import { LifeRiskScoreUseCase } from './use-case/life-risk-score.use-case';

@Module({
  providers: [
    RiskService,
    HomeRiskScoreUseCase,
    DisabilityRiskScoreUseCase,
    BaseScoreUseCase,
    LifeRiskScoreUseCase,
    AutoRiskScoreUseCase,
  ],
  exports: [RiskService],
})
export class RiskModule {}

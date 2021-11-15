import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { InsuranceModule } from './insurance/insurance.module';
import { RiskModule } from './risk/risk.module';

@Module({
  imports: [ConfigModule, InsuranceModule, RiskModule],
})
export class AppModule {}

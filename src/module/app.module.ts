import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InsuranceModule } from './insurance/insurance.module';
import { RiskModule } from './risk/risk.module';

@Module({
  imports: [InsuranceModule, RiskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

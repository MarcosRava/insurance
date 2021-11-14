import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InsuranceModule } from './insurance/insurance.module';
import { RiskModule } from './risk/risk.module';

@Module({
  imports: [ConfigModule, InsuranceModule, RiskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

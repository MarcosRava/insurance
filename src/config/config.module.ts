import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';

export const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  load: [appConfig],
});

import { Test, TestingModule } from '@nestjs/testing';
import { fake } from 'test/mock';
import { anyOfClass, anything, instance, mock, verify, when } from 'ts-mockito';
import { RiskProfileDto } from './dto/risk-profile.dto';
import { PersonalInformationDto } from './dto/personal-information.dto';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';

describe('InsuranceController', () => {
  let controller: InsuranceController;
  let service: InsuranceService;
  let serviceMock: InsuranceService;
  let personalInformationDto: PersonalInformationDto;
  let riskProfileDto: RiskProfileDto;

  beforeEach(async () => {
    personalInformationDto = fake(PersonalInformationDto);
    riskProfileDto = fake(RiskProfileDto);
    serviceMock = mock(InsuranceService);
    when(serviceMock.riskProfile(anything())).thenResolve(riskProfileDto);
    service = instance(serviceMock);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsuranceController],
      providers: [InsuranceService],
    })
      .overrideProvider(InsuranceService)
      .useValue(service)
      .compile();

    controller = module.get<InsuranceController>(InsuranceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get risk profile', async () => {
    const response = await controller.riskProfile(personalInformationDto);
    expect(response).toStrictEqual(riskProfileDto);
    verify(serviceMock.riskProfile(anyOfClass(PersonalInformationDto))).once();
  });
});

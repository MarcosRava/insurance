import { fake } from 'test/mock';
import {
  anyOfClass,
  anything,
  instance,
  mock,
  spy,
  verify,
  when,
} from 'ts-mockito';
import { RiskService } from '../risk/risk.service';
import { PersonalInformationDto } from './dto/personal-information.dto';
import { InsurancePlan } from './enum/insurance-plan.enum';
import { InsuranceService } from './insurance.service';

describe('InsuranceService', () => {
  let service: InsuranceService;
  let riskService: RiskService;
  let riskServiceMock: RiskService;
  let personalInformationDto: PersonalInformationDto;

  beforeEach(async () => {
    personalInformationDto = fake(PersonalInformationDto);
    riskServiceMock = mock(RiskService);
    riskService = instance(riskServiceMock);
    service = new InsuranceService(riskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should build risk profile', async () => {
    const riskProfile = await service.riskProfile(personalInformationDto);
    expect(riskProfile).toHaveProperty('auto');
    expect(riskProfile).toHaveProperty('disability');
    expect(riskProfile).toHaveProperty('home');
    expect(riskProfile).toHaveProperty('life');
  });

  it('should get scores from risk service', async () => {
    await service.riskProfile(personalInformationDto);
    const baseScoreMethod = riskServiceMock.getBaseScore(
      anyOfClass(PersonalInformationDto),
    );
    const autoScoreMethod = riskServiceMock.getAutoScore(
      anyOfClass(PersonalInformationDto),
      anything(),
    );
    const disabilityScoreMethod = riskServiceMock.getDisabilityScore(
      anyOfClass(PersonalInformationDto),
      anything(),
    );
    const homeScoreMethod = riskServiceMock.getHomeScore(
      anyOfClass(PersonalInformationDto),
      anything(),
    );
    const lifeScoreMethod = riskServiceMock.getLifeScore(
      anyOfClass(PersonalInformationDto),
      anything(),
    );

    verify(baseScoreMethod).called();
    verify(baseScoreMethod).once();
    verify(autoScoreMethod).called();
    verify(autoScoreMethod).once();
    verify(disabilityScoreMethod).called();
    verify(disabilityScoreMethod).once();
    verify(homeScoreMethod).called();
    verify(homeScoreMethod).once();
    verify(lifeScoreMethod).called();
    verify(lifeScoreMethod).once();
    verify(baseScoreMethod).calledBefore(autoScoreMethod);
    verify(baseScoreMethod).calledBefore(disabilityScoreMethod);
    verify(baseScoreMethod).calledBefore(homeScoreMethod);
    verify(baseScoreMethod).calledBefore(lifeScoreMethod);
  });

  it('should get profile from insurance plan', async () => {
    const spiedInsurancePlan = spy(InsurancePlan);
    const getProfileMethod = spiedInsurancePlan.getProfile(anything());
    when(getProfileMethod)
      .thenReturn(InsurancePlan.Economic)
      .thenReturn(InsurancePlan.Ineligible)
      .thenReturn(InsurancePlan.Regular)
      .thenReturn(InsurancePlan.Responsible);
    const riskProfile = await service.riskProfile(personalInformationDto);
    expect(riskProfile).toEqual({
      auto: 'economic',
      disability: 'ineligible',
      home: 'regular',
      life: 'responsible',
    });
    verify(spiedInsurancePlan.getProfile(anything())).times(4);
  });
});

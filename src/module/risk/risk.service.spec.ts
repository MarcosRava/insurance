import { anyOfClass, instance, mock, reset, verify, when } from 'ts-mockito';
import { RiskService } from './risk.service';
import { BaseScoreUseCase } from './use-case/base-score.use-case';
import { HomeRiskScoreUseCase } from './use-case/home-risk-score.use-case';
import { DisabilityRiskScoreUseCase } from './use-case/disability-risk-score.use-case';
import { AutoRiskScoreUseCase } from './use-case/auto-risk-score.use-case';
import { LifeRiskScoreUseCase } from './use-case/life-risk-score.use-case';
import { PersonalInformation } from '../insurance/entities/personal-information.entity';
import { PersonalInformationDto } from '../insurance/dto/personal-information.dto';
import { fake } from 'test/mock';
import { Score } from './rule/index.rule';

describe('RiskService', () => {
  let service: RiskService;
  let baseScoreUseCase: BaseScoreUseCase;
  let homeRiskScoreUseCase: HomeRiskScoreUseCase;
  let disabilityRiskScoreUseCase: DisabilityRiskScoreUseCase;
  let autoRiskScoreUseCase: AutoRiskScoreUseCase;
  let lifeRiskScoreUseCase: LifeRiskScoreUseCase;
  let personalInfoDto: PersonalInformationDto;

  const baseScoreMock = mock(BaseScoreUseCase);
  const homeRiskScoreMock = mock(HomeRiskScoreUseCase);
  const disabilityRiskScoreMock = mock(DisabilityRiskScoreUseCase);
  const autoRiskScoreMock = mock(AutoRiskScoreUseCase);
  const lifeRiskScoreMock = mock(LifeRiskScoreUseCase);

  beforeEach(async () => {
    personalInfoDto = fake(PersonalInformationDto);
    baseScoreUseCase = instance(baseScoreMock);
    homeRiskScoreUseCase = instance(homeRiskScoreMock);
    disabilityRiskScoreUseCase = instance(disabilityRiskScoreMock);
    autoRiskScoreUseCase = instance(autoRiskScoreMock);
    lifeRiskScoreUseCase = instance(lifeRiskScoreMock);
    service = new RiskService(
      baseScoreUseCase,
      homeRiskScoreUseCase,
      disabilityRiskScoreUseCase,
      autoRiskScoreUseCase,
      lifeRiskScoreUseCase,
    );
  });

  afterEach(async () => {
    reset(baseScoreMock);
    reset(homeRiskScoreMock);
    reset(disabilityRiskScoreMock);
    reset(autoRiskScoreMock);
    reset(lifeRiskScoreMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBaseScore', () => {
    let score: Score;
    beforeEach(() => {
      score = 0;
      when(baseScoreMock.execute(anyOfClass(PersonalInformation))).thenResolve(
        score,
      );
    });

    it('should get base score', async () => {
      const baseScore = await service.getBaseScore(personalInfoDto);
      expect(baseScore).toEqual(score);
      verify(baseScoreMock.execute(anyOfClass(PersonalInformation))).once();
    });
  });

  describe('getHomeScore', () => {
    let score: Score;
    let initialScore: Score;
    beforeEach(() => {
      score = 2;
      initialScore = 1;
      when(
        homeRiskScoreMock.execute(
          anyOfClass(PersonalInformation),
          initialScore,
        ),
      ).thenResolve(score);
    });

    it('should get home score', async () => {
      const homeScore = await service.getHomeScore(
        personalInfoDto,
        initialScore,
      );
      expect(homeScore).toEqual(score);
      verify(
        homeRiskScoreMock.execute(
          anyOfClass(PersonalInformation),
          initialScore,
        ),
      ).once();
    });
  });

  describe('getDisabilityScore', () => {
    let score: Score;
    let initialScore: Score;
    beforeEach(() => {
      score = 2;
      initialScore = 1;
      when(
        disabilityRiskScoreMock.execute(
          anyOfClass(PersonalInformation),
          initialScore,
        ),
      ).thenResolve(score);
    });

    it('should get disability score', async () => {
      const disabilityScore = await service.getDisabilityScore(
        personalInfoDto,
        initialScore,
      );
      expect(disabilityScore).toEqual(score);
      verify(
        disabilityRiskScoreMock.execute(
          anyOfClass(PersonalInformation),
          initialScore,
        ),
      ).once();
    });
  });

  describe('getAutoScore', () => {
    let score: Score;
    let initialScore: Score;
    beforeEach(() => {
      score = 2;
      initialScore = 1;
      when(
        autoRiskScoreMock.execute(
          anyOfClass(PersonalInformation),
          initialScore,
        ),
      ).thenResolve(score);
    });

    it('should get auto score', async () => {
      const autoScore = await service.getAutoScore(
        personalInfoDto,
        initialScore,
      );
      expect(autoScore).toEqual(score);
      verify(
        autoRiskScoreMock.execute(
          anyOfClass(PersonalInformation),
          initialScore,
        ),
      ).once();
    });
  });

  describe('getLifeScore', () => {
    let score: Score;
    let initialScore: Score;
    beforeEach(() => {
      score = 2;
      initialScore = 1;
      when(
        lifeRiskScoreMock.execute(
          anyOfClass(PersonalInformation),
          initialScore,
        ),
      ).thenResolve(score);
    });

    it('should get life score', async () => {
      const lifeScore = await service.getLifeScore(
        personalInfoDto,
        initialScore,
      );
      expect(lifeScore).toEqual(score);
      verify(
        lifeRiskScoreMock.execute(
          anyOfClass(PersonalInformation),
          initialScore,
        ),
      ).once();
    });
  });
});

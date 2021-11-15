# Insurance risk profile

## Description

JSON API built using [NestJS](https://nestjs.com/) framework and [TypeScript](https://www.typescriptlang.org/) to calculate user risk profile for insurances

## Running the app

You can use `dotenv` file for environment variables creating a `.env` file or coping existent `.env.example` file

```bash
$ cp .env.example .env
```

### Run with docker compose

```bash
$ docker-compose up
```

### Standalone

Install dependencies

```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# bdd tests
$ npm run test:spec

# test coverage
$ npm run test:cov
```

## Api Documentation

Application provides [OpenApi](https://www.openapis.org/) documentation in [swagger](https://swagger.io/) client on `/api` endpoint

_Ps: Schema names are with Dto suffix because are not possible to change yet, I opened an [issue](https://github.com/nestjs/nest/issues/8574) on nestjs with that point_

## Project tree

```
|____config
| |____config.module.ts
|____module
| |____main.ts
| |____app.module.ts
| |____risk
| | |____risk.module.ts
| | |____risk.service.ts
| | |____use-case
| | |____rule
| |____insurance
| | |____insurance.module.ts
| | |____insurance.service.ts
| | |____insurance.controller.ts
| | |____dto
| | |____enum
| | |____map
| | |____entities
|____common
| |____util
|____index.ts
```

### config

Module with application configurations, a prefix is used in environment variables to avoid name conflicts with other applications

### module

Modules folder have all about a specific context

### common

Common files and utilities

### index.ts

Loads all modules using http protocol

## Technical decisions

The development was based in a [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), [TDD](https://en.wikipedia.org/wiki/Test-driven_development), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) and [SOLID principles](https://en.wikipedia.org/wiki/SOLID).

[Enum class pattern](https://lostechies.com/jimmybogard/2008/08/12/enumeration-classes/) was used to follow Open-Closed and Single-Responsibilty principles from SOLID and avoid behavior related to the enumeration gets scattered around the application, an example extending [enum-class](/src/common/enum-class.ts) is [insurance-plan](/src/module/insurance/enum/insurance-plan.enum.ts)

Data Transfer Objects are used as presenters and adapters, an example of adapter with validations and openapi documentation is [personal-information-dto](/src/module/insurance/dto/personal-information.dto.ts). The [map function](/src/module/insurance/map/personal-information.map.ts) coverts dto to an entity

Use cases and entities are isolated. They don't have any external dependencies

Services has use cases, they receive DTOs, convert then to entities and call use cases, they are called by controllers

Risk algorithm use cases were developed using an [abstraction](src/module/risk/use-case/risk-score.use-case.ts) with required rules for all cases. The [rules](/src/module/risk/rule/index.rule.ts) were developed using [function composition](<https://en.wikipedia.org/wiki/Function_composition_(computer_science)>) and [lazy evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation) to be easy to extends.

### tests

Unit tests files are together with the code with the suffix `.spec.ts`.

[End-to-End](/test/e2e) tests are used to input validation

[Spec tests](/test/spec) are used to validate behaviors using gherkin language

### Framework

NestJS was choosen because it has some facilities like

- [IoC](https://docs.nestjs.com/providers)
- [Validation](https://docs.nestjs.com/techniques/validation)
- [Module based](https://docs.nestjs.com/modules)

See all about [NestJS](https://docs.nestjs.com)

## To improve

- More unit test exception scenarios
- More behavior scenarios in [features](/test/spec/feature)

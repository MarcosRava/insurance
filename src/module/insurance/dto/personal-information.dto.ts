import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { MaritalStatusValues } from '../entities/personal-information.entity';
import { HouseDto } from './house.dto';
import { VehicleDto } from './vehicle.dto';

type MaritalStatusDto = MaritalStatusValues;

export class PersonalInformationDto {
  @IsInt()
  @Min(0)
  @IsDefined()
  age: number;

  @IsInt()
  @Min(0)
  @IsDefined()
  dependents: number;

  @ValidateNested()
  @IsOptional()
  house?: HouseDto;

  @IsInt()
  @Min(0)
  @IsDefined()
  income: number;

  @IsDefined()
  @IsEnum(MaritalStatusValues)
  marital_status: MaritalStatusDto;

  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsArray()
  @IsDefined()
  @Min(0, { each: true })
  @Max(1, { each: true })
  @ApiProperty({ example: [0, 1, 0] })
  risk_questions: Array<number>;

  @ValidateNested()
  @IsOptional()
  vehicle?: VehicleDto;
}

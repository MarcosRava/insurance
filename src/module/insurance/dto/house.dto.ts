import { IsEnum, IsNotEmpty } from 'class-validator';
import { OwnershipStatusValues } from '../entities/house.entity';

type OwnershipStatusDto = OwnershipStatusValues;
export class HouseDto {
  @IsNotEmpty()
  @IsEnum(OwnershipStatusValues)
  ownership_status: OwnershipStatusDto;
}

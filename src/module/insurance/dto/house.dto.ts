import { OwnershipStatus } from '../entities/house.entity';

type OwnershipStatusDto = OwnershipStatus;
export class HouseDto {
  ownership_status: OwnershipStatusDto;
}

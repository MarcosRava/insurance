import { IsDefined, IsInt, IsPositive } from 'class-validator';

export class VehicleDto {
  @IsInt()
  @IsPositive()
  @IsDefined()
  year: number;
}

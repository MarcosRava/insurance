import { EnumClass } from 'src/common/enum-class';

export enum OwnershipStatusValues {
  Owned = 'owned',
  Mortgaged = 'mortgaged',
}

export class OwnershipStatus extends EnumClass {
  static readonly Owned = new OwnershipStatus(OwnershipStatusValues.Owned);
  static readonly Mortgaged = new OwnershipStatus(
    OwnershipStatusValues.Mortgaged,
  );
}

export class House {
  ownershipStatus: OwnershipStatus;
}

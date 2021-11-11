export enum OwnershipStatusValues {
  Owned = 'owned',
  Mortgaged = 'mortgaged',
}
export class OwnershipStatus {
  static readonly Owned = new OwnershipStatus(OwnershipStatusValues.Owned);
  static readonly Mortgaged = new OwnershipStatus(
    OwnershipStatusValues.Mortgaged,
  );

  constructor(private value: string) {}
}

export class House {
  ownershipStatus: OwnershipStatus;
}

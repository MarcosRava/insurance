export class OwnershipStatus {
  static readonly Owned = new OwnershipStatus('owned');
  static readonly Mortgaged = new OwnershipStatus('mortgaged');

  constructor(private value: string) {}
}

export class House {
  ownershipStatus: OwnershipStatus;
}

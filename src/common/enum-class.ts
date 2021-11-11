export class EnumClass {
  private static readonly enums = {};
  static getFromValue(value: string): EnumClass {
    return EnumClass.enums[this.name].find((status) => status.value === value);
  }
  protected static getValues() {
    return EnumClass.enums[this.name];
  }
  constructor(public readonly value: string) {
    if (!EnumClass.enums[this.constructor.name]) {
      EnumClass.enums[this.constructor.name] = [];
    }
    EnumClass.enums[this.constructor.name].push(this);
  }
}

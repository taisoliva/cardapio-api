export class Menu {
  private _name: string;
  private _type: string;

  constructor(name: string, type: string) {
    this._name = name;
    this._type = type;
  }

  name(): string {
    return this._name;
  }

  type(): string {
    return this._type;
  }
}

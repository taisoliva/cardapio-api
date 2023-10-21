export class Product {
  private _name: string;
  private _price: number;
  private _image: string;
  private _description: string;
  private _menuId: string;
  private _categoryId: string;

  constructor(
    name: string,
    price: number,
    image: string,
    description: string,
    menuId: string,
    categoryId: string,
  ) {
    this._name = name;
    this._price = price;
    this._image = image;
    this._description = description;
    this._menuId = menuId;
    this._categoryId = categoryId;
  }

  name(): string {
    return this._name;
  }

  price(): number {
    return this._price;
  }

  image(): string {
    return this._image;
  }

  description(): string {
    return this._description;
  }

  menuId(): string {
    return this._menuId;
  }

  categoryId(): string {
    return this._categoryId;
  }
}

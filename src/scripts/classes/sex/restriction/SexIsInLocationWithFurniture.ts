import type { Furniture } from "../../furniture/Furniture";

export default class SexIsInLocationWithFurniture extends SexRestriction {
  furniture_key: ItemKey;

  constructor(furniture: Furniture) {
    super();
    this.furniture_key = furniture.key;
  }

  getFurniture(): Furniture {
    return setup.item[this.furniture_key] as Furniture;
  }

  override explain() {
    return `Is in a location with ${this.getFurniture().rep()}`;
  }

  override isOk(action: SexAction) {
    const location = this.sex.getLocation();
    const furniture = this.getFurniture();
    return location.getFurnitureAt(furniture.getSlot()) == furniture;
  }
}

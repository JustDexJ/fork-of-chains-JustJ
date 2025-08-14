export default class SexIsInLocationSupportingUpsideDown extends SexRestriction {
  constructor() {
    super();
  }

  override explain() {
    return `Is in a location that supports the Upside-Down sex pose (e.g., by having the correct furniture)`;
  }

  override isOk(action: SexAction) {
    return !!this.sex.getLocation().repUpsideDownFurniture();
  }
}

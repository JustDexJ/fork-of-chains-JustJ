/**
 * Does not actually do anything aside from marking actor as a slaver for preference
 */
export default class SlaverMarker extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  static NAME = "Mark unit as a slaver for gender preferences";
  static PASSAGE = "CostSlaverMarker";

  override get IS_SLAVE() {
    return true;
  }

  override getActorName() {
    return this.actor_name;
  }

  override text() {
    return `setup.qc.SlaverMarker('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    // nothing
  }

  override explain(context: CostContext) {
    return `${this.actor_name} is marked as a slaver for gender preference`;
  }
}

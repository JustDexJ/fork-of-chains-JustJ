import { DOM } from "../../dom/DOM";
import { TwineClass } from "../_TwineClass";
import type { RoomInstance, RoomInstanceKey } from "../room/RoomInstance";
import type { Unit } from "../unit/Unit";
import type { ActivityTemplate, ActivityTemplateKey } from "./ActivityTemplate";

export type ActivityInstanceKey = BrandedType<number, "ActivityInstanceKey">;

export class ActivityInstance extends TwineClass {
  key: ActivityInstanceKey;
  template_key: ActivityTemplateKey;
  room_key: RoomInstanceKey;

  actor_unit_key_map: ActorUnitKeyMap = {};

  seed?: number;

  constructor(
    activity_template: ActivityTemplate,
    actor_units: ActorUnitMap,
    room: RoomInstance,
  ) {
    super();

    this.key = State.variables.ActivityInstance_keygen++ as ActivityInstanceKey;

    this.template_key = activity_template.key;
    this.room_key = room.key;

    for (let actor_key in actor_units) {
      const unit = actor_units[actor_key];
      if (State.variables.activitylist.getActivityOf(unit)) {
        throw new Error(`Unit ${unit.key} already on another activity`);
      }
      this.actor_unit_key_map[actor_key] = unit.key;
    }

    if (this.key in State.variables.activityinstance)
      throw new Error(`Activity Instance ${this.key} already exists`);
    State.variables.activityinstance[this.key] = this;

    State.variables.activitylist.registerActivity(this);
  }

  getRoomInstance(): RoomInstance {
    return State.variables.roominstance[this.room_key];
  }

  delete() {
    State.variables.activitylist.unregisterActivity(this);
    delete State.variables.activityinstance[this.key];

    // delete the generated actors too, if any
    for (const [actor_name, unit] of this.getActorsList()) {
      unit.checkDelete();
    }
  }

  rep() {
    return setup.repMessage(this, "activitycardkey");
  }

  getName(): string {
    return this.getTemplate().getName();
  }

  getTemplate(): ActivityTemplate {
    return setup.activitytemplate[this.template_key];
  }

  /**
   * @returns like [['actor1', unit], ['actor2', unit], ...]
   */
  getActorsList(): Array<[actorname: string, unit: Unit]> {
    const result: Array<[actorname: string, unit: Unit]> = [];
    for (let actor_key in this.actor_unit_key_map) {
      let unit = State.variables.unit[this.actor_unit_key_map[actor_key]];
      result.push([actor_key, unit]);
    }
    return result;
  }

  /** Returns object where object.actorname = unit, if any. */
  getActorObj(): ActorUnitMap {
    return Object.fromEntries(this.getActorsList()) as ActorUnitMap;
  }

  getActorUnit(actor_name: string): Unit {
    return State.variables.unit[this.actor_unit_key_map[actor_name]];
  }

  /**
   * Get a random number for this quest that remains the same always.
   */
  getSeed(): number {
    if (this.seed) return this.seed;
    this.seed = 1 + Math.floor(Math.random() * 999999997);
    return this.seed;
  }

  /**
   * Get display for this activity inside its room container.
   */
  getDisplay(): string {
    // first generate the actor boxes
    const tile_size = setup.Tile.getTileSize();

    const room = this.getRoomInstance();
    let max_column = room.getWidth() - 1;
    let row = 0;
    let col = 0;

    const actor_boxes = [];
    for (const [actor_name, actor] of this.getActorsList()) {
      actor_boxes.push(`<span data-tooltip="<<activitycardkey ${this.key}>>" data-tooltip-wide>
        ${setup.DOM.toString(
          DOM.Util.Image.load({
            image_name: actor.getImage(),
            image_class: `activity-unit`,
            extra_styles: `top: ${tile_size * row + tile_size / 2}px; left: ${tile_size * col + tile_size / 2}px; width: ${tile_size}px; height: ${tile_size}px;`,
          }),
        )}
      </span>`);

      col += 1;
      if (col == max_column) {
        col = 0;
        row += 1;
      }
    }

    return actor_boxes.join("");
  }

  debugKillActors() {
    setup.QuestInstance.debugKillActorsDo(this.getActorsList());
  }
}

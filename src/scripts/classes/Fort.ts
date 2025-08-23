import { TwineClass } from "./_TwineClass";
import type { BuildingInstance, BuildingInstanceKey } from "./BuildingInstance";
import type { BuildingTemplate, BuildingTemplateKey } from "./BuildingTemplate";
import type { Job } from "./job/Job";
import type { RoomInstance } from "./room/RoomInstance";
import type { Unit } from "./unit/Unit";

export type FortKey = "player";

export class Fort extends TwineClass {
  key: FortKey;
  name: string;
  base_max_buildings: number;
  building_keys: BuildingInstanceKey[] = [];
  template_key_to_building_key: {
    [k in BuildingTemplateKey]?: BuildingInstanceKey;
  } = {};
  ignored_building_template_key: { [k in BuildingTemplateKey]?: boolean } = {};

  // also count towards building space.
  upgrades = 0;

  constructor(key: string, name: string, base_max_buildings: number) {
    super();

    this.key = key as FortKey;
    this.name = name;
    this.base_max_buildings = base_max_buildings;

    //if (key in State.variables.fort) {
    //  throw new Error(`Fort ${key} already exists`);
    //}
    //State.variables.fort[key as FortKey] = this;
  }

  isTemplateIgnored(template: BuildingTemplate) {
    return template.key in this.ignored_building_template_key;
  }

  ignoreTemplate(template: BuildingTemplate) {
    this.ignored_building_template_key[template.key] = true;
  }

  unignoreTemplate(template: BuildingTemplate) {
    delete this.ignored_building_template_key[template.key];
  }

  rep(): string {
    return this.getName();
  }

  getUpgrades(): number {
    return this.upgrades;
  }

  addUpgrade() {
    this.upgrades += 1;
  }

  removeUpgrade() {
    this.upgrades -= 1;
  }

  isTrainingUnlocked(unit: Unit): boolean {
    let candidates: BuildingTemplateKey[] = [];
    if (unit.getJob() == setup.job.slaver) {
      candidates = ["deepritualchamber", "surgery", "temple", "treatmentroom"];
    } else if (unit.getJob() == setup.job.slave) {
      candidates = [
        "trainingchamber",
        "ritualchamber",
        "biolab",
        "temple",
        "treatmentroom",
      ];
    }
    for (const building of candidates) {
      if (this.isHasBuilding(setup.buildingtemplate[building])) return true;
    }
    return false;
  }

  getBuilding(template: BuildingTemplate): BuildingInstance | null {
    if (!template) throw new Error(`Missing building in getBuilding`);
    const key = this.template_key_to_building_key[template.key];
    if (!key) {
      return null;
    }
    return State.variables.buildinginstance[key];
  }

  getName(): string {
    return this.name;
  }

  getMaxUnitOfJob(job: Job): number {
    // max number of unit with job this fort can support.
    if (job == setup.job.slaver) {
      // if (this.isHasBuilding(setup.buildingtemplate.lodgings)) result += 3
      let rooms = 0;
      if (this.isHasBuilding(setup.buildingtemplate.lodgings)) {
        rooms = this.getBuilding(setup.buildingtemplate.lodgings)!.getLevel();
      } else {
        rooms = 3;
      }

      return rooms * setup.FORT_SLAVER_CAPACITY_PER_LODGING;
    } else if (job == setup.job.slave) {
      let result = 0;
      if (this.isHasBuilding(setup.buildingtemplate.dungeons)) {
        result += setup.FORT_SLAVE_CAPACITY_PER_CELL;
        let cells =
          this.getBuilding(setup.buildingtemplate.dungeons)!.getLevel() - 1;
        result += cells * setup.FORT_SLAVE_CAPACITY_PER_CELL;
      }
      return result;
    } else {
      throw new Error(`weird job ${job.key}`);
    }
  }

  countBuildings(template: BuildingTemplate) {
    if (this.isHasBuilding(template)) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * @param level If given, building must be at least this level to return true
   */
  isHasBuilding(
    template: BuildingTemplate | BuildingTemplateKey,
    level?: number,
  ): boolean {
    const building_template = resolveObject(template, setup.buildingtemplate);
    const building = this.getBuilding(building_template);
    if (!building) return false;
    if (!level) return true;
    return building.getLevel() >= level;
  }

  getBuildingsCount(): number {
    return this.building_keys.length;
  }

  getBuildings(filter_dict?: { tag?: string }) {
    let result = [];

    let tag: string | null | undefined = null;
    if (filter_dict && "tag" in filter_dict) {
      tag = filter_dict.tag;
    }

    for (let i = 0; i < this.building_keys.length; ++i) {
      let building = State.variables.buildinginstance[this.building_keys[i]];
      if (
        filter_dict &&
        "template" in filter_dict &&
        building.getTemplate() != filter_dict.template
      ) {
        continue;
      }
      if (tag && !building.getTemplate().getTags().includes(tag)) continue;
      result.push(building);
    }
    return result;
  }

  getBuildRoom(template: BuildingTemplate): RoomInstance | null {
    const room_template = template.getMainRoomTemplate();
    if (room_template) {
      return new setup.RoomInstance({ template: room_template });
    } else {
      return null;
    }
  }

  build(
    template: BuildingTemplate,
    room?: RoomInstance | null,
  ): RoomInstance | null {
    if (!room) {
      room = this.getBuildRoom(template);
    }
    State.variables.statistics.add("buildings_built", 1);
    if (template.key in this.template_key_to_building_key) {
      throw new Error(`Building ${template.key} already built?`);
    }

    let building = new setup.BuildingInstance(template);
    this.building_keys.push(building.key);
    if (building.fort_key) {
      throw new Error(`Building already has a fort?`);
    }

    building.fort_key = this.key;

    this.template_key_to_building_key[template.key] = building.key;
    setup.notify(`<<successtext 'New improvement'>>: ${building.rep()}`);

    return room;
  }

  /**
   * This is only used for backwards compatibility.
   */
  remove(building: BuildingInstance) {
    delete this.template_key_to_building_key[building.template_key];
    this.building_keys = this.building_keys.filter(
      (key) => key != building.key,
    );
  }
}

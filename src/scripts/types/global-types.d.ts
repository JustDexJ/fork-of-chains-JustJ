//
// This file define some common types in the global namespace (e.g. Unit),
// to avoid excessive imports bloating
//
export namespace Types {
  export type ContentTemplate =
    import("../classes/content/ContentTemplate").ContentTemplate;
  export type Item = import("../classes/inventory/Item").Item;
  export type ItemKey = import("../classes/inventory/Item").ItemKey;
  export type QuestInstance =
    import("../classes/quest/QuestInstance").QuestInstance;
  export type QuestTemplate =
    import("../classes/quest/QuestTemplate").QuestTemplate;
  export type SexAction = import("../classes/sex/action/SexAction").SexAction;
  export type SexBodypart =
    import("../classes/sex/bodypart/SexBodypart").SexBodypart;
  export type SexInstance =
    import("../classes/sex/engine/SexInstance").SexInstance;
  export type SexPace = import("../classes/sex/pace/SexPace").SexPace;
  export type SexPermission =
    import("../classes/sex/permission/SexPermission").SexPermission;
  export type SexPose = import("../classes/sex/pose/SexPose").SexPose;
  export type SexPosition =
    import("../classes/sex/position/SexPosition").SexPosition;
  export type Skill = import("../classes/Skill").Skill;
  export type SlaveOrder =
    import("../classes/slaveorder/SlaveOrder").SlaveOrder;
  export type Trait = import("../classes/trait/Trait").Trait;
  export type TraitKey = import("../classes/trait/Trait").TraitKey;
  export type Unit = import("../classes/unit/Unit").Unit;
  export type UnitKey = import("../classes/unit/Unit").UnitKey;
  export type QuestDifficultyKey =
    import("../classes/quest/QuestDifficulty").QuestDifficultyKey;
  export type UnitCriteria =
    import("../classes/criteria/UnitCriteria").UnitCriteria;

  export type BuildingTemplate =
    import("../classes/BuildingTemplate").BuildingTemplate;
  export type BuildingDefinition =
    import("../classes/BuildingTemplate").BuildingDefinition;
  export type RoomTemplate =
    import("../classes/room/RoomTemplate").RoomTemplate;
  export type RoomDefinition =
    import("../classes/room/RoomTemplate").RoomDefinition;
}

declare global {
  namespace globalThis {
    /**
     * The context that the cost is applied to.
     * In most cases it's a QuestInstance.
     */
    type CostContext =
      //| QuestInstance
      //| BuildingInstance_
      //| Unit
      //| Item_
      {
        getActorUnit: (actorname: string) => Unit | null;
        getName?: () => string;
        getSeed?: () => number;
        getTemplate?: () => ContentTemplate;
        key?: string | number;
      };

    type ContentContext = CostContext;

    type Unit = Types.Unit;
    type UnitKey = Types.UnitKey;
    type UntiCriteria = Types.UnitCriteria;
    type Skill = Types.Skill;
    type Trait = Types.Trait;
    type TraitKey = Types.TraitKey;
    type Item = Types.Item;
    type ItemKey = Types.ItemKey;
    type QuestInstance = Types.QuestInstance;
    type QuestTemplate = Types.QuestTemplate;
    type ContentTemplate = Types.ContentTemplate;
    type SlaveOrder = Types.SlaveOrder;
    type QuestDifficultyKey = Types.QuestDifficultyKey;

    type BuildingTemplate = Types.BuildingTemplate;
    type BuildingDefinition = Types.BuildingDefinition;
    type RoomTemplate = Types.RoomTemplate;
    type RoomDefinition = Types.RoomDefinition;

    type SexAction = Types.SexAction;
    type SexBodypart = Types.SexBodypart;
    type SexInstance = Types.SexInstance;
    type SexPace = Types.SexPace;
    type SexPermission = Types.SexPermission;
    type SexPose = Types.SexPose;
    type SexPosition = Types.SexPosition;
  }

  interface SexActorDescription {
    arousal?: number;
    discomfort?: number;
    energy?: number;
    restrictions?: Restriction[];

    /** What paces are allowed to choose this via the AI? */
    paces: SexPace[];
  }

  type ChanceArray<T> = Array<[value: T, chance: number]>;

  type ChanceObject<K extends string> = { [k in K]?: number };
}

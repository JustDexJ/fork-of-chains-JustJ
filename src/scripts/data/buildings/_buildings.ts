import * as buildings_imports from "./_index";

type aux = typeof buildings_imports;

export type _BuildingTemplateKey = {
  [k in keyof aux]: aux[k] extends { BUILDINGS: unknown }
    ? keyof aux[k]["BUILDINGS"]
    : never;
}[keyof aux];

export type _RoomTemplateKey = {
  [k in keyof aux]: aux[k] extends { ROOMS: unknown }
    ? keyof aux[k]["ROOMS"]
    : never;
}[keyof aux];

export const BUILDING_DEFINITIONS = {} as {
  [k in _BuildingTemplateKey]: BuildingDefinition;
};
export const ROOM_DEFINITIONS = {} as {
  [k in _RoomTemplateKey]: RoomDefinition;
};

for (const { BUILDINGS, ROOMS } of Object.values(buildings_imports) as any[]) {
  BUILDINGS && Object.assign(BUILDING_DEFINITIONS, BUILDINGS);
  ROOMS && Object.assign(ROOM_DEFINITIONS, ROOMS);
}

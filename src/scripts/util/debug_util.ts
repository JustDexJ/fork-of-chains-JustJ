import type { Unit } from "../classes/unit/Unit";

// crash the game. for Debugging.
export function debugCrash() {
  throw new Error("Test crash from debugCrash");
}

export function debugPrintRoomLocations() {
  for (const room of Object.values(State.variables.roominstance)) {
    if (room.getLocation() && !room.getTemplate().isFixed()) {
      console.log(
        `'${room.getTemplate().key}': [${room.getClockwiseRotations()}, ${room.getLocation().row}, ${room.getLocation().col}],`,
      );
    }
  }
}

export function generateAnyUnit(): Unit {
  return setup.unitgroup.all.getUnit();
}

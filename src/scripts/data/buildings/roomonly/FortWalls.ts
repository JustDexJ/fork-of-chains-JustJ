export const ROOMS = definitions<RoomDefinition>()({
  fortwalls: {
    tags: ["hidename", "structural"],
    description: `The outer walls of your fort.`,
    name: "Fort walls",
    width: 1,
    height: 1,
    skill_bonus: [],
    is_fixed: true,
    is_passable: false,
    is_door: false,
    is_optional: false,
    is_outdoors: false,
  },
});

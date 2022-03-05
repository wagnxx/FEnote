var buildings = [
  {
    building: '1',
    floors: [
      {
        floor: '2e',
        roomNames: ['201', '202']
      },
      {
        floor: '3',
        roomNames: ['301', '302']
      }
    ]
  },
  {
    building: '21',
    floors: [
      {
        floor: '22e',
        roomNames: ['201', '202']
      },
      {
        floor: '23',
        roomNames: ['301', '302']
      }
    ]
  }
];

function getRoomsFromBuildings(building, floor) {
  if (!building) return [];

  var curBuilding = building.find((b) => b.building === building);
  if (!curBuilding) return [];
  var curFloor = curBuilding.find((f) => f.floor === floor);
  if (!curFloor) return [];

  return curFloor.roomNames || [];
}

var buildings = [
  {
    id: '7521000001',
    district: '深圳东',
    subDistrict: '大鹏新区',
    building: 'E-1'
  },
  {
    id: '7521000002',
    district: '深圳东',
    subDistrict: '盐田区',
    building: 'E-2'
  },
  {
    id: '7521000003',
    district: '深圳东',
    subDistrict: '罗湖区',
    building: 'E-3'
  },
  {
    id: '7521000004',
    district: '深圳东',
    subDistrict: '坪山区',
    building: 'E-4'
  },
  {
    id: '7521000021',
    district: '深圳西',
    subDistrict: '宝安区',
    building: 'W-1'
  },
  {
    id: '7521000022',
    district: '深圳西',
    subDistrict: '宝安区',
    building: 'W-2'
  },
  {
    id: '7521000023',
    district: '深圳西',
    subDistrict: '公明区',
    building: 'W-3'
  },
  {
    id: '7521000024',
    district: '深圳西',
    subDistrict: '公明区',
    building: 'W-4'
  },
  {
    id: '7521000031',
    district: '深圳南',
    subDistrict: '南山区',
    building: 'S-1'
  },
  {
    id: '7521000032',
    district: '深圳南',
    subDistrict: '南山区',
    building: 'S-2'
  },
  {
    id: '7521000033',
    district: '深圳南',
    subDistrict: '福田区',
    building: 'S-3'
  },
  {
    id: '7521000034',
    district: '深圳南',
    subDistrict: '福田区',
    building: 'S-4'
  },
  {
    id: '7521000041',
    district: '深圳北',
    subDistrict: '龙华区',
    building: 'N-1'
  },
  {
    id: '7521000042',
    district: '深圳北',
    subDistrict: '龙华区',
    building: 'N-2'
  },
  {
    id: '7521000043',
    district: '深圳北',
    subDistrict: '龙岗区',
    building: 'N-3'
  },
  {
    id: '7521000044',
    district: '深圳北',
    subDistrict: '龙岗区',
    building: 'N-4'
  }
];

function getBuildings(level, name) {
  switch (level) {
    case '':
      return buildings;
    case 'district':
      return Object.keys(grouByName(level));
    case 'subDistrict':
      return  Object.keys(grouByName(level));
  }
}

function grouByName(field) {
  var obj = {};
  buildings.forEach((item) => {
    if (!obj[item[field]]) {
      obj[item[field]] = [];
    }
    obj[item[field]].push(item);
  });

  return obj;
}

console.log();
// console.log(grouByName('subDistrict'));

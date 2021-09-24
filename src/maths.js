export function reflectAngleOverXAxis(angle) {
  let reflection = -angle + Math.PI;

  // normalize the angle
  while (reflection > Math.PI * 2) {
    reflection -= Math.PI * 2;
  }
  while (reflection < 0) {
    reflection += Math.PI * 2;
  }

  return reflection;
}

export function reflectAngleOverYAxis(angle) {
  const diff = Math.PI / 2 - angle;
  let reflection = Math.PI / 2 + diff + Math.PI;

  // normalize the angle
  while (reflection > Math.PI * 2) {
    reflection -= Math.PI * 2;
  }
  while (reflection < 0) {
    reflection += Math.PI * 2;
  }

  return reflection;
}

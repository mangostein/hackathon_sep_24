
function create_spiro(a, b, d){
    let dt = 0.01;
    let t = 0;
    const pts = [];
    while (t < 2*Math.pi*b / gCD(a, b)){
        t += dt;
        x = (a - b) * Math.cos(t) + d * Math.cos((a - b)/b * t);
        y = (a - b) * Math.sin(t) - d * Math.sin((a - b)/b * t);
        pts.concat((x, y));
    }
    return pts
}


function gCD (x, y){
   
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}   

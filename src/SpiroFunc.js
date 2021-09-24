
function create_spiro(fixedCircleRad, rotatingCircleRad, drawDistFromCenter){
    let dt = 0.01;
    let t = 0;
    const pts = [];
    while (t < 2*Math.pi*rotatingCircleRad / gCD(fixedCircleRad, rotatingCircleRad)){
        t += dt;
        x = (fixedCircleRad - rotatingCircleRad) * Math.cos(t) +  drawDistFromCenter * Math.cos((fixedCircleRad - rotatingCircleRad)/rotatingCircleRad * t);
        y = (fixedCircleRad - rotatingCircleRad) * Math.sin(t) -  drawDistFromCenter * Math.sin((fixedCircleRad - rotatingCircleRad)/rotatingCircleRad * t);
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

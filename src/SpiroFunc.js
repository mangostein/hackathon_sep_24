function create_spiro(a, b, d){
    let dt = 0.01;
    let t = 0;
    //let pts = [];
    while t < (2*math.pi*b /math.gcd(a, b)){
        t += dt
        x = (a - b) * math.cos(t) + d * math.cos((a - b)/b * t)
        y = (a - b) * math.sin(t) - d * math.sin((a - b)/b * t)
        pts.append((x, y))}
    return pts
}
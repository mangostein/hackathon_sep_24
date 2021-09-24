import React from 'react';

const SUBCIRCLE_RADIUS = 50;
const SPIRO_SEED = 0.33; // between 0 and 1

export default class DanCanvas extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.resize);

    this.lastFrame = new Date().getTime();
    window.requestAnimationFrame(this.animate.bind(this));

    this.resize();
    this.initialize();
    this.renderCanvas();
  }

  componentDidUpdate() {
    this.initialize();
    this.renderCanvas();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <canvas ref={ n => this.canvas = n } style={{ position: 'absolute' }}/>
        <canvas ref={ n => this.canvasDraw = n } style={{ position: 'absolute' }}/>
      </div>
    );
  }

  renderCanvas() {
    const ctx = this.canvas.getContext('2d');
    this.ctx2 = this.canvasDraw.getContext('2d');

    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, this.width, this.height);

    this.renderCircle(ctx, this.boundaryCircle);
    this.renderCircle(ctx, this.subCircle);
    this.renderPoint(ctx, this.subCircle.spiroPoint)
  }

  renderCircle(ctx, circle) {
    ctx.strokeStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(circle.cx, circle.cy, circle.r, 0, Math.PI * 2);
    ctx.stroke();
  }

  renderPoint(ctx, point, radius = 5, color = '#d4ff00') {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }


  animate() {
    const elapsedMs = new Date().getTime() - this.lastFrame;

    this.animateFrame(elapsedMs);

    this.lastFrame = new Date().getTime();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  animateFrame(elapsedMs) {
    this.radians += .01;
    this.subCircle = this.buildSubCircle(this.boundaryCircle, SUBCIRCLE_RADIUS, this.radians, this.spiroSeed);
    this.renderCanvas();

    // Persist drawing
    const jerPoint = this.determineSpiroPoint(this.boundaryCircle.r, this.subCircle.r, this.spiroSeed, this.radians, this.boundaryCircle.cx, this.boundaryCircle.cy);
    this.renderPoint(this.ctx2, jerPoint, 1, '#70b5ff');
  }

  initialize() {
    const halfWidth = this.height / 2
    this.boundaryCircle = {
      cx: this.width / 2,
      cy: halfWidth,
      r: (halfWidth) - 10,
    }
    this.radians = 0;
    this.spiroSeed = SPIRO_SEED;
    this.subCircle = this.buildSubCircle(this.boundaryCircle, SUBCIRCLE_RADIUS, this.radians, this.spiroSeed);
    console.log(this.subCircle);
  }

  buildSubCircle(parentCircle, radius, radians, spiroSeed) {
    const point = this.findPointOnCircle(parentCircle.cx, parentCircle.cy, parentCircle.r - radius, radians);
    return {
      cx: point.x,
      cy: point.y,
      r: radius,
      spiroPoint: this.determineSpiroPoint(parentCircle.r, radius, spiroSeed, radians, parentCircle.cx, parentCircle.cy)
    }
  }

  determineSpiroPoint(boundaryRadius, subRadius, seed, radians, offsetX, offsetY) {
    const drawDistFromCenter = subRadius * seed;
    return {
      x: ((boundaryRadius - subRadius) * Math.cos(radians) +  drawDistFromCenter * Math.cos((boundaryRadius - subRadius)/subRadius * radians)) + offsetX,
      y: ((boundaryRadius - subRadius) * Math.sin(radians) -  drawDistFromCenter * Math.sin((boundaryRadius - subRadius)/subRadius * radians)) + offsetY,
    }
  }

  findPointOnCircle(cx, cy, r, a) {
    return {
      x: cx + r * Math.cos(a),
      y: cy + r * Math.sin(a),
    }
  }

  resize = () => {
    this.width = this.canvas.parentNode.offsetWidth;
    this.height = this.canvas.parentNode.offsetHeight;
    this.h = this.width/2;
    this.k = this.height/2;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvasDraw.width = this.width;
    this.canvasDraw.height = this.height;
  }
}

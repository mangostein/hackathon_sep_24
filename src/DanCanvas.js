import React from 'react';

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
      <canvas ref={ n => this.canvas = n }/>
    );
  }

  renderCanvas() {
    const ctx = this.canvas.getContext('2d');

    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, this.width, this.height);

    this.renderBoundaryCircle(ctx);
  }

  renderBoundaryCircle(ctx) {
    ctx.strokeStyle = '#FFFFFF';
    const halfWidth = this.height / 2
    const boundaryCenterPoint = {
      x: this.width / 2,
      y: halfWidth,
    }
    const radius = (halfWidth) - 10;
    ctx.beginPath();
    ctx.arc(boundaryCenterPoint.x, boundaryCenterPoint.y, radius, 0, Math.PI * 2);
    ctx.stroke();

    const currentAngle = 0;
    const smallRadius = radius / 5;
    const startPoint = this.findPointOnCircle(boundaryCenterPoint.x, boundaryCenterPoint.y, radius - smallRadius, currentAngle);
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, smallRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  findPointOnCircle(cx, cy, r, a) {
    return {
      x: cx + r * Math.cos(a),
      y: cy + r * Math.sin(a),
    }
  }

  animate() {
    const elapsedMs = new Date().getTime() - this.lastFrame;

    this.animateFrame(elapsedMs);

    this.lastFrame = new Date().getTime();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  animateFrame(elapsedMs) {
    /*
      do calculations here
    */
    this.renderCanvas();
  }


  initialize() {

  }

  resize = () => {
    this.width = this.canvas.parentNode.offsetWidth;
    this.height = this.canvas.parentNode.offsetHeight;
    this.h = this.width/2;
    this.k = this.height/2;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}

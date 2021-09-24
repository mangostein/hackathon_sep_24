import React from 'react';
import { reflectAngleOverXAxis, reflectAngleOverYAxis } from './maths';

const PALETTE = [
  '#FCFFA6',
  '#C1FFD7',
  '#B5DEFF',
  '#CAB8FF',
  '#C400FF',
];

export default class CanvasApp extends React.Component {
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

    ctx.strokeStyle = "#ffffff";
    this.renderPentagons(ctx);
  }

  renderPentagons(ctx) {
    this.pentagons.forEach((pentagon, i) => {
      // pentagon.forEach((point) => this.renderPentagonPoints(ctx, point));
      const pIndex = i % PALETTE.length;
      ctx.strokeStyle = PALETTE[pIndex];
      ctx.beginPath();
      ctx.moveTo(pentagon[0].x, pentagon[0].y);
      ctx.lineTo(pentagon[1].x, pentagon[1].y);
      ctx.lineTo(pentagon[2].x, pentagon[2].y);
      ctx.lineTo(pentagon[3].x, pentagon[3].y);
      ctx.lineTo(pentagon[4].x, pentagon[4].y);
      ctx.lineTo(pentagon[0].x, pentagon[0].y);
      ctx.stroke();
    });
  }

  renderPentagonPoints(ctx, point) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  animate() {
    const elapsedMs = new Date().getTime() - this.lastFrame;

    this.animateFrame(elapsedMs);

    this.lastFrame = new Date().getTime();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  animateFrame(elapsedMs) {
    /*
      get x,y angle in radian
      atan2(y - cy, x - cx)

      get x,y from a given angle 𝜃 and a circle of radius 𝑟 and center (ℎ,𝑘)
      x = h + rcos𝜃
      y = k + rsin𝜃
    */
    this.pentagons.forEach((pentagon) => {
      pentagon.forEach(this.calcNewPentPoint);
    });
    this.renderCanvas();
  }

  calcNewPentPoint = (point) => {
    var circle = 2 * Math.PI;
    var travelRadian = circle / point.rate;
    var theta = Math.atan2(point.y - this.k, point.x - this.h) + (travelRadian * point.direction);
    point.x = this.h + (point.radius * Math.cos(theta));
    point.y = this.k + (point.radius * Math.sin(theta));
  }

  initialize() {
    const baseRadius = this.h / 2;
    const pentagonCount = 20;
    this.pentagons = new Array(pentagonCount);
    for (let i = 0; i < this.pentagons.length; i++) {
      const direction = i % 2 === 0 ? 1 : -1;
      const radius = i === 0 ? baseRadius : this.calcSmallerPentagonRadius(this.pentagons[i - 1]);
      this.pentagons[i] = this.createPentagonPoints(this.h, this.k, radius, direction);
    }
  }

  createPentagonPoints (h, k, radius, direction) {
    const arr = new Array(5);
    // http://mathworld.wolfram.com/RegularPentagon.html
    var c1 = Math.cos((2 * Math.PI) / 5);
    var c2 = Math.cos(Math.PI / 5);
    var s1 = Math.sin((2 * Math.PI) / 5);
    var s2 = Math.sin((4 * Math.PI) / 5);
    const rotationRate = radius * 8;
    arr[0] = {
      x: h + radius,
      y: k,
      radius: radius,
      direction: direction,
      rate: rotationRate
    };
    arr[1] = {
      x: (c1 * radius) + h,
      y: (s1 * radius) + k,
      radius: radius,
      direction: direction,
      rate: rotationRate
    };
    arr[2] = {
      x: (-1 * c2 * radius) + h,
      y: (s2 * radius) + k,
      radius: radius,
      direction: direction,
      rate: rotationRate
    };
    arr[3] = {
      x: (-1 * c2 * radius) + h,
      y: (-1 * s2 * radius) + k,
      radius: radius,
      direction: direction,
      rate: rotationRate
    };
    arr[4] = {
      x: (c1 * radius) + h,
      y: (-1 * s1 * radius) + k,
      radius: radius,
      direction: direction,
      rate: rotationRate
    };

    return arr;
  }

  calcSmallerPentagonRadius (largerPentagon) {
    var a = Math.sqrt(Math.pow((largerPentagon[0].x - largerPentagon[1].x), 2) + Math.pow((largerPentagon[0].y - largerPentagon[1].y), 2)) / 2;
    return Math.sqrt(Math.pow(largerPentagon[0].radius, 2) - Math.pow(a, 2));
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

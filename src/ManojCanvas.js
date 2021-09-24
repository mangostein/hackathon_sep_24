import React from 'react';

export default class ManojCanvas extends React.Component {
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
      <canvas ref={n => this.canvas = n} />
    );
  }

  renderCanvas() {

    const q1 = 'Jake'
    const q2 = 'Manoj'
    const q3 = 'Jeremiah'
    const q4 = 'Daniel'
    const ctx = this.canvas.getContext('2d');
    //ctx.fillStyle = "#f5f5f5";

    const widthBy2 = this.width / 2
    const heightBy2 = this.height / 2
    // quadrant changes begin 


    ctx.beginPath();
    ctx.moveTo(0, heightBy2);
    ctx.lineTo(this.width, heightBy2);

    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(widthBy2, 0);
    ctx.lineTo(widthBy2, this.height);
    ctx.stroke();

    // quadran changes end
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
    const widthBy2 = this.width / 2
    const heightBy2 = this.height / 2
    var quadrants = {

      // coordinates as in 00, 01, 10, 11

      q1: [[0, 0], [0, heightBy2], [widthBy2, 0], [heightBy2, widthBy2]],
      q2: [[widthBy2, 0], [heightBy2, widthBy2], [this.width, 0], [this.width, heightBy2]],
      q3: [[heightBy2, widthBy2], [this.height, widthBy2], [this.width, this.heightBy2], [this.width, this.height]],
      q4: [[0, heightBy2], [heightBy2, widthBy2], [widthBy2, this.height], [0, this.height]]
    }

    console.log(quadrants)
    this.h = this.width / 2;
    this.k = this.height / 2;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}

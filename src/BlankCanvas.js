import React from 'react';

export default class BlankCanvas extends React.Component {
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

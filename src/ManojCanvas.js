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
      <canvas ref={ n => this.canvas = n }/>
    );
  }

  renderCanvas() {

    const q1 = 'Jake'
    const q2 = 'Manoj'
    const q3 = 'Jeremiah'
    const q4 = 'Daniel'
    const ctx = this.canvas.getContext('2d');
    //ctx.fillStyle = "#f5f5f5";

    var quadrants = {}
    const widthBy2 = this.width/2
    const heightBy2 = this.height/2
    
    quadrants['q100'] = [0, 0]
    quadrants['q101'] = [0 , heightBy2]
    quadrants['q110'] = [0 , widthBy2]
    quadrants['q111'] = [heightBy2, widthBy2]

    quadrants['q200'] = quadrants['q110']
    quadrants['q201'] = [this.width, 0]
    quadrants['q210'] = quadrants['q111']
    quadrants['q211'] = [this.width, heightBy2]

    
    quadrants['q300'] = quadrants['q111']
    quadrants['q310'] = quadrants['q211']
    quadrants['q311'] = [this.width, this.height]
    quadrants['q301'] = [widthBy2, this.height]

    quadrants['q400'] = quadrants['q101']
    quadrants['q410'] = quadrants['q111']
    quadrants['q411'] = quadrants['q301']
    quadrants['q401'] = [0, this.height]

    console.log(quadrants)

    ctx.beginPath();
    ctx.moveTo(0, heightBy2);
    ctx.lineTo(this.width, heightBy2);

    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(widthBy2, 0);
    ctx.lineTo(widthBy2, this.height);
    ctx.stroke();
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

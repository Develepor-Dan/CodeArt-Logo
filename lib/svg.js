class SVG {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
    this.width = 300;
    this.height = 200;
  }

  render() {
    return `<svg version="1.1" width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">${this.shapeElement}${this.textElement}</svg>`;
  }

  setText(message, color, fontSize = 60) {
    if (message.length > 3) {
      throw new Error("Text must not exceed 3 characters.");
    }
    this.textElement = `<text x="${this.width / 2}" y="${this.height / 1.5}" font-size="${fontSize}" text-anchor="middle" fill="${color}">${message}</text>`;
    return this; // Allow method chaining
  }

  setShape(shape) {
    this.shapeElement = shape.render();
    return this; // Allow method chaining
  }
}

module.exports = SVG;

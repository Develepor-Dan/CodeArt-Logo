const inquirer = require("inquirer");
const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
  async run() {
    try {
      // Prompting the user for input
      const { text, textColor, shapeType, shapeColor } = await inquirer.prompt([
        {
          name: "text",
          type: "input",
          message: "Enter text for the logo (up to 3 characters):",
          validate: (text) =>
            text.length <= 3 || "The message must not exceed 3 characters.",
        },
        {
          name: "textColor",
          type: "input",
          message: "Enter a text color:",
        },
        {
          name: "shapeType",
          type: "list",
          message: "Select a shape for the logo:",
          choices: ["circle", "square", "triangle"],
        },
        {
          name: "shapeColor",
          type: "input",
          message: "Enter a shape color:",
        },
      ]);

      // Creating a shape based on user input
      let shape;
      switch (shapeType) {
        case "circle":
          shape = new Circle();
          break;

        case "square":
          shape = new Square();
          break;

        default:
          shape = new Triangle();
          break;
      }
      shape.setColor(shapeColor);

      // Creating an SVG object
      const svg = new SVG();
      // Setting text and text color
      svg.setText(text, textColor);
      // Setting the chosen shape
      svg.setShape(shape);

      // Writing the SVG file
      await writeFile("logo.svg", svg.render());

      // Logging success message when the logo is generated
      console.log("Generated logo.svg");
    } catch (error) {
      // Logging error message if any error occurs
      console.error("Oops! Something went wrong.", error);
    }
  }
}

module.exports = CLI;

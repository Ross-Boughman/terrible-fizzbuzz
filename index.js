const fs = require("fs");

const delayFactor = 33;
const baseDelay = 1000; // Initial delay for the first line
const delayMultiplier = 1.05; // Multiplier for each subsequent line


// code of the created fizzBuzz file
let fizzBuzzCode = `
const delayFactor = ${delayFactor};
const baseDelay = ${baseDelay};
const delayMultiplier = ${delayMultiplier};

const fizzBuzzLines = [
    // maps 100 console logs to fizzBuzzLines array
  ${Array.from({ length: 100 }, (_, i) => i + 1)
    .map((i) => {
        // slowly increases delay between lines
      const delay = baseDelay * Math.pow(delayMultiplier, i - 1);
      if (i % 3 === 0 && i % 5 === 0) { // if divisible by both three and five, FizzBuzz
        return `setTimeout(() => { console.log("I'm a soda with a bee in it, FizzBuzz! Also, save the bee."); }, ${delay}),`;
      } else if (i % 3 === 0) { // if divisible by three, Fizz
        return `setTimeout(() => { console.log("I'm a soda, Fizz!"); }, ${delay}),`;
      } else if (i % 5 === 0) { // if divisible by five, Buzz
        return `setTimeout(() => { console.log("I'm a bee, Buzz!"); }, ${delay}),`;
      } else { // logs number of i
        return `setTimeout(() => { console.log("I'm a normal boring number, ${i}."); }, ${delay}),`;
      }
    })
    .join("\n")}
];

// runs FizzBuzz
function runFizzBuzz() {
  let currentIndex = 0;

  // runs through each created console log
  function executeLine() {
    if (currentIndex < fizzBuzzLines.length) {
      eval(fizzBuzzLines[currentIndex]);
      currentIndex++;
    }
  }

  // adds delay to each log
  setTimeout(executeLine, delayFactor);
}

runFizzBuzz();
`;

// creating new fizzBuzz file
fs.writeFile("fizzBuzz.js", fizzBuzzCode, (err) => {
  if (err) {
    console.error("Error creating fizzBuzz.js:", err);
  } else {
    console.log("fizzBuzz.js created successfully!");
    console.log("Running fizzBuzz.js...\n");

    // automatically runs fizzBuzz.js after creating
    const { spawn } = require("child_process");
    const child = spawn("node", ["fizzBuzz.js"]);

    // listens for data from child
    child.stdout.on("data", (data) => {
      console.log(data.toString()); // Prints data from child to console
    });

    child.stderr.on("data", (data) => {
      console.error(`Error executing fizzBuzz.js: ${data}`);
    });

    child.on("close", (code) => {
      console.log("\nFizzBuzz sequence logged!");
    });
  }
});

const cytoscape = require("cytoscape");
const automove = require("cytoscape-automove-foxtrot-test");
const assert = require("assert");
cytoscape.use(automove);
const cy = cytoscape();
assert(Object.getPrototypeOf(cy).automove != null);
console.log("Assertion Passed");
// if (Object.getPrototypeOf(cy).automove != null) {
//   console.log("Extension Added");
// } else {
//   console.assert(Object.getPrototypeOf(cy).automove != null, "Null");
// }

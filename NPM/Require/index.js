const cytoscape = require("cytoscape");
const automove = require("cytoscape-automove-foxtrot-test");
cytoscape.use(automove);
const cy = cytoscape();
if (Object.getPrototypeOf(cy).automove != null) {
  console.log("Extension Added");
} else {
  console.assert(Object.getPrototypeOf(cy).automove != null, "Null");
}

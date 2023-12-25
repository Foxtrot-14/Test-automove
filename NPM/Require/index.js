const cytoscape = require("cytoscape");
const automove = require("cytoscape-automove-foxtrot-test");
cytoscape.use(automove);
const cy = cytoscape();
console.assert(Object.getPrototypeOf(cy).automove != null);

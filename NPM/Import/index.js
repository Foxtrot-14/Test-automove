import cytoscape from "cytoscape";
import automove from "cytoscape-automove-foxtrot-test";
import assert from "assert";
cytoscape.use(automove);
console.assert(cytoscape != null);
console.assert(automove != null);

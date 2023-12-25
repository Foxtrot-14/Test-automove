import cytoscape from "cytoscape";
import automove from "cytoscape-automove-foxtrot-test";

cytoscape.use(automove);
const cy = cytoscape();
console.assert(Object.getPrototypeOf(cy).automove != null);

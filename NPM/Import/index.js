import assert from "assert";
import cytoscape from "cytoscape";
import automove from "cytoscape-automove-foxtrot-test";

cytoscape.use(automove);
const cy = cytoscape();
assert(Object.getPrototypeOf(cy).automove != null);
console.log("Assertion Passed")
// if (Object.getPrototypeOf(cy).automove != null) {
//   console.log("Extension Added");
// } else {
//   console.assert(Object.getPrototypeOf(cy).automove != null, "Null");
// }

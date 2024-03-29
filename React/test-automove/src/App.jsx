import { useEffect } from "react";
import cytoscape from "cytoscape";
import automove from "cytoscape-automove-foxtrot-test";

const App = () => {
  useEffect(() => {
    // Register automove extension
    cytoscape.use(automove);

    const cy = cytoscape({
      container: document.getElementById("cy"),

      layout: {
        name: "preset",
      },

      style: [
        {
          selector: "node",
          style: {
            label: "data(id)",
          },
        },
        {
          selector: ".mid",
          style: {
            width: 8,
            height: 8,
            label: "",
          },
        },
      ],

      elements: [
        { data: { id: "a" } },
        { data: { id: "b" } },
        { data: { id: "c" } },
        { data: { id: "mid" }, classes: "mid" },
        { data: { source: "a", target: "mid" } },
        { data: { source: "b", target: "mid" } },
        { data: { source: "mid", target: "c" } },

        { data: { id: "d" } },

        { data: { id: "e" } },
        { data: { id: "f" } },
        { data: { source: "e", target: "f" } },

        { data: { id: "g" } },

        { data: { id: "h" } },
        { data: { id: "i" } },
        { data: { source: "h", target: "i" } },

        { data: { id: "j" } },

        { data: { id: "k" } },
        { data: { id: "m" } },
        { data: { id: "n" } },
        { data: { source: "k", target: "m" } },
        { data: { source: "k", target: "n" } },
        { data: { source: "m", target: "n" } },
      ],
    });

    cy.$("#a, #b, #c")
      .makeLayout({
        name: "circle",
        boundingBox: {
          x1: 0,
          y1: 0,
          x2: 300,
          y2: 300,
        },
      })
      .run();

    cy.automove({
      nodesMatching: cy.$("#mid"),
      reposition: "mean",
      meanOnSelfPosition: function (node) {
        return false;
      },
    });

    // dragging mid drags its neighbourhood with it
    cy.automove({
      nodesMatching: cy.$("#mid").neighbourhood().nodes(),
      reposition: "drag",
      dragWith: cy.$("#mid"),
    });

    // d can't go out of a box

    cy.automove({
      nodesMatching: cy.$("#d"),
      reposition: { x1: 350, x2: 450, y1: 100, y2: 200 },
    });

    cy.$("#d").position({ x: 400, y: 150 });

    // e & f have the same y

    var eAndF = cy.$("#e, #f");

    eAndF
      .makeLayout({
        name: "grid",
        boundingBox: { x1: 0, x2: 300, y1: 300, y2: 400 },
        cols: 2,
        fit: false,
      })
      .run();

    cy.automove({
      nodesMatching: cy.$("#e, #f"),
      reposition: function (node) {
        var pos = node.position();

        if (node.grabbed()) {
          return pos;
        }

        var otherNode = eAndF.not(node);

        return {
          x: pos.x,
          y: otherNode.position("y"),
        };
      },
      when: "matching",
    });

    // g kept in viewport

    cy.$("#g").position({ x: 400, y: 350 });

    cy.fit(100); // make sure g is in the viewport for the demo

    cy.automove({
      nodesMatching: cy.$("#g"),
      reposition: "viewport",
    });

    // i gets pulled along with h on drag

    cy.$("#h").position({ x: 585, y: 195 });
    cy.$("#i").position({ x: 510, y: 260 });

    cy.automove({
      nodesMatching: cy.$("#i"),
      reposition: "drag",
      dragWith: cy.$("#h"),
    });

    // j can't go in the box of d

    cy.$("#j").position({ x: 585, y: 350 });

    cy.automove({
      nodesMatching: cy.$("#j"),
      reposition: { type: "outside", x1: 350, x2: 450, y1: 100, y2: 200 },
    });

    // k, m, n all move together on drag as a unit (e.g. cluster)

    cy.$("#k").position({ x: 430, y: -20 });
    cy.$("#m").position({ x: 490, y: -110 });
    cy.$("#n").position({ x: 550, y: -20 });

    cy.automove({
      nodesMatching: cy.$("#k, #m, #n"),
      reposition: "drag",
      dragWith: cy.$("#k, #m, #n"),
    });

    cy.fit(100); // fit to all the layouts

    // .automove-viewport nodes kept in viewport (even if added after this call)
    // convenient but less performant than `nodesMatching: collection`

    cy.automove({
      nodesMatching: ".automove-viewport",
      reposition: "viewport",
    });

    cy.on("tap", function (evt) {
      var tgt = evt.target || evt.cyTarget; // 3.x || 2.x

      if (tgt === cy) {
        cy.add({
          classes: "automove-viewport",
          data: { id: "new" + Math.round(Math.random() * 100) },
          position: {
            x: evt.position.x,
            y: evt.position.y,
          },
        });
      }
    });

    cy.on("cxttap", "node", function (evt) {
      var tgt = evt.target || evt.cyTarget; // 3.x || 2.x

      tgt.remove();
    });
  }, []); // Empty dependency array ensures the code runs only once when the component mounts

  return (
    <div>
      <h1>cytoscape-automove demo</h1>
      <div id="cy" style={{ height: "400px", border: "1px solid #ccc" }}></div>
    </div>
  );
};

export default App;

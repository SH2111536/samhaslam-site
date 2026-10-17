// Regenerates maps/us-states.json from us-atlas (already projected to Albers USA,
// Alaska and Hawaii inset). Run from a scratch dir with the packages installed:
//   npm install us-atlas@3.0.1 topojson-client@3.1.0 d3-geo@3.1.1
//   node <skill>/maps/make_us_states.js <that dir>/node_modules
const path = require("path");
const fs = require("fs");
const mods = path.resolve(process.argv[2]);
const req = (m) => require(path.join(mods, m));
const topojson = req("topojson-client");
const { geoPath } = req("d3-geo");
const us = req("us-atlas/states-albers-10m.json");

const gp = geoPath().digits(1);
const shapes = {};
for (const f of topojson.feature(us, us.objects.states).features) {
  const name = f.properties.name;
  if (name === "District of Columbia" || name === "Puerto Rico") continue;
  const [[x0, y0], [x1, y1]] = gp.bounds(f);
  shapes[name] = { d: gp(f), bbox: [x0, y0, x1 - x0, y1 - y0].map((v) => Math.round(v * 10) / 10) };
}
const out = { source: "us-states", viewBox: "0 0 975 610", attribution: "us-atlas (U.S. Census Bureau cartographic boundaries)", shapes };
fs.writeFileSync(path.join(__dirname, "us-states.json"), JSON.stringify(out));
console.log(Object.keys(shapes).length, "shapes");

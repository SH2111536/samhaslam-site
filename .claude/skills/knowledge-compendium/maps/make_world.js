// Regenerates maps/world.json: country outlines keyed by ISO 3166 alpha-3 code (world-atlas
// 110m, Equal Earth projection, Antarctica dropped), plus a dot for each country too small to
// draw at that scale. Every shape carries cx/cy, its centre on the map (from world-countries),
// which the journey's route line runs through. "context": true draws non-topic shapes faintly.
// Run from a scratch dir with the packages installed:
//   npm install world-atlas@2.0.2 world-countries@5.1.0 topojson-client@3.1.0 d3-geo@3.1.1
//   node <skill>/maps/make_world.js <that dir>/node_modules
const path = require("path");
const fs = require("fs");
const mods = path.resolve(process.argv[2]);
const req = (m) => require(path.join(mods, m));
const topojson = req("topojson-client");
const { geoPath, geoEqualEarth, geoCentroid } = req("d3-geo");
const atlas = req("world-atlas/countries-110m.json");
const countries = req("world-countries/countries.json");

const byNum = Object.fromEntries(countries.filter((c) => c.ccn3).map((c) => [c.ccn3, c]));
const byName = { Kosovo: "UNK" };   // world-atlas has no numeric id for Kosovo

const feats = topojson.feature(atlas, atlas.objects.countries).features
  .filter((f) => f.properties.name !== "Antarctica");
const W = 960;
const proj = geoEqualEarth().fitWidth(W, { type: "FeatureCollection", features: feats });
const gp = geoPath(proj).digits(1);
const [[, y0], [, y1]] = gp.bounds({ type: "FeatureCollection", features: feats });
proj.translate([proj.translate()[0], proj.translate()[1] - y0 + 4]);
const H = Math.ceil(y1 - y0 + 8);

const round = (v) => Math.round(v * 10) / 10;
const shapes = {};
const drawn = new Set();
for (const f of feats) {
  const iso = byNum[f.id]?.cca3 || byName[f.properties.name] || `X-${f.properties.name}`;
  const c = byNum[f.id] || countries.find((x) => x.cca3 === iso);
  const [[a, b], [cc, d]] = gp.bounds(f);
  const centre = proj(c ? [c.latlng[1], c.latlng[0]] : geoCentroid(f));
  shapes[iso] = { d: gp(f), bbox: [a, b, cc - a, d - b].map(round), cx: round(centre[0]), cy: round(centre[1]), name: f.properties.name };
  drawn.add(iso);
}
// countries too small for 110m: a dot at their centre
const R = 2.6;
for (const c of countries) {
  if (drawn.has(c.cca3)) continue;
  const [x, y] = proj([c.latlng[1], c.latlng[0]]).map(round);
  shapes[c.cca3] = {
    d: `M${x - R} ${y}a${R} ${R} 0 1 0 ${2 * R} 0a${R} ${R} 0 1 0 -${2 * R} 0z`,
    bbox: [round(x - 4 * R), round(y - 4 * R), 8 * R, 8 * R], cx: x, cy: y, dot: true, name: c.name.common,
  };
}
const out = { source: "world", viewBox: `-8 0 ${W + 16} ${H}`, context: true, contextSkipDots: true,
  attribution: "world-atlas (Natural Earth) and world-countries", shapes };
fs.writeFileSync(path.join(__dirname, "world.json"), JSON.stringify(out));
console.log(Object.keys(shapes).length, "shapes,", Object.values(shapes).filter((s) => s.dot).length, "dots, viewBox", out.viewBox);

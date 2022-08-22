"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getH3Indexes = void 0;
const lodash_1 = __importDefault(require("lodash"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const h3_js_1 = __importDefault(require("h3-js"));
const axios_1 = __importDefault(require("axios"));
const H3Areas = [
    4250546.8477,
    607220.9782429,
    86745.8540347,
    12392.2648621,
    1770.3235517,
    252.9033645,
    36.1290521,
    5.1612932,
    0.7373276,
    0.1053325,
    0.0150475,
    0.0021496,
    0.0003071,
    0.0000439,
    0.0000063,
    0.0000009
];
async function getPolygon(address) {
    const url = encodeURI(`https://nominatim.openstreetmap.org/search.php?q=${address}&polygon_geojson=1&format=json`);
    const { status, data } = await axios_1.default.get(url);
    const d = data.find((v) => v.osm_type == 'relation' && v.class == 'boundary' && v.type == 'administrative');
    return {
        polygon: lodash_1.default.get(d, 'geojson.coordinates[0]'),
        box: lodash_1.default.get(d, 'boundingbox')
    };
}
async function getH3Indexes(address) {
    const { polygon, box } = await getPolygon(address);
    const area = new bignumber_js_1.default(h3_js_1.default.pointDist([box[0], box[2]], [box[0], box[3]], "km"))
        .times(h3_js_1.default.pointDist([box[0], box[2]], [box[1], box[2]], "km"));
    const first = lodash_1.default.findIndex(H3Areas, v => new bignumber_js_1.default(v).lt(area));
    let resolution = first;
    let ids;
    for (let i = first; i < 16; i++) {
        ids = h3_js_1.default.polyfill(polygon, i, true);
        if (ids.length >= 3 && ids.length <= 20) {
            resolution = i;
            break;
        }
    }
    return { resolution, ids };
}
exports.getH3Indexes = getH3Indexes;
//# sourceMappingURL=polygon.js.map
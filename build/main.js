"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const MAX_PARTITION_LENGTH = 1000000; // 10MB
const combatLog = [];
function bufferToText(buffer, start, end) {
    const bufferLengthLeft = buffer.byteLength - start;
    const realEnd = end <= bufferLengthLeft ? end : bufferLengthLeft;
    const bufferUint8Array = new Uint8Array(buffer, start, realEnd);
    return new TextDecoder().decode(bufferUint8Array);
}
function parsedWoWEvent(timestamp, params) {
    var _a, _b, _c, _d;
    switch (params[0]) {
        case 'ENCOUNTER_START': {
            return {
                timestamp: timestamp,
                id: (0, uuid_1.v4)(),
                subevent: params[0],
                encounterID: parseInt(params[1], 10),
                encounterName: (_a = params[2]) === null || _a === void 0 ? void 0 : _a.replaceAll('"', ''),
                difficultyId: parseInt(params[3], 10),
                groupSize: parseInt(params[4], 10),
            };
        }
        case 'ENCOUNTER_END': {
            return {
                timestamp: timestamp,
                id: (0, uuid_1.v4)(),
                subevent: params[0],
                encounterID: parseInt(params[1], 10),
                encounterName: (_b = params[2]) === null || _b === void 0 ? void 0 : _b.replaceAll('"', ''),
                difficultyId: parseInt(params[3], 10),
                groupSize: parseInt(params[4], 10),
                success: params[5] === '1',
            };
        }
        case 'COMBAT_LOG_VERSION': {
            // COMBAT_LOG_VERSION,20,ADVANCED_LOG_ENABLED,0,BUILD_VERSION,10.0.7,PROJECT_ID,1
            return {
                timestamp: timestamp,
                id: (0, uuid_1.v4)(),
                subevent: params[0],
                version: parseInt(params[1], 10),
                advancedLogEnabled: !!params[3],
                buildVersion: params[5],
                projectId: params[7],
            };
        }
        case 'ZONE_CHANGE': {
            return {
                timestamp: timestamp,
                id: (0, uuid_1.v4)(),
                subevent: params[0],
                zoneId: params[1],
                zoneName: params[2],
            };
        }
        case 'MAP_CHANGE': {
            return {
                timestamp: timestamp,
                id: (0, uuid_1.v4)(),
                subevent: params[0],
                mapId: params[1],
                mapName: params[2],
            };
        }
        default: {
            return {
                timestamp: timestamp,
                id: (0, uuid_1.v4)(),
                subevent: params[0],
                sourceGuid: params[1],
                sourceName: (_c = params[2]) === null || _c === void 0 ? void 0 : _c.replaceAll('"', ''),
                sourceFlags: params[3],
                sourceRaidFlags: params[4],
                destGuid: params[5],
                destName: (_d = params[6]) === null || _d === void 0 ? void 0 : _d.replaceAll('"', ''),
                destFlags: params[7],
                destRaidFlags: params[8],
                rest: [...params.slice(8)],
            };
        }
    }
}
function readFile(file) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const currentYear = new Date().getFullYear();
        const readInterface = readline.createInterface({
            input: fs.createReadStream(path_1.default.join('C:\\Program Files (x86)\\World of Warcraft\\_retail_\\Logs', `${file}.txt`)),
        });
        const rightNow = new Date().getTime();
        console.log('Parsing file', new Date().getTime());
        try {
            for (var _d = true, readInterface_1 = __asyncValues(readInterface), readInterface_1_1; readInterface_1_1 = yield readInterface_1.next(), _a = readInterface_1_1.done, !_a;) {
                _c = readInterface_1_1.value;
                _d = false;
                try {
                    const line = _c;
                    const e = line.split('  ');
                    const d = e[0].split(' ');
                    d[0] += `/${currentYear}`;
                    const timestamp = new Date(d.join(' ')).getTime();
                    const params = e[1].match(/("[^"]*")|[^,]+/g);
                    combatLog.push(parsedWoWEvent(timestamp, params));
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = readInterface_1.return)) yield _b.call(readInterface_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log('Done parsing file', `${(new Date().getTime() - rightNow) / 1000} seconds`);
    });
}
exports.readFile = readFile;
const logToRead = process.argv[2];
console.log(`log to read`, logToRead);
readFile(logToRead);

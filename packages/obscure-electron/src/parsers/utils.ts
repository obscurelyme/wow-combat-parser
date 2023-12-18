import type { AdvancedParams } from '@obscure/types';

export function baseParams(params: string[]) {
  return {
    sourceGuid: params[0],
    sourceName: params[1],
    sourceFlags: parseInt(params[2]),
    sourceRaidFlags: parseInt(params[3]),
    destGuid: params[4],
    destName: params[5],
    destFlags: parseInt(params[6]),
    destRaidFlags: parseInt(params[7]),
  };
}

export function prefixParams(params: string[]) {
  return {
    spellId: parseInt(params[0]),
    spellName: params[1],
    spellSchool: parseInt(params[2]),
  };
}

export function advancedParams(params: string[]): AdvancedParams {
  return {
    infoGUID: params[0],
    ownerGUID: params[1],
    currentHP: parseInt(params[2]),
    maxHP: parseInt(params[3]),
    attackPower: parseInt(params[4]),
    spellPower: parseInt(params[5]),
    armor: parseInt(params[6]),
    absorb: parseInt(params[7]),
    powerType: parseInt(params[8]),
    currentPower: parseInt(params[9]),
    maxPower: parseInt(params[10]),
    powerCost: parseInt(params[11]),
    positionX: parseInt(params[12]),
    positionY: parseInt(params[13]),
    uiMapID: parseInt(params[14]),
    facing: parseInt(params[15]),
    level: parseInt(params[16]),
  };
}

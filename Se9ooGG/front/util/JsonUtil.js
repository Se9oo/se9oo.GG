import champion from '../json/champion.json';
import championFull from '../json/championFull.json';
import spell from '../json/summoner.json';
import rune from '../json/runesReforged.json';
import queue from '../json/queues.json';
import championList from '../json/champion.json';

export function getChampionList() {
  const arr = [];
  for (let i in championList.data) {
    arr.push(championList.data[i]);
  }

  return arr;
}

export function getChampionFullInfoByName(name) {
  const fullData = championFull.data;

  for (let i in fullData) {
    if (fullData[i].id === name) {
      return fullData[i];
    }
  }
  return null;
}

export function getChampionFullInfoById(id) {
  const fullData = championFull.data;

  for (let i in fullData) {
    if (fullData[i].key == id) {
      return fullData[i];
    }
  }
  return null;
}

export function getChampionInfoById(id) {
  const data = champion.data;

  for (let i in data) {
    if (data[i].key == id) {
      return data[i];
    }
  }
  return null;
}

export function getChampionNameById(id) {
  const data = champion.data;

  for (let i in data) {
    if (data[i].key == id) {
      const nameData = {
        kor: data[i].name,
        eng: data[i].id,
      };
      return nameData;
    }
  }
  return null;
}

export function getSpellNameById(spell1, spell2) {
  const data = spell.data;
  const spellName = [];

  for (let i in data) {
    if (data[i].key == spell1 || data[i].key == spell2) {
      spellName.push({
        kor: data[i].name,
        eng: data[i].id,
      });
    }
  }
  return spellName;
}

export function getRuneImgUrl(perkInfo) {
  const runeImgUrl = {};

  // primary Rune 세팅
  const primaryPerk = rune.find((perk) => perk.id === perkInfo.perkPrimaryStyle);
  runeImgUrl.primaryPerk = primaryPerk.icon;

  primaryPerk.slots.map((slot, i) => {
    if (perkInfo.hasOwnProperty(`perk${i}`)) {
      const perks = slot.runes.find((perk) => perk.id === perkInfo[`perk${i}`]);
      runeImgUrl[`perk${i}`] = perks.icon;
    }
  });

  // sub Rune 세팅
  const subPerk = rune.find((perk) => perk.id === perkInfo.perkSubStyle);
  let subPerks = [];
  subPerk.slots.slice(1, 4).map((perk) => {
    perk.runes.map((p) => subPerks.push(p));
  });

  runeImgUrl.subPerk = subPerk.icon;
  if (perkInfo.hasOwnProperty('perk4') && perkInfo.hasOwnProperty('perk5')) {
    const perk4 = subPerks.find((perk) => perk.id === perkInfo.perk4);
    const perk5 = subPerks.find((perk) => perk.id === perkInfo.perk5);

    runeImgUrl.perk4 = perk4.icon;
    runeImgUrl.perk5 = perk5.icon;
  }

  return runeImgUrl;
}

export function getAllRuneImgUrl(perkInfo) {
  let allRuneImgUrl = [];
  const primaryPerk = rune.find((perk) => perk.id === perkInfo.perkPrimaryStyle);
  const subPerk = rune.find((perk) => perk.id === perkInfo.perkSubStyle);

  allRuneImgUrl.push(primaryPerk);
  allRuneImgUrl.push(subPerk);

  return allRuneImgUrl;
}

export function getQueueType(queueId) {
  const queueType = queue.find((v) => v.queueId === queueId);

  switch (queueType.queueId) {
    case 420:
      return '솔랭';
    case 430:
      return '일반';
    case 440:
      return '자유 5:5 랭크';
    case 450:
      return '무작위 총력전';
    default:
      return '-';
  }
}

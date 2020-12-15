import champion from '../json/champion.json';
import spell from '../json/summoner.json';
import rune from '../json/runesReforged.json';
import queue from '../json/queues.json';

export function getChampionInfoById(id) {
  const data = champion.data;

  for (let i in data) {
    if (data[i].key == id) {
      return data[i];
    }
  }
  return null;
};

export function getChampionNameById(id) {
  const data = champion.data;

  for (let i in data) {
    if (data[i].key == id) {
      const nameData = {
        kor: data[i].name,
        eng: data[i].id
      }
      return nameData;
    }
  }
  return null;
};

export function getSpellNameById(spell1, spell2) {
  const data = spell.data;
  const spellName = [];

  for (let i in data) {
    if (data[i].key == spell1 || data[i].key == spell2) {
      spellName.push({
        kor: data[i].name,
        eng: data[i].id
      });
    }
  }
  return spellName;
};

export function getRuneImgUrl(perkInfo) {
  const runeImgUrl = {};

  const primaryPerk = rune.find((perk) => perk.id === perkInfo.perkPrimaryStyle);
  const perk0 = primaryPerk.slots[0].runes.find((perk) => perk.id === perkInfo.perk0);

  const subPerk = rune.find((perk) => perk.id === perkInfo.perkSubStyle);

  runeImgUrl.perk0 = perk0.icon;
  runeImgUrl.subPerk = subPerk.icon;

  return runeImgUrl;
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
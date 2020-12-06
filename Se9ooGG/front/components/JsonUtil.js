import champion from '../json/champion.json';
import spell from '../json/summoner.json';

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
}
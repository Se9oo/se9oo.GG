import champion from '../json/champion.json';

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
        eng: data[i].id
      }
      return nameData;
    }
  }
  return null;
}
// 라인 순서대로 정렬
export function getListOrder(lane, role) {
  switch (lane) {
    case 'TOP':
      return 0;
    case 'JUNGLE':
      return 1;
    case 'MIDDLE':
      return 2;
    case 'BOTTOM':
      if (role === 'CARRY') {
        return 3;
      } else {
        return 4;
      }
  }
}

// KDA 계산
export function getKDA(kill, death, assist) {
  return death === 0 ? 'perfect' : ((kill + assist) / death).toFixed(2);
}

// 게임 진행 시간
export function getGameDuration(duration) {
  let minutes = parseInt(duration / 60);
  let seconds = duration % 60;

  if (minutes.toString().length === 1) {
    minutes = '0' + minutes;
  }

  if (seconds.toString().length === 1) {
    seconds = '0' + seconds;
  }

  const gameDuration = {
    minutes: minutes,
    seconds: seconds,
  };

  return gameDuration;
}

// 게임 생성 시간
export function getGameCreation(creation) {
  const now = new Date();
  const gameCreation = new Date(creation);
  const diffSecond = (now.getTime() - gameCreation.getTime()) / 1000;
  const diffMinute = diffSecond / 60;
  const diffHour = diffMinute / 60;
  const diffDate = diffHour / 24;
  const diffMonth = diffDate / 30;

  if (Math.round(diffMonth) > 0) {
    return `${Math.round(diffMonth)}달전`;
  }
  if (Math.round(diffDate) > 0) {
    return `${Math.round(diffDate)}일전`;
  }
  if (Math.round(diffHour) > 0) {
    return `${Math.round(diffHour)}시간전`;
  }
  if (Math.round(diffMinute) > 0) {
    return `${Math.round(diffMinute)}분전`;
  }
  if (Math.round(diffSecond) > 0) {
    return `${Math.round(diffSecond)}초전`;
  }
  return '-';
}

// 승률 구하기
export function getWinRate(win, lose) {
  return lose === 0 ? 100 : Math.floor((win / (win + lose)) * 100);
}

// etc chart graph color
export function getColorByParticipantId(id) {
  switch (id) {
    case 1:
      return '#b197fc';
    case 2:
      return '#ffa8a8';
    case 3:
      return '#91a7ff';
    case 4:
      return '#66d9e8';
    case 5:
      return '#74c0fc';
    case 6:
      return '#c0eb75';
    case 7:
      return '#ffe066';
    case 8:
      return '#ffc078';
    case 9:
      return '#099268';
    case 10:
      return '#e8590c';
  }
}

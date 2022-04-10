import { PREFERRED_DISPLAY_LANGUAGE } from '../constants/settings';

const gameStateKey = 'gameState';
const shareStatusKey = 'shareStatus';
const highContrastKey = 'highContrast';
const hintModeKey = 'hintMode';
const displayLanguageKey = 'displayLanguage';
const timezoneKey = 'timezone';

type StoredShareStatus = {
  isHintMode: boolean;
  isHardMode: boolean;
};

export const saveShareStatusToLocalStorage = (
  isHintMode: boolean,
  isHardMode: boolean
) => {
  const shareStatus = {
    isHintMode,
    isHardMode,
  };
  localStorage.setItem(shareStatusKey, JSON.stringify(shareStatus));
};

export const removeShareStatusFromLocalStorage = () => {
  localStorage.removeItem(shareStatusKey);
};

export const loadShareStatusFromLocalStorage = () => {
  const state = localStorage.getItem(shareStatusKey);
  if (state) {
    return JSON.parse(state) as StoredShareStatus;
  } else {
    return null;
  }
};

type StoredGameState = {
  guesses: string[];
  solution: string;
};

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);
  if (state) {
    let parsedInheritedGameState = JSON.parse(state);
    if (parsedInheritedGameState.hasOwnProperty('boardState')) {
      let boardState = [];
      for (var i = 0; i < 12; i++) {
        if (parsedInheritedGameState['boardState'][i] !== '') {
          boardState.push(parsedInheritedGameState['boardState'][i]);
        }
      }
      return {
        guesses: boardState,
        solution: parsedInheritedGameState.solution,
      } as StoredGameState;
    } else {
      return JSON.parse(state) as StoredGameState;
    }
  } else {
    return null;
  }
};

const inheritedGameStatKey = 'statistics';

export type inheritedStatsType = {
  currentStreak: number;
  maxStreak: number;
  guesses: { [key: string]: number };
  winPercentage: number;
  gamesPlayed: number;
  gamesWon: number;
  averageGuesses: number;
};

const gameStatKey = 'gameStats';

export type GameStats = {
  winDistribution: number[];
  gamesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalGames: number;
  successRate: number;
};

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats));
};

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey);
  if (stats) {
    return JSON.parse(stats) as GameStats;
  } else {
    const inheritedStats = localStorage.getItem(inheritedGameStatKey);
    if (inheritedStats) {
      let parsedInheritedStats = JSON.parse(
        inheritedStats
      ) as inheritedStatsType;
      if (parsedInheritedStats) {
        let inheritedWinDistribution = [
          parsedInheritedStats['guesses']['1'],
          parsedInheritedStats['guesses']['2'],
          parsedInheritedStats['guesses']['3'],
          parsedInheritedStats['guesses']['4'],
          parsedInheritedStats['guesses']['5'],
          parsedInheritedStats['guesses']['6'],
          parsedInheritedStats['guesses']['7'],
          parsedInheritedStats['guesses']['8'],
          parsedInheritedStats['guesses']['9'],
          parsedInheritedStats['guesses']['10'],
          parsedInheritedStats['guesses']['11'],
          parsedInheritedStats['guesses']['12'],
        ];
        return {
          winDistribution: inheritedWinDistribution,
          gamesFailed:
            parsedInheritedStats['gamesPlayed'] -
            parsedInheritedStats['gamesWon'],
          currentStreak: parsedInheritedStats['currentStreak'],
          bestStreak: parsedInheritedStats['maxStreak'],
          totalGames: parsedInheritedStats['gamesPlayed'],
          successRate: parsedInheritedStats['winPercentage'],
        } as GameStats;
      }
    } else {
      return null;
    }
  }
};

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1');
  } else {
    localStorage.removeItem(highContrastKey);
  }
};

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey);
  return highContrast === '1';
};

export const setStoredIsHintMode = (isHint: boolean) => {
  if (isHint) {
    localStorage.setItem(hintModeKey, 'hint');
  } else {
    localStorage.setItem(hintModeKey, 'normal');
  }
};

export const getStoredIsHintMode = () => {
  if (localStorage.getItem(hintModeKey)) {
    const hintMode = localStorage.getItem(hintModeKey);
    return hintMode === 'hint';
  } else {
    setStoredIsHintMode(true);
    return true;
  }
};

export const setStoredDisplayLanguage = (displayLanguage: string) => {
  localStorage.setItem(displayLanguageKey, displayLanguage);
};

export const getStoredDisplayLanguage = () => {
  if (localStorage.getItem(displayLanguageKey)) {
    return localStorage.getItem(displayLanguageKey);
  } else {
    const displayLanguage =
      navigator.language === PREFERRED_DISPLAY_LANGUAGE
        ? PREFERRED_DISPLAY_LANGUAGE
        : 'en';
    setStoredDisplayLanguage(displayLanguage);
    return displayLanguage;
  }
};

export const setStoredTimezone = (timezone: string) => {
  localStorage.setItem(timezoneKey, timezone);
};

export const getStoredTimezone = () => {
  let timezone = localStorage.getItem(timezoneKey);
  if (!timezone) {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setStoredTimezone(timezone);
  }
  return timezone;
};

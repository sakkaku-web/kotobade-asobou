import { TranslateIcon } from '@heroicons/react/outline';
import classnames from 'classnames';
import TimezoneSelect from 'react-timezone-select';
import type { ITimezone } from 'react-timezone-select';
import { BaseModal } from './BaseModal';
import { SettingsToggle } from './SettingsToggle';
import { PREFERRED_DISPLAY_LANGUAGE } from '../../constants/settings';
import { t } from '../../constants/strings';
import { getStoredIsHighContrastMode } from '../../lib/localStorage';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  timezone: ITimezone;
  handleTimezone: (timezone: ITimezone) => void;
  isHintMode: boolean;
  handleHintMode: Function;
  isHardMode: boolean;
  handleHardMode: Function;
  isDarkMode: boolean;
  handleDarkMode: Function;
  isHighContrastMode: boolean;
  handleHighContrastMode: Function;
  displayLanguage: string;
  handleDisplayLanguage: Function;
};

export const SettingsModal = ({
  isOpen,
  handleClose,
  timezone,
  handleTimezone,
  isHintMode,
  handleHintMode,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  displayLanguage,
  handleDisplayLanguage,
}: Props) => {
  const isHighContrast = getStoredIsHighContrastMode();

  const aboutClassName = classnames(
    displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? 'local-font' : '',
    'text-left text-sm text-gray-500 dark:text-gray-300'
  );

  return (
    <BaseModal title={t('Settings')} isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4">
        <div className="flex justify-between items-center gap-8 mt-3">
          <div className="text-left">
            <h2 className="local-font text-base text-gray-600 dark:text-gray-300">
              {t('Language')}
            </h2>
          </div>
          <div className="w-36 text-right">
            <button
              onClick={() =>
                handleDisplayLanguage(
                  displayLanguage === PREFERRED_DISPLAY_LANGUAGE
                    ? 'en'
                    : PREFERRED_DISPLAY_LANGUAGE
                )
              }
              className="local-font text-black dark:text-white shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent cursor-pointer"
            >
              <div className="flex mx-auto items-center">
                <TranslateIcon className="h-6 w-6 -ml-1 mr-1" />
                {t('Switch to language')}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="grid-cols-1 gap-4">
        <div className="flex justify-between items-center mt-3">
          <h2 className="local-font text-base text-gray-600 dark:text-gray-300">
            {t('Timezone')}
          </h2>
        </div>
      </div>
      <div className="grid-cols-1 gap-4">
        <div className="flex-grow text-left text-sm mt-3">
          <TimezoneSelect value={timezone} onChange={handleTimezone} />
        </div>
      </div>
      <div className="grid-cols-2 gap-4 pt-1">
        <SettingsToggle
          settingName={t('Hint Mode')}
          flag={isHintMode}
          handleFlag={handleHintMode}
          description={t('HINT_MODE_DESCRIPTION')}
        />
        <SettingsToggle
          settingName={t('Hard Mode')}
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={t(
            'HARD_MODE_DESCRIPTION',
            isHighContrast ? '🟧' : '🟩',
            isHighContrast ? '🟦' : '🟨'
          )}
        />
        <hr />
        <SettingsToggle
          settingName={t('Dark Mode')}
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName={t('High Contrast Mode')}
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={t('HIGH_CONTRAST_MODE_DESCRIPTION')}
        />
        <hr />
        <div className="flex justify-between items-center gap-8 mt-3">
          <div className="text-left">
            <h2 className="local-font text-base text-gray-600 dark:text-gray-300">
              {t('Feedback')}
            </h2>
          </div>
          <div className="w-36 text-right">
            {' '}
            <a
              className="underline text-sm text-gray-600 dark:text-gray-300"
              href="https://github.com/taximanli/kotobade-asobou/issues"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
            {' |'}{' '}
            <a
              className="underline text-sm text-gray-600 dark:text-gray-300"
              href="https://twitter.com/taximanli"
              rel="noreferrer"
              target="_blank"
            >
              Twitter
            </a>{' '}
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <div className="grid-cols-1 gap-4">
        <div className="flex justify-between items-center gap-8 mt-3">
          <p className={aboutClassName}>
            {t('This game is the')}{' '}
            <a
              className="underline text-sm text-gray-600 dark:text-gray-300"
              href="https://github.com/taximanli/kotobade-asobou"
              rel="noreferrer"
              target="_blank"
            >
              {t('Japanese version')}
            </a>{' '}
            {t('word guessing game')}{' '}
            <a
              className="underline text-sm text-gray-600 dark:text-gray-300"
              href="https://github.com/cwackerfuss/react-wordle"
              rel="noreferrer"
              target="_blank"
            >
              {t('open source version')}
            </a>{' '}
            {t('massive development')}
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

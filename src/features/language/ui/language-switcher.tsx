import React from 'react';
import { useTranslation } from '../../../shared/i18n/language-context';
import styles from './language-switcher.module.css';

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className={styles['language-switcher']}>
      <button
        className={`${styles.button} ${language === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
      >
        🇺🇸 EN
      </button>
      <button
        className={`${styles.button} ${language === 'ru' ? styles.active : ''}`}
        onClick={() => setLanguage('ru')}
      >
        🇷🇺 RU
      </button>
    </div>
  );
} 
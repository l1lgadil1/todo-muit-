import React from 'react';
import { useTheme } from '../../../shared/theme/theme-context';
import styles from './theme-switcher.module.css';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={handleChange}
        className={styles.input}
      />
      <span className={`${styles.slider} ${theme === 'dark' ? styles.dark : ''}`}>
        <span className={styles.icon}>🌙</span>
        <span className={styles.icon}>☀️</span>
      </span>
    </label>
  );
} 
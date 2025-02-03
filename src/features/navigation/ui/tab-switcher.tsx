import React from 'react';
import { useTranslation } from '../../../shared/i18n/language-context';
import styles from './tab-switcher.module.css';

type Tab = 'tasks' | 'pomodoro';

interface TabSwitcherProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  const { t } = useTranslation();

  return (
    <div className={styles['tab-switcher']}>
      <button
        className={`${styles.tab} ${activeTab === 'tasks' ? styles.active : ''}`}
        onClick={() => onTabChange('tasks')}
      >
        📝 {t('tabs.tasks')}
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'pomodoro' ? styles.active : ''}`}
        onClick={() => onTabChange('pomodoro')}
      >
        ⏱️ {t('tabs.pomodoro')}
      </button>
    </div>
  );
} 
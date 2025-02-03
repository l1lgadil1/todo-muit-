import React, { useState, useEffect } from 'react';
import { TaskManager } from '../../../widgets/task-manager';
import { PomodoroTimer } from '../../../features/pomodoro/ui/pomodoro-timer';
import { AppTab, getActiveTab, setActiveTab } from '../../../shared/lib/local-storage/app-settings';
import styles from './app-tabs.module.css';

export const AppTabs: React.FC = () => {
  // Initialize with the saved tab from localStorage
  const [activeTab, setActiveTabState] = useState<AppTab>(getActiveTab);

  // Sync with localStorage whenever tab changes
  useEffect(() => {
    setActiveTab(activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: AppTab) => {
    setActiveTabState(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'tasks' ? styles.active : ''}`}
          onClick={() => handleTabChange('tasks')}
        >
          Tasks
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'pomodoro' ? styles.active : ''}`}
          onClick={() => handleTabChange('pomodoro')}
        >
          Pomodoro
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'tasks' ? <TaskManager /> : <PomodoroTimer />}
      </div>
    </div>
  );
}; 
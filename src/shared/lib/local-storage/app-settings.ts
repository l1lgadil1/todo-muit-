const APP_SETTINGS_KEY = 'app-settings';

export type AppTab = 'tasks' | 'pomodoro';

interface AppSettings {
  activeTab: AppTab;
}

const DEFAULT_APP_SETTINGS: AppSettings = {
  activeTab: 'tasks',
};

export const loadAppSettings = (): AppSettings => {
  try {
    const savedSettings = localStorage.getItem(APP_SETTINGS_KEY);
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      // Validate that the loaded tab is a valid AppTab
      if (parsed.activeTab && (parsed.activeTab === 'tasks' || parsed.activeTab === 'pomodoro')) {
        return { ...DEFAULT_APP_SETTINGS, ...parsed };
      }
    }
  } catch (error) {
    console.error('Error loading app settings:', error);
  }
  return DEFAULT_APP_SETTINGS;
};

export const saveAppSettings = (settings: Partial<AppSettings>): void => {
  try {
    const currentSettings = loadAppSettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(newSettings));
  } catch (error) {
    console.error('Error saving app settings:', error);
  }
};

export const getActiveTab = (): AppTab => {
  const settings = loadAppSettings();
  return settings.activeTab;
};

export const setActiveTab = (tab: AppTab): void => {
  if (tab === 'tasks' || tab === 'pomodoro') {
    saveAppSettings({ activeTab: tab });
  }
}; 
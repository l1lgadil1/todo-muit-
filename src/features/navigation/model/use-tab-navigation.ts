import { useEffect, useState } from 'react';
import { Tab } from '../ui/tab-switcher';

export const useTabNavigation = () => {
  const [activeTab, setActiveTab] = useState<Tab>('tasks');
  const saveActiveTab = (tab:Tab) => {
    localStorage.setItem('activeTab', tab);
  };


  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab as Tab);
    }
  }, []); 

  return {
    activeTab,
    setActiveTab: (tab: Tab) => {
      setActiveTab(tab);
      saveActiveTab(tab);
    },
  };
}; 
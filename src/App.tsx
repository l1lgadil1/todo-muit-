import { TabSwitcher } from './features/navigation/ui/tab-switcher'
import { TaskSection } from './widgets/task-manager/task-section'
import { useTaskManager } from './features/task/model/use-task-manager'
import { useTabNavigation } from './features/navigation/model/use-tab-navigation'
import { LanguageProvider, useTranslation } from './shared/i18n/language-context'
import { ThemeProvider } from './shared/theme/theme-context'
import { LanguageSwitcher } from './features/language/ui/language-switcher'
import { ThemeSwitcher } from './features/theme/ui/theme-switcher'
import './App.css'
import { PomodoroTimer } from './features/pomodoro/ui/pomodoro-timer'
import { useState } from 'react'
import { TaskStatus } from './shared/types/task'

function AppContent() {
  const {
    tasks,
    filters,
    setFilters,
    handleCreateTask,
    handleStatusChange,
    handleDeleteTask,
    handleUpdateTask,
  } = useTaskManager()

  const { activeTab, setActiveTab } = useTabNavigation()
  const { t } = useTranslation()
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(undefined)

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">{t('app.title')}</h1>
          <div className="header-actions">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="main">
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'tasks' ? (
          <TaskSection
            tasks={tasks}
            filters={filters as { status: string; search: string }}
            onFilterChange={setFilters as (filters: { status: string; search: string }) => void}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onCreateTask={handleCreateTask}
            onUpdateTask={handleUpdateTask}
          />
        ) : (
          <section className="section pomodoro-section">
            <PomodoroTimer
              tasks={tasks}
              onTaskStatusChange={handleStatusChange}
              selectedTaskId={selectedTaskId}
              onSelectTask={(taskId: string) => setSelectedTaskId(taskId)}
            />
          </section>
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

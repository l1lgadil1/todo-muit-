import { TabSwitcher } from './features/navigation/ui/tab-switcher'
import { TaskSection } from './widgets/task-manager/task-section'
import { useTaskManager } from './features/task/model/use-task-manager'
import { useTabNavigation } from './features/navigation/model/use-tab-navigation'
import { LanguageProvider, useTranslation } from './shared/i18n/language-context'
import { LanguageSwitcher } from './features/language/ui/language-switcher'
import './App.css'
import { PomodoroTimer } from './features/pomodoro/ui/pomodoro-timer'

function AppContent() {
  const {
    tasks,
    filters,
    setFilters,
    handleCreateTask,
    handleStatusChange,
    handleDeleteTask,
  } = useTaskManager()

  const { activeTab, setActiveTab } = useTabNavigation()
  const { t } = useTranslation()

  return (
    <div className="app">
      <LanguageSwitcher />
      <header className="header">
        <h1>{t('app.title')}</h1>
      </header>

      <main className="main">
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'tasks' ? (
          <TaskSection
            tasks={tasks}
            filters={filters}
            onFilterChange={setFilters}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onCreateTask={handleCreateTask}
          />
        ) : (
          <section className="section pomodoro-section">
            <PomodoroTimer
              tasks={tasks}
              onTaskStatusChange={handleStatusChange}
            />
          </section>
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App

export const translations = {
  en: {
    app: {
      title: 'Task Manager with Pomodoro',
      loading: 'Loading...',
      error: 'Something went wrong',
    },
    theme: {
      light: 'Light Theme',
      dark: 'Dark Theme',
      system: 'System Theme',
      switchToLight: 'Switch to Light Theme',
      switchToDark: 'Switch to Dark Theme',
      switchToSystem: 'Use System Theme',
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      none: 'None',
      required: 'Required',
      optional: 'Optional',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    tabs: {
      tasks: 'Tasks',
      pomodoro: 'Pomodoro',
    },
    tasks: {
      title: 'Tasks',
      addTask: 'Add Task',
      editTask: 'Edit Task',
      deleteTask: 'Delete Task',
      noTasks: 'No tasks yet. Create your first task!',
      filters: {
        all: 'All Tasks',
        active: 'Active',
        completed: 'Completed',
        search: 'Search tasks...',
        priority: 'Priority',
        status: 'Status',
        tags: 'Tags',
      },
      form: {
        title: 'Title',
        titlePlaceholder: 'Enter task title',
        description: 'Description',
        descriptionPlaceholder: 'Enter task description',
        estimatedPomodoros: 'Estimated Pomodoros',
        priority: {
          label: 'Priority',
          low: 'Low Priority',
          medium: 'Medium Priority',
          high: 'High Priority',
        },
        status: {
          label: 'Status',
          todo: 'To Do',
          inProgress: 'In Progress',
          completed: 'Completed',
        },
        tags: 'Tags',
        tagsPlaceholder: 'Enter tags (comma separated)',
        dueDate: 'Due Date',
        submit: 'Add Task',
        update: 'Update Task',
        cancel: 'Cancel',
      },
      status: {
        todo: 'To Do',
        inProgress: 'In Progress',
        completed: 'Completed',
      },
      priority: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        markAsCompleted: 'Mark as Completed',
        markAsIncomplete: 'Mark as Incomplete',
      },
      confirmations: {
        delete: 'Are you sure you want to delete this task?',
      },
      notifications: {
        created: 'Task created successfully',
        updated: 'Task updated successfully',
        deleted: 'Task deleted successfully',
        error: 'An error occurred',
      },
    },
    pomodoro: {
      workDuration: 'Work Duration',
      restDuration: 'Rest Duration', 
      totalCycles: 'Total Cycles',
      longRestDuration: 'Long Rest Duration',
      cyclesBeforeLongRest: 'Cycles Before Long Rest',
      minutes: 'minutes',
      settings: 'Settings',
      workDurationPlaceholder: 'Enter work duration',
      restDurationPlaceholder: 'Enter rest duration',
      totalCyclesPlaceholder: 'Enter total cycles',
      longRestDurationPlaceholder: 'Enter long rest duration',
      cyclesBeforeLongRestPlaceholder: 'Enter cycles before long rest',
      saveSettings: 'Save Settings',
      cancelSettings: 'Cancel',
      resetSettings: 'Reset Settings',
      defaultSettings: 'Default Settings',
      customSettings: 'Custom Settings',
      workDurationLabel: 'Work Duration',
      restDurationLabel: 'Rest Duration',
      totalCyclesLabel: 'Total Cycles',
      longRestDurationLabel: 'Long Rest Duration', 
      cyclesBeforeLongRestLabel: 'Cycles Before Long Rest',
      minutesLabel: 'minutes',
      ready: 'Ready to start?',
      title: 'Pomodoro Timer',
      workTime: 'Work Time',
      breakTime: 'Break Time',
      cycle: 'Cycle',
      selectTask: 'Select a task',
      selectTaskPlaceholder: 'Select a task',
      currentTask: 'Current Task',
      timeSpent: 'Time spent',
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      resume: 'Resume',
      stop: 'Stop',
      switchToBreak: 'Switch to Break',
      switchToWork: 'Switch to Work',
      showSettings: 'Show Settings',
      hideSettings: 'Hide Settings',
      settings: {
        title: 'Timer Settings',
        workDuration: 'Work Duration (min)',
        breakDuration: 'Break Duration (min)',
        totalCycles: 'Total Cycles',
        notifications: 'Notifications',
        sound: 'Sound',
        autoStart: 'Auto-start breaks',
      },
      notifications: {
        workComplete: 'Work session complete!',
        breakComplete: 'Break time is over!',
        taskComplete: 'Task completed!',
      },
      stats: {
        totalTime: 'Total Time',
        sessionsCompleted: 'Sessions Completed',
        averageSession: 'Average Session',
      },
    },
  },
  ru: {
    app: {
      title: 'Менеджер Задач с Помодоро',
      loading: 'Загрузка...',
      error: 'Что-то пошло не так',
    },
    theme: {
      light: 'Светлая тема',
      dark: 'Темная тема',
      system: 'Системная тема',
      switchToLight: 'Переключить на светлую тему',
      switchToDark: 'Переключить на темную тему',
      switchToSystem: 'Использовать системную тему',
    },
    common: {
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Изменить',
      create: 'Создать',
      search: 'Поиск',
      filter: 'Фильтр',
      all: 'Все',
      none: 'Нет',
      required: 'Обязательно',
      optional: 'Необязательно',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успешно',
    },
    tabs: {
      tasks: 'Задачи',
      pomodoro: 'Помодоро',
    },
    tasks: {
      title: 'Задачи',
      addTask: 'Добавить задачу',
      editTask: 'Изменить задачу',
      deleteTask: 'Удалить задачу',
      noTasks: 'Пока нет задач. Создайте свою первую задачу!',
      filters: {
        all: 'Все задачи',
        active: 'Активные',
        completed: 'Завершенные',
        search: 'Поиск задач...',
        priority: 'Приоритет',
        status: 'Статус',
        tags: 'Теги',
      },
      form: {
        title: 'Название',
        titlePlaceholder: 'Введите название задачи',
        description: 'Описание',
        descriptionPlaceholder: 'Введите описание задачи',
        estimatedPomodoros: 'Оценка помидоров',
        priority: {
          label: 'Приоритет',
          low: 'Низкий приоритет',
          medium: 'Средний приоритет',
          high: 'Высокий приоритет',
        },
        status: {
          label: 'Статус',
          todo: 'К выполнению',
          inProgress: 'В процессе',
          completed: 'Завершено',
        },
        tags: 'Теги',
        tagsPlaceholder: 'Введите теги (через запятую)',
        dueDate: 'Срок выполнения',
        submit: 'Добавить задачу',
        update: 'Обновить задачу',
        cancel: 'Отмена',
      },
      status: {
        todo: 'К выполнению',
        inProgress: 'В процессе',
        completed: 'Завершено',
      },
      priority: {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий',
      },
      actions: {
        edit: 'Изменить',
        delete: 'Удалить',
        save: 'Сохранить',
        cancel: 'Отмена',
        markAsCompleted: 'Отметить как завершенное',
        markAsIncomplete: 'Отметить как незавершенное',
      },
      confirmations: {
        delete: 'Вы уверены, что хотите удалить эту задачу?',
      },
      notifications: {
        created: 'Задача успешно создана',
        updated: 'Задача успешно обновлена',
        deleted: 'Задача успешно удалена',
        error: 'Произошла ошибка',
      },
    },
    pomodoro: {
      ready: 'Готовы к началу?',
      workDuration: 'Длительность работы',
      restDuration: 'Длительность отдыха',
      totalCycles: 'Всего циклов',
      longRestDuration: 'Длительность длинного перерыва',
      cyclesBeforeLongRest: 'Циклов до длинного перерыва',
      minutes: 'минут',
      settings: 'Настройки',
      workDurationPlaceholder: 'Введите длительность работы',
      restDurationPlaceholder: 'Введите длительность отдыха',
      totalCyclesPlaceholder: 'Введите количество циклов',
      longRestDurationPlaceholder: 'Введите длительность длинного перерыва',
      cyclesBeforeLongRestPlaceholder: 'Введите количество циклов до длинного перерыва',
      saveSettings: 'Сохранить настройки',
      cancelSettings: 'Отменить',
      resetSettings: 'Сбросить настройки',
      defaultSettings: 'Настройки по умолчанию',
      customSettings: 'Пользовательские настройки',
      workDurationLabel: 'Длительность работы',
      restDurationLabel: 'Длительность отдыха', 
      totalCyclesLabel: 'Всего циклов',
      longRestDurationLabel: 'Длительность длинного перерыва',
      cyclesBeforeLongRestLabel: 'Циклов до длинного перерыва',
      minutesLabel: 'минут',
      title: 'Таймер Помодоро',
      workTime: 'Время работы',
      breakTime: 'Время отдыха',
      cycle: 'Цикл',
      selectTask: 'Выберите задачу',
      currentTask: 'Текущая задача',
      timeSpent: 'Затраченное время',
      start: 'Старт',
      pause: 'Пауза',
      reset: 'Сброс',
      resume: 'Продолжить',
        selectTaskPlaceholder: 'Выберите задачу',
      stop: 'Стоп',
      switchToBreak: 'Перейти к отдыху',
      switchToWork: 'Перейти к работе',
      showSettings: 'Показать настройки',
      hideSettings: 'Скрыть настройки',
      settings: {
        title: 'Настройки таймера',
        workDuration: 'Время работы (мин)',
        breakDuration: 'Время отдыха (мин)',
        totalCycles: 'Всего циклов',
        notifications: 'Уведомления',
        sound: 'Звук',
        autoStart: 'Автоматический старт перерывов',
      },
      notifications: {
        workComplete: 'Рабочая сессия завершена!',
        breakComplete: 'Время отдыха закончилось!',
        taskComplete: 'Задача завершена!',
      },
      stats: {
        totalTime: 'Общее время',
        sessionsCompleted: 'Завершено сессий',
        averageSession: 'Средняя сессия',
      },
    },
  },
}; 
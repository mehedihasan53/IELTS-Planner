import { useEffect, useMemo, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import DailyRoutine from './components/DailyRoutine.jsx';
import Roadmap from './components/Roadmap.jsx';
import Settings from './components/Settings.jsx';
import Sidebar from './components/Sidebar.jsx';
import StudyHub from './components/StudyHub.jsx';
import Wizard from './components/Wizard.jsx';
import { defaultPlan } from './data/plannerData.js';
import {
  applyOverrides,
  buildPlan,
  clearProgress,
  differenceInDays,
  formatDate,
  getTasks,
  loadProgress,
  saveProgress,
} from './utils/planner.js';

export default function App() {
  const [state, setState] = useState(loadProgress);
  const [activeTab, setActiveTab] = useState('dash');
  const [selectedStudyModule, setSelectedStudyModule] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [taskFilter, setTaskFilter] = useState('All');
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    if (state) saveProgress(state);
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    if (state?.theme) root.dataset.theme = state.theme;
    else delete root.dataset.theme;
  }, [state?.theme]);

  const baseSchedule = useMemo(() => (state ? buildPlan(state.p) : null), [state?.p]);
  const schedule = useMemo(
    () => (baseSchedule && applyOverrides(baseSchedule, state.ov || {})),
    [baseSchedule, state?.ov],
  );
  const isDark = () => (
    state?.theme
      ? state.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const toggleTheme = () => setState((current) => ({ ...current, theme: isDark() ? 'light' : 'dark' }));

  if (!state) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <div className="flex-1 p-4 sm:p-8 flex flex-col items-center justify-center">
          <div className="text-center mb-6 max-w-md">
            <h1 className="text-3xl font-extrabold tracking-tight">IELTS Study Companion</h1>
            <p className="mute mt-1">Three quick steps to a timetable that fits your real day.</p>
          </div>
          <Wizard
            initial={defaultPlan}
            onComplete={(plan) => setState({
              p: plan,
              start: formatDate(new Date()),
              done: {},
              ov: {},
            })}
          />
        </div>
        <footer className="app-footer">
          © 2026 Designed &amp; Developed by Mehedi Hasan
        </footer>
      </div>
    );
  }

  const { p: plan, start, done } = state;
  const elapsedDays = Math.max(0, differenceInDays(start, formatDate(new Date())));
  const currentDay = Math.min(plan.days, elapsedDays + 1);
  const daysLeft = Math.max(0, plan.days - elapsedDays);
  const day = selectedDay || currentDay;
  const tasks = getTasks(plan, day, schedule).map((task) => ({
    ...task,
    completed: Boolean(done[`${day}-${task.id}`]),
  }));
  const completedOnDay = (dayNumber) => (
    ['r', 'l', 'w', 's', 'v', 'e'].filter((id) => done[`${dayNumber}-${id}`]).length
  );
  const completedTotal = Object.keys(done)
    .filter((key) => done[key] && Number(key.split('-')[0]) <= plan.days)
    .length;
  const overallProgress = (completedTotal / (plan.days * 6)) * 100;
  const dailyProgress = (completedOnDay(day) / 6) * 100;

  const toggleTask = (id) => setState((current) => ({
    ...current,
    done: { ...current.done, [`${day}-${id}`]: !current.done[`${day}-${id}`] },
  }));
  const setOverride = (key, startMinute, duration) => setState((current) => ({
    ...current,
    ov: {
      ...(current.ov || {}),
      [key]: {
        a: Math.max(0, Math.min(1430, startMinute)),
        dur: Math.max(10, Math.min(180, duration)),
      },
    },
  }));
  const clearOverride = (key) => setState((current) => {
    const overrides = { ...(current.ov || {}) };
    delete overrides[key];
    return { ...current, ov: overrides };
  });
  const reset = () => {
    if (window.confirm('Delete all progress and start over?')) {
      clearProgress();
      setState(null);
      setSelectedDay(null);
      setActiveTab('dash');
    }
  };
  const saveSettings = (updatedPlan) => {
    setState((current) => ({ ...current, p: updatedPlan, ov: {} }));
    setSelectedDay(null);
    setEditingKey(null);
    setActiveTab('dash');
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <div className="lg:flex flex-1">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          progress={overallProgress}
          dark={isDark()}
          onToggleTheme={toggleTheme}
        />
        <main className="flex-1 min-w-0 w-full p-3 sm:p-6 lg:p-8 max-w-4xl">
          {activeTab === 'dash' && (
            <Dashboard
              plan={{ ...plan, studyTotal: schedule.studyTotal }}
              day={day}
              currentDay={currentDay}
              daysLeft={daysLeft}
              completedPercent={dailyProgress}
              completedToday={completedOnDay(day)}
              tasks={tasks}
              filter={taskFilter}
              onFilterChange={setTaskFilter}
              onToggleTask={toggleTask}
              onSelectDay={setSelectedDay}
            />
          )}
          {activeTab === 'routine' && (
            <DailyRoutine
              schedule={schedule}
              editingKey={editingKey}
              onToggleEditor={setEditingKey}
              onSetOverride={setOverride}
              onClearOverride={clearOverride}
            />
          )}
          {activeTab === 'road' && (
            <Roadmap
              plan={plan}
              currentDay={currentDay}
              completedCount={completedOnDay}
              onOpenDay={(selected) => {
                setSelectedDay(selected);
                setActiveTab('dash');
              }}
            />
          )}
          {activeTab === 'set' && (
            <Settings
              plan={plan}
              onSave={saveSettings}
              onReset={reset}
            />
          )}
          {activeTab === 'hub' && (
            <StudyHub
              selectedModule={selectedStudyModule}
              onSelectModule={setSelectedStudyModule}
            />
          )}
        </main>
      </div>
      <footer className="app-footer">
        © 2026 Designed &amp; Developed by Mehedi Hasan
      </footer>
    </div>
  );
}

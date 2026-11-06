import Icon from './Icon.jsx';
import { ProgressBar } from './Primitives.jsx';

const navigation = [
  ['dash', 'Dashboard', 'dash'],
  ['routine', 'Daily Routine', 'clock'],
  ['road', 'Roadmap', 'map'],
  ['hub', 'Study Hub', 'Reading'],
  ['set', 'Settings', 'set'],
];

export default function Sidebar({ activeTab, onSelectTab, progress, dark, onToggleTheme }) {
  return (
    <aside
      className="lg:w-60 lg:shrink-0 lg:h-screen lg:sticky lg:top-0 p-3 sm:p-4 lg:p-5 border-b lg:border-b-0 lg:border-r line"
      style={{ background: 'var(--card)' }}
    >
      <div className="flex items-center justify-between lg:mb-6">
        <div className="flex items-center gap-2 font-bold min-w-0">
          <span className="logo"><Icon name="target" size={16} color="#fff" /></span>
          IELTS Planner
        </div>
        <button className="btn2 lg:hidden" aria-label="Toggle theme" onClick={onToggleTheme}>
          <Icon name={dark ? 'sun' : 'moon'} size={16} />
        </button>
      </div>
      <nav className="grid grid-cols-2 gap-1 mt-3 lg:flex lg:flex-col lg:mt-0" aria-label="Sections">
        {navigation.map(([key, title, icon]) => (
          <button
            key={key}
            className="nav min-w-0"
            data-on={activeTab === key}
            aria-current={activeTab === key ? 'page' : undefined}
            onClick={() => onSelectTab(key)}
          >
            <Icon name={icon} size={16} />
            {title}
          </button>
        ))}
      </nav>
      <div className="lg:hidden mt-3 p-3 rounded-xl" style={{ background: 'var(--soft)' }}>
        <div className="flex justify-between text-xs font-medium mb-2">
          <span>Overall progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} height={6} />
      </div>
      <div className="hidden lg:block mt-6 p-3 rounded-xl" style={{ background: 'var(--soft)' }}>
        <div className="flex justify-between text-xs font-medium mb-2">
          <span>Overall</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} height={6} />
      </div>
      <button
        className="btn2 hidden lg:flex items-center gap-2 mt-3 w-full justify-center"
        onClick={onToggleTheme}
      >
        <Icon name={dark ? 'sun' : 'moon'} size={15} />
        {dark ? 'Light mode' : 'Dark mode'}
      </button>
    </aside>
  );
}

import Icon from './Icon.jsx';
import { ProgressBar } from './Primitives.jsx';

const navigation = [
  ['dash', 'Dashboard', 'dash'],
  ['routine', 'Daily Routine', 'clock'],
  ['road', 'Roadmap', 'map'],
  ['set', 'Settings', 'set'],
];

export default function Sidebar({ activeTab, onSelectTab, progress, dark, onToggleTheme }) {
  return (
    <aside
      className="md:w-60 md:shrink-0 md:h-screen md:sticky md:top-0 p-3 md:p-5 border-b md:border-b-0 md:border-r line"
      style={{ background: 'var(--card)' }}
    >
      <div className="flex items-center justify-between md:mb-6">
        <div className="flex items-center gap-2 font-bold">
          <span className="logo"><Icon name="target" size={16} color="#fff" /></span>
          IELTS Planner
        </div>
        <button className="btn2 md:hidden" aria-label="Toggle theme" onClick={onToggleTheme}>
          <Icon name={dark ? 'sun' : 'moon'} size={16} />
        </button>
      </div>
      <nav className="flex md:flex-col gap-1 mt-3 md:mt-0 overflow-x-auto" aria-label="Sections">
        {navigation.map(([key, title, icon]) => (
          <button
            key={key}
            className="nav whitespace-nowrap"
            data-on={activeTab === key}
            aria-current={activeTab === key ? 'page' : undefined}
            onClick={() => onSelectTab(key)}
          >
            <Icon name={icon} size={16} />
            {title}
          </button>
        ))}
      </nav>
      <div className="hidden md:block mt-6 p-3 rounded-xl" style={{ background: 'var(--soft)' }}>
        <div className="flex justify-between text-xs font-medium mb-2">
          <span>Overall</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} height={6} />
      </div>
      <button
        className="btn2 hidden md:flex items-center gap-2 mt-3 w-full justify-center"
        onClick={onToggleTheme}
      >
        <Icon name={dark ? 'sun' : 'moon'} size={15} />
        {dark ? 'Light mode' : 'Dark mode'}
      </button>
    </aside>
  );
}

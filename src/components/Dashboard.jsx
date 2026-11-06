import { colors } from '../data/plannerData.js';
import { getPhase, getRoadmapIndex } from '../data/plannerData.js';
import Icon from './Icon.jsx';
import { Ring } from './Primitives.jsx';

export default function Dashboard({
  plan,
  day,
  currentDay,
  daysLeft,
  completedPercent,
  completedToday,
  tasks,
  filter,
  onFilterChange,
  onToggleTask,
  onSelectDay,
}) {
  const isComplete = (task) => task.completed;
  const visibleTasks = tasks.filter((task) => (
    filter === 'All' || (filter === 'Completed') === isComplete(task)
  ));
  const filters = ['All', 'Pending', 'Completed'];

  return (
    <div className="space-y-4 fade">
      <section className="hero p-4 sm:p-7 flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm opacity-80">Hi {plan.name}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Day {day} of {plan.days}{day === currentDay ? '' : ' (not today)'}
          </h1>
          <p className="text-sm opacity-90 mt-1">
            {getPhase(getRoadmapIndex(plan, day))} phase · {completedToday} of 6 tasks done
          </p>
        </div>
        <Ring value={completedPercent} size={110} color="#fff" track="rgba(255,255,255,.25)" textColor="#fff" />
      </section>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          ['Target band', plan.target.toFixed(1), 'target'],
          ['Days left', daysLeft, 'clock'],
          ['Study / day', `${(plan.studyTotal / 60).toFixed(1)}h`, 'flame'],
        ].map(([title, value, icon]) => (
          <div key={title} className="card p-4">
            <div className="flex items-center gap-1.5 mute text-xs font-medium">
              <Icon name={icon} size={14} />
              {title}
            </div>
            <div className="text-2xl sm:text-3xl font-bold mt-1">{value}</div>
          </div>
        ))}
      </div>
      <section className="card p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              className="btn2"
              aria-label="Previous day"
              disabled={day <= 1}
              onClick={() => onSelectDay(day - 1)}
            >
              <Icon name="l" size={16} />
            </button>
            <button
              className="btn2"
              aria-label="Next day"
              disabled={day >= plan.days}
              onClick={() => onSelectDay(day + 1)}
            >
              <Icon name="r" size={16} />
            </button>
            {day !== currentDay && (
              <button className="btn2 text-sm" onClick={() => onSelectDay(null)}>Today</button>
            )}
          </div>
          <div className="seg w-full sm:w-auto" role="group" aria-label="Filter tasks">
            {filters.map((option) => (
              <button
                key={option}
                className={`${filter === option ? 'on' : ''} flex-1 sm:flex-initial`}
                aria-pressed={filter === option}
                onClick={() => onFilterChange(option)}
              >
                {option}{' '}
                <span className="mute">
                  {option === 'All' ? 6 : option === 'Completed' ? completedToday : 6 - completedToday}
                </span>
              </button>
            ))}
          </div>
        </div>
        <ul className="space-y-2">
          {visibleTasks.length === 0 && (
            <li className="text-center py-8 mute text-sm">
              {filter === 'Completed'
                ? 'Nothing completed yet. Tick a task to see it here.'
                : 'All tasks done for this day. Nice work.'}
            </li>
          )}
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <button
                onClick={() => onToggleTask(task.id)}
                aria-pressed={task.completed}
                className="task w-full text-left flex gap-3 items-start p-3.5"
                data-on={task.completed}
              >
                <span
                  className="chk"
                  style={{
                    borderColor: colors[task.k],
                    background: task.completed ? colors[task.k] : 'transparent',
                  }}
                >
                  {task.completed && <Icon name="check" size={14} color="#fff" />}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: colors[task.k] }}>
                    <Icon name={task.k} size={15} />
                    {task.k}
                    {task.min > 0 && <span className="mute font-normal">{task.min} min</span>}
                  </span>
                  <span className={`block font-medium mt-0.5 ${task.completed ? 'line-through opacity-50' : ''}`}>
                    {task.t}
                  </span>
                  <span className="block text-sm mute">{task.x}</span>
                  {task.when && <span className="block text-xs mute mt-1">{task.when}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

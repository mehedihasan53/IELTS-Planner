import { colors, getPhase, getRoadmapIndex, roadmap } from '../data/plannerData.js';

export default function Roadmap({ plan, currentDay, completedCount, onOpenDay }) {
  return (
    <section className="card p-4 sm:p-6 fade">
      <h1 className="text-xl font-bold">{plan.days}-day roadmap</h1>
      <p className="mute text-sm mb-4">
        Foundation, skill building, intensive practice, then exam prep. Select a day to open its checklist.
      </p>
      <div className="scroll">
        <div className="space-y-2" style={{ minWidth: 560 }}>
          {Array.from({ length: plan.days }, (_, index) => {
            const day = index + 1;
            const activities = roadmap[getRoadmapIndex(plan, day)];
            const completed = completedCount(day);
            return (
              <button
                key={day}
                onClick={() => onOpenDay(day)}
                className="task w-full text-left grid gap-3 items-center p-3"
                data-on={completed === 6}
                style={{
                  gridTemplateColumns: '5rem 1fr 3rem',
                  borderColor: day === currentDay ? 'var(--acc)' : undefined,
                }}
              >
                <span>
                  <b>Day {day}</b>
                  <span className="block text-xs mute">{getPhase(getRoadmapIndex(plan, day))}</span>
                </span>
                <span className="grid grid-cols-2 gap-x-3 text-sm">
                  {['Reading', 'Listening', 'Writing', 'Speaking'].map((name, activityIndex) => (
                    <span key={name} className="truncate">
                      <b style={{ color: colors[name] }}>{name[0]}</b> {activities[activityIndex]}
                    </span>
                  ))}
                </span>
                <span className="font-semibold text-right text-sm">{completed}/6</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

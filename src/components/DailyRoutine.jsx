import { colors, studyTypes } from '../data/plannerData.js';
import { formatInputTime, formatTime, toMinutes } from '../utils/planner.js';
import Icon from './Icon.jsx';
import { Field } from './Primitives.jsx';

export default function DailyRoutine({ schedule, editingKey, onToggleEditor, onSetOverride, onClearOverride }) {
  return (
    <section className="card p-4 sm:p-6 fade">
      <h1 className="text-xl font-bold">Daily routine</h1>
      <p className="mute text-sm mb-4">
        {(schedule.studyTotal / 60).toFixed(1)} hours of study. Select the pencil on any study slot to change its
        start time or length.
      </p>
      {schedule.unplaced > 0 && (
        <p className="mb-3 p-3 rounded-lg text-sm font-medium" style={{ background: 'var(--warn)' }}>
          {Math.round(schedule.unplaced)} minutes of study didn’t fit around your fixed activities.
        </p>
      )}
      {schedule.blocks.some((block) => block.clash) && (
        <p className="mb-3 p-3 rounded-lg text-sm font-medium" style={{ background: 'var(--warn)' }}>
          Some slots overlap. Move the highlighted ones to a free time.
        </p>
      )}
      <ul className="space-y-1.5">
        {schedule.blocks.map((block) => {
          const isStudy = studyTypes.includes(block.type);
          return (
            <li key={block.key || block.a + block.name}>
              <div className="flex gap-3 items-stretch">
                <div className="w-24 shrink-0 text-sm font-medium pt-2.5">
                  {formatTime(block.a)}
                  <span className="mute block font-normal text-xs">{block.b - block.a} min</span>
                </div>
                <div
                  className="flex-1 rounded-lg px-3 py-2.5 flex items-center gap-2 text-sm font-medium"
                  style={{
                    borderLeft: `4px solid ${colors[block.type]}`,
                    background: block.type === 'free' ? 'transparent' : 'var(--soft)',
                    outline: block.clash ? '2px solid var(--bad)' : 'none',
                    opacity: block.type === 'free' ? 0.6 : 1,
                  }}
                >
                  {isStudy && <Icon name={block.type} size={15} color={colors[block.type]} />}
                  {block.name}
                  {block.edited && <span className="mute text-xs">edited</span>}
                  {isStudy && (
                    <button
                      className="btn2 ml-auto"
                      style={{ padding: '.25rem .5rem' }}
                      aria-label={`Edit ${block.name} slot`}
                      onClick={() => onToggleEditor(editingKey === block.key ? null : block.key)}
                    >
                      <Icon name="Writing" size={14} />
                    </button>
                  )}
                </div>
              </div>
              {isStudy && editingKey === block.key && (
                <div className="ml-24 pl-3 mt-1.5 flex flex-wrap items-end gap-3 fade">
                  <Field title="Start">
                    <input
                      className="inp"
                      type="time"
                      value={formatInputTime(block.a)}
                      onChange={(event) => (
                        event.target.value && onSetOverride(block.key, toMinutes(event.target.value), block.b - block.a)
                      )}
                    />
                  </Field>
                  <Field title="Minutes">
                    <input
                      className="inp"
                      style={{ width: 90 }}
                      type="number"
                      min="10"
                      max="180"
                      step="5"
                      value={block.b - block.a}
                      onChange={(event) => onSetOverride(block.key, block.a, Number(event.target.value) || 10)}
                    />
                  </Field>
                  {block.edited && (
                    <button className="btn2 flex items-center gap-1.5" onClick={() => onClearOverride(block.key)}>
                      <Icon name="rot" size={14} />
                      Reset
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

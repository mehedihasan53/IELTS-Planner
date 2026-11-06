import { useMemo, useState } from 'react';
import { colors, presets, studyTypes } from '../data/plannerData.js';
import { buildPlan } from '../utils/planner.js';
import Icon from './Icon.jsx';
import { Field, ProgressBar, SegmentedControl } from './Primitives.jsx';

function SetupSteps({ currentStep }) {
  const labels = ['Goals', 'Routine', 'Plan'];

  return (
    <ol className="flex items-center gap-2 mb-5" aria-label="Setup steps">
      {labels.map((label, index) => (
        <li key={label} className="flex items-center gap-2 flex-1">
          <span className="step" data-on={currentStep >= index + 1}>
            {currentStep > index + 1 ? <Icon name="check" size={14} /> : index + 1}
          </span>
          <span className={`text-sm font-medium ${currentStep === index + 1 ? '' : 'mute'}`}>{label}</span>
          {index < 2 && (
            <span
              className="flex-1 h-px"
              style={{ background: currentStep > index + 1 ? 'var(--acc)' : 'var(--line)' }}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function GoalsStep({ form, update }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">What are you aiming for?</h2>
        <p className="mute text-sm">This sets how your study time is split.</p>
      </div>
      <Field title="Your name">
        <input
          className="inp"
          autoFocus
          value={form.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="Enter Your Name"
          autoComplete="given-name"
        />
      </Field>
      <Field title="Current level">
        <SegmentedControl
          options={['Beginner', 'Intermediate', 'Advanced']}
          value={form.level}
          onChange={(value) => update('level', value)}
        />
      </Field>
      <Field title="Target band">
        <SegmentedControl
          options={[6, 6.5, 7, 7.5, 8]}
          value={form.target}
          onChange={(value) => update('target', value)}
          format={(value) => value.toFixed(1)}
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field title="Days remaining">
          <input
            className="inp"
            type="number"
            min="1"
            max="365"
            value={form.days}
            onChange={(event) => update('days', event.target.value)}
          />
        </Field>
        <Field title="Study hours per day">
          <input
            className="inp"
            type="number"
            min="1"
            max="12"
            step="0.5"
            value={form.hours}
            onChange={(event) => update('hours', event.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}

function RoutineStep({ form, update, updateActivity, addPreset }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Your fixed routine</h2>
        <p className="mute text-sm">
          Gym, work and prayer times are removed from your study day. Gym adds 45 minutes of recovery.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.keys(presets).map((name) => (
          <button
            type="button"
            key={name}
            className="btn2 flex items-center gap-1.5"
            onClick={() => addPreset(name)}
          >
            <Icon name="plus" size={14} />
            {name}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {form.fixed.length === 0 && (
          <p className="text-sm mute">Nothing fixed yet. Add an activity above, or continue with a free day.</p>
        )}
        {form.fixed.map((activity, index) => (
          <div key={index} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_8rem_6rem_auto] gap-2 items-center">
            <input
              className="inp"
              aria-label="Activity name"
              value={activity.name}
              onChange={(event) => updateActivity(index, 'name', event.target.value)}
            />
            <input
              className="inp"
              aria-label="Start time"
              type="time"
              value={activity.start}
              onChange={(event) => updateActivity(index, 'start', event.target.value)}
            />
            <input
              className="inp"
              aria-label="Duration in minutes"
              type="number"
              min="5"
              step="5"
              value={activity.dur}
              onChange={(event) => updateActivity(index, 'dur', event.target.value)}
            />
            <button
              type="button"
              className="btn2"
              aria-label="Remove activity"
              onClick={() => update('fixed', form.fixed.filter((_, activityIndex) => activityIndex !== index))}
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs mute">Duration is in minutes.</p>
    </div>
  );
}

function PlanStep({ schedule, activityCount }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Your generated plan</h2>
        <p className="mute text-sm">
          {(schedule.studyTotal / 60).toFixed(1)} study hours a day, built around {activityCount} fixed{' '}
          {activityCount === 1 ? 'activity' : 'activities'}.
        </p>
      </div>
      {schedule.unplaced > 0 && (
        <p className="p-3 rounded-lg text-sm font-medium" style={{ background: 'var(--warn)' }}>
          {Math.round(schedule.unplaced)} minutes of study didn’t fit. Shorten an activity or reduce study hours.
        </p>
      )}
      <div className="space-y-2.5">
        {studyTypes.map((name) => (
          <div key={name} className="flex items-center gap-3 text-sm">
            <span className="w-24 flex items-center gap-2 font-medium">
              <Icon name={name} size={15} color={colors[name]} />
              {name}
            </span>
            <div className="flex-1">
              <ProgressBar value={(schedule.mins[name] || 0) / Math.max(1, schedule.studyTotal) * 100 * 3} height={6} />
            </div>
            <span className="w-14 text-right mute">{schedule.mins[name] || 0} min</span>
          </div>
        ))}
      </div>
      <p className="text-sm mute">You can fine-tune every study slot later in Daily Routine.</p>
    </div>
  );
}

export default function Wizard({ initial, onComplete, edit = false }) {
  const [form, setForm] = useState(initial);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const updateActivity = (index, key, value) => update(
    'fixed',
    form.fixed.map((activity, activityIndex) => (
      activityIndex === index ? { ...activity, [key]: value } : activity
    )),
  );
  const addPreset = (name) => update('fixed', [
    ...form.fixed,
    ...presets[name].map((activity) => ({ ...activity })),
  ]);
  const normalizedForm = () => ({
    ...form,
    name: form.name.trim(),
    days: Number(form.days),
    hours: Number(form.hours),
  });
  const continueStep = () => {
    if (step === 1) {
      if (!form.name.trim()) return setError('Enter your name to continue.');
      if (!(form.days >= 1 && form.days <= 365)) return setError('Days remaining must be between 1 and 365.');
      if (!(form.hours >= 1 && form.hours <= 12)) return setError('Study hours must be between 1 and 12.');
    }
    if (step === 2 && form.fixed.some((activity) => !activity.start || !(Number(activity.dur) > 0))) {
      return setError('Give every activity a start time and a duration in minutes.');
    }
    setError('');
    setStep(step + 1);
  };
  const schedule = useMemo(() => (step === 3 ? buildPlan(normalizedForm()) : null), [step]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <SetupSteps currentStep={step} />
      <div className="card p-5 sm:p-7 fade" key={step}>
        {step === 1 && <GoalsStep form={form} update={update} />}
        {step === 2 && (
          <RoutineStep
            form={form}
            update={update}
            updateActivity={updateActivity}
            addPreset={addPreset}
          />
        )}
        {step === 3 && <PlanStep schedule={schedule} activityCount={form.fixed.length} />}
        {error && <p role="alert" className="mt-4 text-sm font-medium" style={{ color: 'var(--bad)' }}>{error}</p>}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button
              type="button"
              className="btn2 flex items-center gap-1.5"
              onClick={() => {
                setError('');
                setStep(step - 1);
              }}
            >
              <Icon name="back" size={15} />
              Back
            </button>
          ) : <span />}
          {step < 3 ? (
            <button type="button" className="btn flex items-center gap-1.5" onClick={continueStep}>
              Continue
              <Icon name="arr" size={15} />
            </button>
          ) : (
            <button type="button" className="btn flex items-center gap-1.5" onClick={() => onComplete(normalizedForm())}>
              {edit ? 'Save changes' : 'Start studying'}
              <Icon name="arr" size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

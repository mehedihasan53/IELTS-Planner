import { essentialActivities, getRoadmapIndex, skillNames, studyTypes, roadmap } from '../data/plannerData.js';

const storageKey = 'ielts-companion-v1';

export const loadProgress = () => {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
};

export const saveProgress = (state) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Keep the app usable if browser storage is unavailable.
  }
};

export const clearProgress = () => {
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // Keep the reset flow usable if browser storage is unavailable.
  }
};

export const toMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
};

export const formatTime = (minutes) => {
  const rounded = Math.round(minutes);
  const hours = Math.floor(rounded / 60) % 24;
  const minute = rounded % 60;
  return `${(hours % 12) || 12}:${String(minute).padStart(2, '0')}${hours >= 12 ? ' PM' : ' AM'}`;
};

export const formatInputTime = (minutes) => (
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
);

export const formatDate = (date) => (
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
);

export const differenceInDays = (from, to) => (
  Math.round((new Date(`${to}T00:00`) - new Date(`${from}T00:00`)) / 864e5)
);

export function buildPlan(plan) {
  const fixedBlocks = [];
  plan.fixed.forEach((activity) => {
    const start = toMinutes(activity.start);
    const duration = Number(activity.dur) || 0;
    fixedBlocks.push({
      a: start,
      b: start + duration,
      name: activity.name,
      type: activity.kind || 'fixed',
    });
    if (/gym|workout/i.test(activity.name) && duration >= 45) {
      fixedBlocks.push({
        a: start + duration,
        b: start + duration + 45,
        name: 'Return, bath & recovery',
        type: 'rest',
      });
    }
  });

  essentialActivities.forEach((activity) => {
    const start = toMinutes(activity.start);
    const end = start + activity.dur;
    if (!fixedBlocks.some((block) => block.a < end && block.b > start)) {
      fixedBlocks.push({ a: start, b: end, name: activity.name, type: 'meal' });
    }
  });
  fixedBlocks.sort((first, second) => first.a - second.a);

  let freeSlots = [];
  let cursor = 360;
  fixedBlocks.forEach((block) => {
    if (block.a > cursor) freeSlots.push([cursor, Math.min(block.a, 1320)]);
    cursor = Math.max(cursor, block.b);
  });
  if (cursor < 1320) freeSlots.push([cursor, 1320]);
  freeSlots = freeSlots.filter(([start, end]) => end - start >= 15);

  const availableMinutes = freeSlots.reduce((total, [start, end]) => total + end - start, 0);
  const budget = Math.min(plan.hours * 60, availableMinutes);
  const highTarget = plan.target >= 7;
  const lowTarget = plan.target <= 6;
  let weights = highTarget
    ? [0.28, 0.2, 0.3, 0.1, 0.06, 0.06]
    : lowTarget
      ? [0.22, 0.22, 0.2, 0.12, 0.14, 0.1]
      : [0.25, 0.2, 0.25, 0.12, 0.1, 0.08];
  if (plan.level === 'Beginner') {
    weights = [weights[0] - 0.03, weights[1], weights[2] - 0.03, weights[3], weights[4] + 0.06, weights[5]];
  }

  const names = [...skillNames, 'Review'];
  const preferredStarts = [390, 480, 870, 1230, 1260, 1290];
  const sessions = names.map((name, index) => ({
    name,
    preferredStart: preferredStarts[index],
    minutes: Math.max(15, Math.round((budget * weights[index]) / 5) * 5),
  }));
  const studyBlocks = [];
  let unplaced = 0;

  sessions.forEach((session) => {
    let remaining = session.minutes;
    while (remaining >= 15) {
      let best = null;
      freeSlots.forEach((slot, index) => {
        const length = slot[1] - slot[0];
        if (length < 15) return;
        const duration = Math.min(remaining, length, session.name === 'Writing' ? 90 : 75);
        const start = Math.max(slot[0], Math.min(session.preferredStart, slot[1] - duration));
        const cost = Math.abs(start - session.preferredStart)
          + (duration < Math.min(remaining, 75) ? 40 : 0);
        if (!best || cost < best.cost) best = { index, duration, start, cost };
      });

      if (!best) {
        unplaced += remaining;
        break;
      }

      const slot = freeSlots[best.index];
      freeSlots.splice(best.index, 1, [slot[0], best.start], [best.start + best.duration, slot[1]]);
      freeSlots = freeSlots.filter(([start, end]) => end - start >= 15);
      studyBlocks.push({
        a: best.start,
        b: best.start + best.duration,
        name: session.name,
        type: session.name,
      });
      remaining -= best.duration;
    }
  });

  const minutesByType = {};
  studyBlocks.forEach((block) => {
    minutesByType[block.type] = (minutesByType[block.type] || 0) + block.b - block.a;
  });
  const gaps = freeSlots.map(([a, b]) => ({ a, b, name: 'Free time', type: 'free' }));
  const blocks = [...fixedBlocks, ...studyBlocks, ...gaps].sort((first, second) => first.a - second.a);

  return {
    blocks,
    mins: minutesByType,
    unplaced,
    studyTotal: Object.values(minutesByType).reduce((total, value) => total + value, 0),
    avail: availableMinutes,
  };
}

export function applyOverrides(schedule, overrides) {
  const occurrences = {};
  let blocks = schedule.blocks.map((block) => {
    if (!studyTypes.includes(block.type)) return { ...block };
    const occurrence = (occurrences[block.type] = (occurrences[block.type] || 0) + 1);
    const key = `${block.type}#${occurrence}`;
    const override = overrides[key];
    return override
      ? { ...block, key, a: override.a, b: override.a + override.dur, edited: true }
      : { ...block, key };
  });

  const isReal = (block) => block.type !== 'free';
  const overlaps = (first, second) => (
    first !== second && isReal(second) && second.a < first.b && second.b > first.a
  );
  blocks = blocks
    .filter((block) => isReal(block) || !blocks.some((other) => overlaps(block, other)))
    .sort((first, second) => first.a - second.a);
  blocks.forEach((block) => {
    block.clash = isReal(block) && blocks.some((other) => overlaps(block, other));
  });

  const mins = {};
  blocks.forEach((block) => {
    if (studyTypes.includes(block.type)) mins[block.type] = (mins[block.type] || 0) + block.b - block.a;
  });
  return {
    ...schedule,
    blocks,
    mins,
    studyTotal: Object.values(mins).reduce((total, value) => total + value, 0),
  };
}

export function getTasks(plan, day, schedule) {
  const [reading, listening, writing, speaking] = roadmap[getRoadmapIndex(plan, day)];
  const highTarget = plan.target >= 7;
  const lowTarget = plan.target <= 6 || plan.level === 'Beginner';
  const vocabularyCount = lowTarget ? 8 : highTarget ? 15 : 10;
  const times = (type) => schedule.blocks
    .filter((block) => block.type === type)
    .map((block) => `${formatTime(block.a)}–${formatTime(block.b)}`)
    .join(', ');

  return [
    {
      id: 'r',
      k: 'Reading',
      t: reading,
      x: highTarget
        ? 'Strict timing: 20 min per passage.'
        : lowTarget
          ? 'Go untimed first, then review every answer.'
          : 'Time yourself, then review errors.',
    },
    {
      id: 'l',
      k: 'Listening',
      t: listening,
      x: highTarget ? 'Single listen only, as in the real exam.' : 'Check spelling and plurals in answers.',
    },
    {
      id: 'w',
      k: 'Writing',
      t: writing,
      x: highTarget
        ? 'Aim for band 7 cohesion and precise vocabulary.'
        : lowTarget
          ? 'Watch a model answer first, then write by hand.'
          : 'Write by hand, then self-correct.',
    },
    { id: 's', k: 'Speaking', t: speaking, x: 'Record yourself and replay it.' },
    { id: 'v', k: 'Vocabulary', t: `Learn ${vocabularyCount} new words`, x: 'Use each in your own sentence.' },
    { id: 'e', k: 'Review', t: 'Update error notebook', x: 'Revise yesterday’s mistakes before you finish.' },
  ].map((task) => ({
    ...task,
    min: schedule.mins[task.k] || 0,
    when: times(task.k),
  }));
}

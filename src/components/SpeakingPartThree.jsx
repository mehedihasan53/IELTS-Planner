import { useMemo, useState } from 'react';
import { speakingPartThreeCategories } from '../data/speakingPartThreeContent.js';
import Icon from './Icon.jsx';

const framework = [
  { letter: 'A', title: 'Assertion', detail: 'State your position clearly before developing it.' },
  { letter: 'R', title: 'Reason', detail: 'Explain the principle or cause behind your view.' },
  { letter: 'E', title: 'Example', detail: 'Make the idea concrete with a relevant example.' },
  { letter: 'C', title: 'Consequence', detail: 'Show the wider result, implication or limitation.' },
];

function Badge({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ background: 'var(--soft)', color: 'var(--acc)' }}
    >
      {children}
    </span>
  );
}

export default function SpeakingPartThree({ onBack }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const visibleCategories = useMemo(() => (
    activeCategory === 'all'
      ? speakingPartThreeCategories
      : speakingPartThreeCategories.filter((category) => category.id === activeCategory)
  ), [activeCategory]);
  const questionCount = visibleCategories.reduce((total, category) => total + category.questions.length, 0);

  return (
    <section className="space-y-4 fade">
      <button type="button" className="btn2 inline-flex items-center gap-2" onClick={onBack}>
        <Icon name="back" size={15} />
        Speaking sections
      </button>

      <header className="card p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="logo shrink-0">
            <Icon name="Speaking" size={17} color="#fff" />
          </span>
          <div className="min-w-0">
            <Badge>IELTS SPEAKING · PART 3</Badge>
            <h1 className="mt-2 text-xl sm:text-2xl font-extrabold leading-snug">
              Follow-up Questions
            </h1>
            <p className="mt-1 text-sm mute leading-relaxed">
              Two-way discussion: develop a position, support it, and explore its wider implications.
            </p>
          </div>
        </div>
      </header>

      <article className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Build a developed answer with AREC</h2>
          <Badge>Assertion · Reason · Example · Consequence</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {framework.map((item) => (
            <div key={item.letter} className="rounded-xl border line p-3.5">
              <div className="flex items-center gap-2">
                <span className="step shrink-0" data-on="true">{item.letter}</span>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="text-sm mute mt-2 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="card p-4 sm:p-5">
        <h2 className="text-lg font-bold">Part 3 master tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="rounded-xl p-3.5" style={{ background: 'var(--soft)' }}>
            <h3 className="font-semibold">Evaluate, don’t just list</h3>
            <p className="text-sm mute mt-1.5 leading-relaxed">
              Compare advantages and drawbacks, then make your overall judgement clear. Qualify broad claims with “in many cases” or “depending on…”.
            </p>
          </div>
          <div className="rounded-xl p-3.5" style={{ background: 'var(--soft)' }}>
            <h3 className="font-semibold">Speculate carefully</h3>
            <p className="text-sm mute mt-1.5 leading-relaxed">
              For future or hypothetical questions, signal possibility with “might”, “is likely to” or “if this continues”, and explain what your prediction depends on.
            </p>
          </div>
          <div className="rounded-xl p-3.5" style={{ background: 'var(--soft)' }}>
            <h3 className="font-semibold">Justify and extend</h3>
            <p className="text-sm mute mt-1.5 leading-relaxed">
              Support opinions with a reason and a relevant example. Discuss people, communities or long-term effects when the question invites a broader view.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed">
          <strong>Keep it natural:</strong> Part 3 answers should be developed, not memorised speeches. Adapt the examples and stance to the exact question, and acknowledge a reasonable exception where relevant.
        </p>
      </article>

      <div className="card p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold">Filter by cue-card theme</h2>
          <Badge>{questionCount} discussion questions</Badge>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter Part 3 questions by theme">
          <button
            type="button"
            className="btn2 shrink-0 text-sm"
            aria-pressed={activeCategory === 'all'}
            style={activeCategory === 'all' ? { background: 'var(--soft)', color: 'var(--ink)', borderColor: 'var(--acc)' } : undefined}
            onClick={() => setActiveCategory('all')}
          >
            All themes
          </button>
          {speakingPartThreeCategories.map((category) => (
            <button
              type="button"
              key={category.id}
              className="btn2 shrink-0 text-sm"
              aria-pressed={activeCategory === category.id}
              style={activeCategory === category.id ? { background: 'var(--soft)', color: 'var(--ink)', borderColor: 'var(--acc)' } : undefined}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {visibleCategories.map((category) => (
          <section key={category.id} className="space-y-2">
            <div className="flex items-center justify-between gap-2 px-1">
              <h2 className="text-lg sm:text-xl font-bold">{category.title}</h2>
              <Badge>{category.questions.length} questions</Badge>
            </div>
            <div className="space-y-2">
              {category.questions.map((item, index) => (
                <details key={item.question} className="card overflow-hidden group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                    <span className="step shrink-0" data-on="true">{index + 1}</span>
                    <span className="min-w-0 flex-1 font-semibold text-sm sm:text-base">{item.question}</span>
                    <span className="mute text-xl transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
                  </summary>
                  <div className="border-t line p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h3 className="font-semibold">Band 9-style model answer</h3>
                      <Badge>AREC breakdown</Badge>
                    </div>
                    <div className="space-y-3">
                      {framework.map((step) => (
                        <div key={step.letter} className="flex items-start gap-3">
                          <span className="step shrink-0" data-on="true">{step.letter}</span>
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold">{step.title}</h4>
                            <p className="mt-0.5 text-sm sm:text-base leading-7">{item.arec[step.title.toLowerCase()]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t line mt-4 pt-3">
                      <h4 className="text-sm font-semibold">Useful lexical resources</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.vocabulary.map((phrase) => (
                          <span key={phrase} className="rounded-full px-3 py-1.5 text-xs sm:text-sm" style={{ background: 'var(--soft)' }}>
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="border-t line mt-4 pt-3 text-xs mute">
                      Adapt the argument and example to your own perspective; clear reasoning is more valuable than memorised advanced phrases.
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

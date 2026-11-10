import { useMemo, useState } from 'react';
import { speakingPartOneCategories } from '../data/speakingPartOneContent.js';
import Icon from './Icon.jsx';

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

export default function SpeakingPartOne({ onBack }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();

  const visibleCategories = useMemo(() => speakingPartOneCategories
    .filter((category) => activeCategory === 'all' || category.id === activeCategory)
    .map((category) => ({
      ...category,
      questions: category.questions.filter((item) => (
        !query
        || category.title.toLowerCase().includes(query)
        || item.question.toLowerCase().includes(query)
        || item.answer.toLowerCase().includes(query)
      )),
    }))
    .filter((category) => category.questions.length > 0), [activeCategory, query]);

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
            <Badge>IELTS SPEAKING · PART 1</Badge>
            <h1 className="mt-2 text-xl sm:text-2xl font-extrabold leading-snug">
              General Questions
            </h1>
            <p className="mt-1 text-sm mute leading-relaxed">
              Practise familiar topics with concise, natural answers that give a reason and one useful detail.
            </p>
          </div>
        </div>
      </header>

      <article className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">A simple Part 1 answer framework</h2>
          <Badge>Direct Answer + Extension + Detail</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {[
            { title: '1. Answer directly', text: 'Start with a clear response to the exact question. Avoid a long introduction.' },
            { title: '2. Extend with a reason', text: 'Add why you feel that way, how often you do it, or what makes it important to you.' },
            { title: '3. Give one detail', text: 'Include a brief example, contrast or personal detail to make the answer sound genuine.' },
          ].map((tip) => (
            <div key={tip.title} className="rounded-xl border line p-3.5">
              <h3 className="font-semibold">{tip.title}</h3>
              <p className="text-sm mute mt-1.5 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl p-3.5 text-sm leading-relaxed" style={{ background: 'var(--soft)' }}>
          <strong>Band 9 practice reminder:</strong> The samples are high-level models, not guaranteed scores. Adapt details to your own life, answer naturally, and avoid memorising scripts.
        </p>
      </article>

      <div className="card p-4 sm:p-5 space-y-4">
        <div>
          <label htmlFor="part-one-search" className="block text-sm font-semibold mb-2">
            Search questions and answers
          </label>
          <div className="flex items-center gap-2 rounded-xl border line px-3" style={{ background: 'var(--card)' }}>
            <span className="mute" aria-hidden="true">⌕</span>
            <input
              id="part-one-search"
              type="search"
              className="min-h-11 min-w-0 flex-1 bg-transparent text-base outline-none"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try “weekend”, “weather” or “study”"
              aria-describedby="part-one-result-count"
            />
            {search && (
              <button
                type="button"
                className="btn2 min-h-9 px-2 text-xs"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Browse by category</p>
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by topic category">
            <button
              type="button"
              className="btn2 shrink-0 text-sm"
              aria-pressed={activeCategory === 'all'}
              style={activeCategory === 'all' ? { background: 'var(--soft)', color: 'var(--ink)', borderColor: 'var(--acc)' } : undefined}
              onClick={() => setActiveCategory('all')}
            >
              All topics
            </button>
            {speakingPartOneCategories.map((category) => (
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
        <p id="part-one-result-count" className="text-xs mute" aria-live="polite">
          Showing {questionCount} {questionCount === 1 ? 'question' : 'questions'} in {visibleCategories.length} {visibleCategories.length === 1 ? 'category' : 'categories'}.
        </p>
      </div>

      {visibleCategories.length > 0 ? (
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
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold">Band 9-style model answer</h3>
                        <Badge>Sample response</Badge>
                      </div>
                      <p className="text-sm sm:text-base leading-7">{item.answer}</p>
                      <p className="border-t line mt-3 pt-3 text-xs mute">
                        Make this answer your own by changing the details, examples and opinions to match your experience.
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="card p-6 text-center">
          <h2 className="font-bold">No matching questions</h2>
          <p className="text-sm mute mt-1">Try another search term or choose “All topics”.</p>
          <button
            type="button"
            className="btn2 mt-4"
            onClick={() => {
              setSearch('');
              setActiveCategory('all');
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}

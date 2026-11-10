import { useState } from 'react';
import Icon from './Icon.jsx';
import PersonCueCards from './PersonCueCards.jsx';
import PlaceCueCards from './PlaceCueCards.jsx';
import TopicCueCards from './TopicCueCards.jsx';
import SpeakingPartOne from './SpeakingPartOne.jsx';
import SpeakingPartThree from './SpeakingPartThree.jsx';
import ReadingMasterclass from './ReadingMasterclass.jsx';
import { studyModules } from '../data/studyHubContent.js';
import {
  activitiesCueCardContent,
  eventsCueCardContent,
  thingsCueCardContent,
} from '../data/speakingAdditionalContent.js';

const speakingFolders = [
  { id: 'person', title: '1. Person Related Cue Cards', subtitle: 'Describe people who have influenced or inspired you.' },
  { id: 'place', title: '2. Place Related Cue Cards', subtitle: 'Talk about places, their atmosphere and your experiences.' },
  { id: 'things', title: '3. Things / Objects', subtitle: 'Cue cards about meaningful or useful objects.' },
  { id: 'events', title: '4. Events / Experiences', subtitle: 'Cue cards about memorable occasions and experiences.' },
  { id: 'activities', title: '5. Activities', subtitle: 'Cue cards about hobbies, skills and things you do.' },
];

const additionalCueCardContent = {
  things: thingsCueCardContent,
  events: eventsCueCardContent,
  activities: activitiesCueCardContent,
};

const sectionLabels = [
  ['overview', 'Overview'],
  ['questionTypes', 'Question types'],
  ['strategy', 'Strategies & formats'],
  ['practice', 'Practice'],
];

function ModuleCard({ module, onClick }) {
  return (
    <button
      type="button"
      className="card w-full min-w-0 p-5 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline"
      onClick={onClick}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="logo shrink-0">
          <Icon name={module.icon} size={16} color="#fff" />
        </span>
        <Icon name="arr" size={18} />
      </span>
      <span className="block mt-4 text-lg font-bold">{module.title}</span>
      <span className="block mt-1 text-sm mute">{module.subtitle}</span>
    </button>
  );
}

function NotesSection({ section, module }) {
  if (section === 'overview') {
    return (
      <div className="space-y-4">
        <div className="card p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-2">At a glance</h2>
          <p className="text-sm sm:text-base leading-relaxed">{module.overview.intro}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {module.overview.takeaways.map((item) => (
            <article key={item.title} className="card p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm mute mt-1.5 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (section === 'questionTypes') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {module.questionTypes.map((item) => (
          <article key={item.title} className="card p-4">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm mute mt-1.5 leading-relaxed">{item.details}</p>
            <p className="text-sm mt-3 leading-relaxed">
              <span className="font-semibold">Tip: </span>{item.tip}
            </p>
          </article>
        ))}
      </div>
    );
  }

  if (section === 'strategy') {
    return (
      <div className="space-y-3">
        {module.strategy.map((group, index) => (
          <article key={group.title} className="card p-4 sm:p-5">
            <h2 className="font-semibold flex items-center gap-2">
              <span className="step" data-on="true">{index + 1}</span>
              {group.title}
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              {group.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--acc)' }} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
        <article className="card p-4 sm:p-5">
          <h2 className="font-semibold">Useful language</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {module.vocabulary.map((phrase) => (
              <span key={phrase} className="rounded-full px-3 py-2 text-sm" style={{ background: 'var(--soft)' }}>
                {phrase}
              </span>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <article className="card p-4 sm:p-5">
        <h2 className="font-semibold">Exercise</h2>
        <p className="text-sm mute mt-2 leading-relaxed">{module.practice.prompt}</p>
        <div className="mt-4 rounded-xl p-4" style={{ background: 'var(--soft)' }}>
          <h3 className="text-sm font-semibold">Your task</h3>
          <p className="text-sm mt-1 leading-relaxed">{module.practice.task}</p>
        </div>
      </article>
      <details className="card p-4 sm:p-5">
        <summary className="cursor-pointer font-semibold min-h-11 flex items-center">
          Show sample answer &amp; self-check
        </summary>
        <p className="text-sm mt-3 leading-relaxed">{module.practice.answer}</p>
        <ul className="mt-3 space-y-2 text-sm mute">
          {module.practice.review.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Icon name="check" size={15} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

export default function StudyHub({ selectedModule, onSelectModule }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [speakingFolder, setSpeakingFolder] = useState(null);
  const currentModule = studyModules.find((module) => module.id === selectedModule);

  if (!currentModule) {
    return (
      <section className="space-y-4 fade">
        <header>
          <p className="text-sm font-semibold" style={{ color: 'var(--acc)' }}>IELTS PREPARATION</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">Study Hub</h1>
          <p className="mute mt-2 max-w-2xl">
            Focused notes, practical strategies, and original exercises for each part of the IELTS Academic test.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {studyModules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onClick={() => {
                setActiveSection('overview');
                setSpeakingFolder(null);
                onSelectModule(module.id);
              }}
            />
          ))}
        </div>
        <p className="text-xs mute">
          Use these notes as a practice framework and check the official test instructions for current exam-day rules.
        </p>
      </section>
    );
  }

  if (currentModule.id === 'speaking') {
    if (speakingFolder === 'general') {
      return (
        <SpeakingPartOne onBack={() => setSpeakingFolder(null)} />
      );
    }

    if (speakingFolder === 'follow-up') {
      return (
        <SpeakingPartThree onBack={() => setSpeakingFolder(null)} />
      );
    }

    if (speakingFolder === 'person') {
      return (
        <section className="space-y-4 fade">
          <PersonCueCards onBack={() => setSpeakingFolder(null)} />
        </section>
      );
    }

    if (speakingFolder === 'place') {
      return (
        <section className="space-y-4 fade">
          <PlaceCueCards onBack={() => setSpeakingFolder(null)} />
        </section>
      );
    }

    if (additionalCueCardContent[speakingFolder]) {
      return (
        <section className="space-y-4 fade">
          <TopicCueCards
            content={additionalCueCardContent[speakingFolder]}
            onBack={() => setSpeakingFolder(null)}
          />
        </section>
      );
    }

    if (speakingFolder !== 'cue-cards') {
      return (
        <section className="space-y-4 fade">
          <button
            type="button"
            className="btn2 inline-flex items-center gap-2"
            onClick={() => {
              setSpeakingFolder(null);
              onSelectModule(null);
            }}
          >
            <Icon name="back" size={15} />
            All study modules
          </button>
          <header className="card p-4 sm:p-5">
            <p className="text-sm font-semibold" style={{ color: 'var(--acc)' }}>IELTS PREPARATION</p>
            <h1 className="mt-1 text-xl sm:text-2xl font-extrabold">Speaking Practice</h1>
            <p className="mute text-sm mt-1">Choose a part of the Speaking test to practise.</p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'general', title: '1. General Questions', subtitle: 'Build confident answers for familiar topics.' },
              { id: 'cue-cards', title: '2. Cue Card Questions', subtitle: 'Practise Part 2 topics with strategies and sample answers.' },
              { id: 'follow-up', title: '3. Follow-up Questions', subtitle: 'Develop ideas and support opinions in Part 3.' },
            ].map((part) => (
              <button
                type="button"
                key={part.id}
                className="card w-full min-w-0 p-4 sm:p-5 text-left transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => setSpeakingFolder(part.id)}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="logo shrink-0">
                    <Icon name="Speaking" size={16} color="#fff" />
                  </span>
                  <Icon name="arr" size={18} />
                </span>
                <span className="block mt-4 text-base font-bold">{part.title}</span>
                <span className="block mt-1 text-sm mute">{part.subtitle}</span>
              </button>
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="space-y-4 fade">
        <button
          type="button"
          className="btn2 inline-flex items-center gap-2"
          onClick={() => setSpeakingFolder(null)}
        >
          <Icon name="back" size={15} />
          Speaking sections
        </button>
        <header className="card p-4 sm:p-5">
          <p className="text-sm font-semibold" style={{ color: 'var(--acc)' }}>SPEAKING · PART 2</p>
          <h1 className="mt-1 text-xl sm:text-2xl font-extrabold">Cue Card Questions</h1>
          <p className="mute text-sm mt-1">Choose a cue-card folder for focused strategies and sample answers.</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {speakingFolders.map((folder) => (
            <button
              type="button"
              key={folder.id}
              className="card w-full min-w-0 p-4 sm:p-5 text-left transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => setSpeakingFolder(folder.id)}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="logo shrink-0">
                  <Icon name="Speaking" size={16} color="#fff" />
                </span>
                <Icon name="arr" size={18} />
              </span>
              <span className="block mt-4 text-base font-bold">{folder.title}</span>
              <span className="block mt-1 text-sm mute">{folder.subtitle}</span>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4 fade">
      <button
        type="button"
        className="btn2 inline-flex items-center gap-2"
        onClick={() => {
          setActiveSection('overview');
          setSpeakingFolder(null);
          onSelectModule(null);
        }}
      >
        <Icon name="back" size={15} />
        All study modules
      </button>

      <header className="card p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="logo shrink-0 mt-0.5">
            <Icon name={currentModule.icon} size={16} color="#fff" />
          </span>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-extrabold">{currentModule.title}</h1>
            <p className="mute text-sm mt-1">{currentModule.subtitle}</p>
          </div>
        </div>
      </header>

      {currentModule.id === 'reading' ? (
        <ReadingMasterclass />
      ) : (
        <>
          <nav className="grid grid-cols-2 sm:grid-cols-4 gap-2" aria-label="Study note sections">
            {sectionLabels.map(([key, label]) => (
              <button
                type="button"
                key={key}
                className={`btn2 min-w-0 px-2 sm:px-3 text-xs sm:text-sm ${activeSection === key ? 'font-semibold' : 'mute'}`}
                style={activeSection === key ? { background: 'var(--soft)', color: 'var(--ink)', borderColor: 'var(--acc)' } : undefined}
                aria-pressed={activeSection === key}
                onClick={() => setActiveSection(key)}
              >
                {label}
              </button>
            ))}
          </nav>
          <NotesSection section={activeSection} module={currentModule} />
        </>
      )}

      <div className="border-t line pt-4">
        <p className="text-xs font-semibold mute mb-2">EXPLORE ANOTHER MODULE</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {studyModules.filter((module) => module.id !== currentModule.id).map((module) => (
            <button
              type="button"
              key={module.id}
              className="btn2 min-w-0 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
              onClick={() => {
                setActiveSection('overview');
                setSpeakingFolder(null);
                onSelectModule(module.id);
              }}
            >
              <Icon name={module.icon} size={15} />
              {module.shortTitle}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

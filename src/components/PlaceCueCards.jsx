import {
  placeCueCardRules,
  placeCueCardSamples,
  placeCueCardVocabulary,
} from '../data/speakingPlaceContent.js';
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

export default function PlaceCueCards({ onBack }) {
  return (
    <section className="space-y-4 fade">
      <button type="button" className="btn2 inline-flex items-center gap-2" onClick={onBack}>
        <Icon name="back" size={15} />
        Cue Card folders
      </button>

      <header className="card p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="logo shrink-0">
            <Icon name="Speaking" size={17} color="#fff" />
          </span>
          <div className="min-w-0">
            <Badge>PART 2 CUE CARD PRACTICE</Badge>
            <h2 className="mt-2 text-xl sm:text-2xl font-extrabold leading-snug">
              2. Place Related Cue Cards
            </h2>
            <p className="mt-1 text-sm mute">
              জায়গার পরিচয়, পরিবেশ ও নিজের অভিজ্ঞতা দিয়ে স্বাভাবিকভাবে ১–২ মিনিট কথা বলুন।
            </p>
          </div>
        </div>
      </header>

      <article className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 className="text-lg font-bold">Core Strategy &amp; Framework</h3>
          <Badge>রুলস ও স্ট্র্যাটেজি</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {placeCueCardRules.map((rule, index) => (
            <section key={rule.title} className="rounded-xl border line p-4">
              <div className="flex items-start gap-3">
                <span className="step shrink-0" data-on="true">{index + 1}</span>
                <div className="min-w-0">
                  <h4 className="font-semibold">{rule.title}</h4>
                  <p className="mt-1 text-sm mute leading-relaxed">{rule.detail}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
        <aside
          className="mt-4 rounded-xl border-l-4 p-4 text-sm leading-relaxed"
          style={{ background: 'var(--warn)', borderColor: 'var(--bad)' }}
        >
          <strong>Practice tip:</strong> এক মিনিটের preparation-এ জায়গার নাম, ২–৩টি sensory detail, একটি ঘটনা ও আপনার অনুভূতির keyword লিখুন। উত্তরটি নিজের অভিজ্ঞতা অনুযায়ী বলুন—নমুনা হুবহু মুখস্থ করবেন না।
        </aside>
      </article>

      <article className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold">High-band vocabulary &amp; idioms</h3>
          <Badge>Places · Atmosphere · Experience</Badge>
        </div>
        <p className="text-sm mute mt-1.5 leading-relaxed">
          শব্দগুলো প্রাসঙ্গিকভাবে ব্যবহার করুন; স্বাভাবিক উচ্চারণ ও পরিষ্কার বক্তব্য কঠিন শব্দের চেয়ে বেশি গুরুত্বপূর্ণ।
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {placeCueCardVocabulary.map((item) => (
            <div key={item.phrase} className="rounded-xl border line p-3.5">
              <h4 className="font-semibold">{item.phrase}</h4>
              <p className="text-xs mute mt-1">{item.meaning}</p>
              <p className="text-sm mt-2 leading-relaxed">{item.example}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold">High-band Sample Answers</h3>
          <p className="text-sm mute mt-1">৫টি original model answer · বাংলা context সহ</p>
        </div>
        <Badge>Band-focused practice</Badge>
      </div>

      <div className="space-y-3">
        {placeCueCardSamples.map((sample, index) => (
          <details key={sample.title} className="card overflow-hidden group">
            <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
              <span className="step shrink-0" data-on="true">{index + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-sm sm:text-base">{sample.title}</span>
                <span className="block text-xs mute mt-0.5">{sample.category}</span>
              </span>
              <span className="mute text-xl transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
            </summary>
            <div className="space-y-4 border-t line p-4 sm:p-6">
              <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: 'var(--soft)' }}>
                <Badge>বাংলা Context</Badge>
                <p className="mt-2">{sample.context}</p>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h4 className="font-semibold">Sample response</h4>
                  <Badge>English</Badge>
                </div>
                <div className="space-y-3 text-sm sm:text-base leading-7">
                  {sample.answer.split('\n\n').map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <p className="border-t line pt-3 text-xs mute">
                These original practice models demonstrate organisation and vocabulary; adapt the details to your own experience.
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

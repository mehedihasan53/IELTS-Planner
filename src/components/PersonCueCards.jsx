import { personCueCardRules, personCueCardSamples } from '../data/speakingPersonContent.js';
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

export default function PersonCueCards({ onBack }) {
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
              1. Person Related Cue Cards
            </h2>
            <p className="mt-1 text-sm mute">
              ব্যক্তির পরিচয় থেকে আপনার জীবনে তাঁর প্রভাব—গুছিয়ে ১–২ মিনিট কথা বলার কাঠামো।
            </p>
          </div>
        </div>
      </header>

      <article className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 className="text-lg font-bold">Core Rules &amp; Structure</h3>
          <Badge>রুলস ও স্ট্র্যাটেজি</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {personCueCardRules.map((rule, index) => (
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
          <strong>Practice tip:</strong> প্রতিটি cue card-এ সব bullet point ছুঁয়ে যান। প্রস্তুতির এক মিনিটে পূর্ণ বাক্য নয়—শুধু নাম, ঘটনা ও অনুভূতির keyword লিখুন। নমুনাগুলোকে নিজের সত্য অভিজ্ঞতার সঙ্গে মানিয়ে বলুন, মুখস্থ script হিসেবে নয়।
        </aside>
      </article>

      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold">Sample Answers</h3>
          <p className="text-sm mute mt-1">৭টি practice sample · English response-এর আগে বাংলা context দেওয়া আছে</p>
        </div>
        <Badge>Band-focused practice</Badge>
      </div>

      <div className="space-y-3">
        {personCueCardSamples.map((sample, index) => (
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
                Use as a model for structure and language; personalise the details to make your answer natural and truthful.
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

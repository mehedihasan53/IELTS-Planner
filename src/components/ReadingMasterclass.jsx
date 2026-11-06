import { useState } from 'react';
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

function Callout({ title, children, warning = false }) {
  return (
    <aside
      className="rounded-xl border-l-4 p-4 sm:p-5"
      style={{
        background: warning ? 'var(--warn)' : 'var(--soft)',
        borderColor: warning ? 'var(--bad)' : 'var(--acc)',
      }}
    >
      <h3 className="font-bold">{title}</h3>
      <div className="mt-1.5 text-sm sm:text-base leading-relaxed">{children}</div>
    </aside>
  );
}

function PointList({ items, numbered = false }) {
  const List = numbered ? 'ol' : 'ul';
  return (
    <List className="space-y-3">
      {items.map((item, index) => (
        <li key={`${index}-${item.title}`} className="flex items-start gap-3">
          <span
            className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{ background: numbered ? 'var(--acc)' : 'var(--soft)', color: numbered ? '#fff' : 'var(--acc)' }}
          >
            {numbered ? index + 1 : <Icon name="check" size={14} />}
          </span>
          <div className="min-w-0 text-sm sm:text-base leading-relaxed">
            {item.title && <strong>{item.title} </strong>}
            {item.text}
            {item.example && <p className="mt-1 mute">{item.example}</p>}
          </div>
        </li>
      ))}
    </List>
  );
}

function ReadingAccordion({ number, title, children, defaultOpen = false }) {
  return (
    <details className="card overflow-hidden group" open={defaultOpen}>
      <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
          style={{ background: 'var(--soft)', color: 'var(--acc)' }}
        >
          0{number}
        </span>
        <span className="min-w-0 flex-1 text-base sm:text-lg font-bold">{title}</span>
        <span className="mute text-xl transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
      </summary>
      <div className="space-y-5 border-t line p-4 sm:p-6">
        {children}
      </div>
    </details>
  );
}

function Subsection({ title, badge, children }) {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base sm:text-lg font-bold">{title}</h3>
        {badge && <Badge>{badge}</Badge>}
      </div>
      {children}
    </section>
  );
}

function McqSection() {
  const steps = [
    { title: 'Locate First, Solve Later:', text: 'প্রথমে প্রশ্ন থেকে Keywords Underline করুন। তারপর প্যাসেজে সেই Keywords বা তাদের Paraphrase Locate করুন। কিন্তু সাথে সাথে Answer করবেন না, প্রথমে কাজ শুধু Locate করা।' },
    { title: 'Read the Question Carefully:', text: 'প্রশ্নটি খুব মনোযোগ দিয়ে পড়ুন। প্রথমে শুধু Question পড়ুন, এখনই Options পড়বেন না।' },
    { title: 'Read the Passage:', text: 'এখন প্যাসেজে যান। প্রথমে Broad Area খুঁজুন, তারপর Specific Area পড়ুন (Broad Area ➔ Specific Information এই ক্রমে পড়বেন)।' },
    { title: 'Come Back with an Idea:', text: 'প্যাসেজ পড়ে ফিরে আসুন। কিন্তু Option Match করার আগে নিজের মনে বলুন— "এই অংশের Main Idea কী?" অর্থাৎ নিজের ভাষায় এক লাইন Idea বের করুন। তারপর Option-এর সাথে মেলান।' },
    { title: 'Match the Correct Option:', text: 'এখন Option পড়ুন এবং প্যাসেজের Main Idea-এর সাথে Match করুন।' },
  ];
  const optionTips = [
    { title: 'উল্টো দিক থেকে পড়া:', text: 'Option নিচ থেকে ওপরের দিকে পড়ুন। অনেক সময়ে শেষের অপশনগুলো আগে Eliminate করা সহজ হয়।' },
    { title: 'Subject + Verb খোঁজা:', text: 'প্রতিটি Option-এর Main Idea সাধারণত Subject + Verb-এর মধ্যে থাকে। Extra Details Ignore করুন।' },
    { title: 'Signal Word:', text: 'প্যাসেজে BUT দেখলে বিশেষ মনোযোগ দিন। অনেক সময় But-এর পরে আসল বক্তব্য বা উত্তর থাকে। শুধু একটি Keyword মিললেই Option সঠিক হবে না, Meaning মেলাতে হবে।' },
  ];
  const traps = [
    { title: '180° Opposite', text: 'Option প্যাসেজের ঠিক উল্টো কথা বলে ➔ Eliminate করুন।' },
    { title: 'Out of Scope', text: 'Option এমন Information বলেছে যা প্যাসেজে আলোচনা করা হয়নি ➔ Eliminate করুন।' },
    { title: 'Positive vs Negative', text: 'প্যাসেজ Positive হলেও Option Negative হতে পারে (অথবা উল্টোটা) ➔ Meaning মিলিয়ে দেখুন।' },
    { title: 'Specific ➔ General Trap', text: 'প্যাসেজে নির্দিষ্ট তথ্য বলা হয়েছে, কিন্তু Option সেটাকে সাধারণ নিয়মে রূপান্তর করেছে।' },
    { title: 'Previous Paragraph Trap', text: 'Option-এ আগের Paragraph-এর Idea দিয়ে দেয়, কিন্তু Question বর্তমান Paragraph থেকে উত্তর চায় ➔ Paragraph Location Check করুন।' },
    { title: 'Universal Truth', text: 'Option-এ বাস্তব সত্য স্টেটমেন্ট থাকতে পারে, কিন্তু প্যাসেজে তা বলা হয়নি ➔ Real-life knowledge ব্যবহার করবেন না, শুধু প্যাসেজ দেখুন।' },
    { title: 'Third-party Opinion', text: 'প্যাসেজে Freeman, Smith, Researchers, Scientists ইত্যাদি Third-party Source থাকতে পারে। যদি প্রশ্নে লেখা থাকে "According to the author / writer", তবে Third-party-এর Opinion উত্তর হবে না, শুধু Author-এর position গ্রহণ করুন। Never choose a Third-party Opinion!' },
  ];

  return (
    <ReadingAccordion number={1} title="MCQ Solving Strategy (Multiple Choice Questions)" defaultOpen>
      <Subsection title="মৌলিক ভাবনা ও মানসিক প্রস্তুতি" badge="প্রথমে প্রশ্ন বুঝুন">
        <PointList items={[
          { text: 'উত্তর খোঁজার আগে প্রশ্নটি খুব ভালো করে পড়ে তার ১০০% অর্থ পরিষ্কার করতে হবে। প্রশ্ন বুঝতে সমস্যা হলে অপশন দেখে বিভ্রান্ত হওয়ার সম্ভাবনা অনেক বেশি থাকে।' },
          { text: 'নিজেকে প্রশ্ন করুন: "আমি যদি এই প্রশ্নটি ১০ বছরের একটি বাচ্চাকে বুঝিয়ে বলি, তাহলে কীভাবে বলব?" অথাৎ Question-এর Meaning ১০০% পরিষ্কার করুন।' },
        ]} />
      </Subsection>

      <Subsection title="৫ ধাপের MCQ সলভিং স্ট্র্যাটেজি">
        <PointList items={steps} numbered />
      </Subsection>

      <Callout title="Elimination Technique (বর্জন পদ্ধতি)">
        সঠিক উত্তর খোঁজার চেয়ে ৩টি ভুল অপশন আত্মবিশ্বাসের সাথে বাদ দেওয়া শিখুন। যখন ৩টি Option confidently বাদ দিতে পারবেন, তখন বাকি Option-ই হবে সঠিক উত্তর।
      </Callout>

      <Subsection title="Option পড়ার বিশেষ কৌশল">
        <PointList items={optionTips} />
      </Subsection>

      <Subsection title="৭টি মারাত্মক ট্র্যাপ (Traps to Avoid)" badge="সতর্কতা">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {traps.map((trap, index) => (
            <article key={trap.title} className="rounded-xl border line p-4" style={{ background: 'var(--card)' }}>
              <div className="flex items-start gap-2">
                <Badge>{index + 1}</Badge>
                <div className="min-w-0 text-sm leading-relaxed">
                  <h4 className="font-bold">{trap.title}</h4>
                  <p className="mt-1">{trap.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Subsection>
    </ReadingAccordion>
  );
}

function TrueFalseSection() {
  const steps = [
    { title: 'Underline Keywords:', text: 'Nouns, Names, Numbers, Dates, Places, Unique words ইত্যাদি Underline করুন এবং প্যাসেজে Synonym / Paraphrase খুঁজুন।' },
    { title: 'Change Statement to Question:', text: 'Statement-টিকে মনে মনে একটি প্রশ্নে রূপান্তর করুন (যেমন: Statement: "The bridge was built in 1990" ➔ Ask: "Was the bridge built in 1990?")। এতে Direct answer পাওয়া সহজ হয়।' },
    { title: 'Give Direct Answer:', text: 'YES ➔ TRUE | NO ➔ FALSE | Can’t Answer / No Info ➔ NOT GIVEN.' },
  ];
  const qualifiers = [
    { title: 'Quantity:', text: 'all, everyone, none, some, a few, many', example: 'যেমন: Passage-এ "Some students passed" আর Question-এ "All students passed" হলে ➔ FALSE, কারণ Some ≠ All' },
    { title: 'Frequency:', text: 'always, never, sometimes, often, occasionally, rarely', example: 'যেমন: "Sometimes" ≠ "Always"' },
    { title: 'Limitation:', text: 'purely, solely, only, unique, mainly', example: 'যেমন: "Several solutions" vs "Only one solution" ➔ FALSE' },
    { title: 'Ordinal:', text: 'first, second, third, last' },
    { title: 'Time-Order:', text: 'newest, latest, most recent, oldest' },
  ];

  return (
    <ReadingAccordion number={2} title="True / False / Not Given Master Class Notes">
      <Subsection title="মূল নিয়ম (Golden Rules)">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            ['Same Information', 'TRUE', 'var(--soft)'],
            ['Different Information', 'FALSE', 'var(--warn)'],
            ['No Information / Confusion', 'NOT GIVEN', 'var(--card)'],
          ].map(([meaning, answer]) => (
            <div key={answer} className="rounded-xl border line p-4" style={{ background: answer === 'FALSE' ? 'var(--warn)' : 'var(--soft)' }}>
              <p className="text-sm mute">{meaning}</p>
              <p className="mt-1 text-lg font-extrabold">{answer}</p>
              <p className="text-sm">{answer === 'TRUE' ? 'Direct Answer YES' : answer === 'FALSE' ? 'Direct Answer NO' : 'তথ্য নেই / নিশ্চিত হওয়া যায় না'}</p>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="৩ ধাপের পদ্ধতি (3-Step Method)">
        <PointList items={steps} numbered />
      </Subsection>

      <Subsection title="Qualifying Words (সবচেয়ে গুরুত্বপূর্ণ ট্র্যাপ - সবসময় Underline করবেন)" badge="Meaning বদলে দিতে পারে">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {qualifiers.map((item) => (
            <article key={item.title} className="rounded-xl border line p-4">
              <h4 className="font-bold">{item.title}</h4>
              <p className="mt-1 text-sm leading-relaxed">{item.text}</p>
              {item.example && <p className="mt-2 text-sm mute leading-relaxed">{item.example}</p>}
            </article>
          ))}
        </div>
      </Subsection>

      <Callout title="পরীক্ষার নিয়ম ও সতর্কতা" warning>
        <ul className="list-disc space-y-2 pl-5">
          <li>শুধু ১টি শব্দ মিলে গেলেই উত্তর TRUE হবে না। পুরো Sentence-এর Meaning মিলিয়ে দেখুন।</li>
          <li>Paraphrase চিনতে শিখুন। কখনোই নিজের Knowledge বা Assumption ব্যবহার করবেন না। শুধু প্যাসেজের তথ্যের ওপর ভিত্তি করে উত্তর দিন।</li>
        </ul>
      </Callout>
    </ReadingAccordion>
  );
}

function HeadingsSection() {
  const focusPoints = [
    { title: 'Structural / Linking Words:', text: 'প্যারাগ্রাফের মূল ধারণা পরিবর্তন বা সংযোগ করে। যেমন: Contrast (but, however, although, yet, nevertheless) এবং Comparison (similarly, likewise, compared with)।' },
    { title: 'Question Mark (?):', text: 'প্যারাগ্রাফে কোনো প্রশ্ন থাকলে তার উত্তর সাধারণত ঠিক পরের অংশেই থাকে।' },
    { title: 'Subject + Verb:', text: 'প্যারাগ্রাফের main idea সাধারণত Subject + Verb-এর মাধ্যমেই প্রকাশ পায় (যেমন: Scientists discovered... / The government introduced...)।' },
    { title: 'Colon (:):', text: 'Colon-এর আগে সাধারণ main idea থাকে এবং পরে explanation, list বা example থাকে।' },
  ];
  const ignore = [
    { title: 'Lists ও Examples', text: 'for example, for instance, such as' },
    { title: 'Punctuation', text: 'Dash —, Double Comma' },
    { title: 'Modifiers', text: 'Initial modifier, Verb-ing/ed phrase, Which/That clause' },
    { title: 'Relative Clauses', text: 'who, whom, whose, which, where, when, why' },
    { title: 'Grammar Words', text: 'Articles: a, an, the; Prepositions: in, on, at, by, with; FANBOYS ➔ এগুলোর ওপর সময় নষ্ট করবেন না।' },
  ];
  const tips = [
    'ছোট (Short) Paragraph দিয়ে শুরু করুন। ছোট প্যারাগ্রাফের main idea সহজে বোঝা যায় এবং একবার Heading ব্যবহার হয়ে গেলে তা সাথে সাথে কেটে দিন (Elimination Technique)।',
    'বড় ও কঠিন Paragraph সবার শেষে করুন (কফিউশন কম হবে)।',
    'Paragraph-এর শেষ ১-২ লাইন অবশ্যই পড়বেন, কারণ শেষের sense অনেক সময় heading identify করতে সাহায্য করে।',
    'Heading-এ Plural Noun থাকলে (যেমন: Types of Pollution), প্যাসেজে কমপক্ষে ২ ধরনের বিষয় থাকতে হবে। পুরো প্যারাগ্রাফের sense ভেবে Heading বেছে নিন।',
  ];

  return (
    <ReadingAccordion number={3} title="List of Headings Master Class Notes">
      <Subsection title="প্যারাগ্রাফ পড়ার সময় ৪টি বিষয় খেয়াল রাখবেন">
        <PointList items={focusPoints} numbered />
      </Subsection>

      <Callout title="যে জিনিসগুলো Ignore করবেন (Slash and Burn Technique)" warning>
        <p>সবকিছু সমান গুরুত্ব দিয়ে পড়বেন না। এগুলো extra info দেয়, main idea নয়:</p>
      </Callout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ignore.map((item) => (
          <article key={item.title} className="card p-4">
            <h4 className="font-bold">{item.title}</h4>
            <p className="mt-1 text-sm mute leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>

      <Subsection title="পরামর্শ ও টিপস (Tips 1 to 9)">
        <PointList items={tips.map((text) => ({ text }))} numbered />
      </Subsection>
    </ReadingAccordion>
  );
}

function SummaryAndEndingSection() {
  return (
    <ReadingAccordion number={5} title="Summary Completion & Sentence Ending">
      <Subsection title="Topic A: Summary Completion" badge="Summary">
        <PointList items={[
          { text: 'যদি একই প্যাসেজে একাধিক কোশ্চেন টাইপ থাকে, তবে সবার আগে Summary Completion করার চেষ্টা করুন। এতে পুরো প্যাসেজের Main Idea পরিষ্কার হয়ে যায়।' },
          { title: 'ধাপসমূহ:', text: 'Summary-এর Title ও ইউনিক Keywords দিয়ে সঠিক Paragraph খুঁজুন ➔ Keywords Underline করে Scan করুন ➔ Grammar (Noun/Verb/Adjective/Adverb) ও Logic ব্যবহার করে Gap Fill করুন।' },
        ]} />
        <Callout title="DISORDER Rule" warning>
          সামারির উত্তরগুলো প্যাসেজের Order সবসময় হুবহু ফলো না-ও করতে পারে (Disorder হতে পারে)। প্রথম গ্যাপটি কঠিন হলে বেশি সময় নষ্ট না করে পরে ফিরে আসুন।
        </Callout>
        <Callout title="Special Rule">
          কোনো ব্যক্তির নামের সাথে তার পরিচয় বা Definition দেওয়া থাকলে বুঝবেন সেই ব্যক্তির নাম প্যাসেজের ওপরের অংশে আগেই এসেছে।
        </Callout>
      </Subsection>

      <div className="border-t line" />

      <Subsection title="Topic B: Sentence Ending" badge="Sentence endings">
        <PointList items={[
          { text: 'প্রশ্নগুলো সাধারণত Serially (ক্রম অনুযায়ী) আসে।' },
          { text: 'Keywords সবসময় Question থেকে Underline করবেন, Box থেকে নয় (কারণ Box-এর Options highly paraphrased থাকে)।' },
          { text: 'উত্তর দেওয়ার আগে Question + Option একসাথে পড়ে Grammar (Subject-Verb Agreement), Positive/Negative Meaning এবং Logical Meaning ঠিক আছে কিনা যাচাই করুন। Meaning ইজ অলওয়েজ মোর ইম্পর্ট্যান্ট দ্যান ম্যাচিং ওয়ান অর টু ওয়ার্ডস!' },
        ]} />
      </Subsection>
    </ReadingAccordion>
  );
}

function GapFillSection() {
  const steps = [
    {
      title: 'Word Limit চেক করা (সবচেয়ে গুরুত্বপূর্ণ):',
      text: 'প্রশ্ন বা ইনস্ট্রাকশন খুব ভালো করে পড়তে হবে। যেমন: “NO MORE THAN TWO WORDS AND/OR A NUMBER” (সর্বোচ্চ দুটি শব্দ এবং/অথবা একটি সংখ্যা)। এর বেশি শব্দ লিখলে পুরো উত্তর কাটা যাবে। হাইফেনযুক্ত শব্দ (যেমন: state-of-the-art) একটি শব্দ হিসেবে গণ্য হয়।',
    },
    {
      title: 'গ্যাপের আশেপাশের শব্দ (Keywords) আন্ডারলাইন করা:',
      text: 'গ্যাপের আগের ও পরের শব্দগুলো (বিশেষ করে Noun, Proper Name, Number, Year, Technical Term) খুব ভালো করে আন্ডারলাইন করুন। এগুলো প্যাসেজে লোকেশন খুঁজে পেতে সাহায্য করবে।',
    },
    {
      title: 'ব্যাকরণগত রূপ (Grammar Check) অনুমান করা:',
      text: 'গ্যাপে কী ধরনের Parts of Speech বসবে তা আগে থেকেই অনুমান করুন। গ্যাপের আগের শব্দ দেখে বুঝুন সেখানে Noun, Verb, Adjective নাকি Adverb বসবে। যেমন: গ্যাপের আগে যদি “a / an / the” থাকে, তবে সেখানে অবশ্যই Noun বসবে।',
    },
    {
      title: 'স্ক্যান করে উত্তর লোকেট করা এবং অর্থ মেলানো:',
      text: 'প্যাসেজে কিওয়ার্ড বা তার সমার্থক শব্দ খুঁজে পাওয়ার পর পুরো বাক্যটি পড়ে দেখুন গ্যাপের সাথে অর্থের মিল আছে কিনা। প্যাসেজের সঠিক শব্দটি গ্যাপে বসিয়ে দিন।',
    },
  ];

  return (
    <ReadingAccordion number={4} title="Gap Fill & Completion (Sentence, Summary, Note, Flowchart)">
      <header className="rounded-xl border line p-4 sm:p-5" style={{ background: 'var(--soft)' }}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Sentence</Badge>
          <Badge>Summary</Badge>
          <Badge>Note</Badge>
          <Badge>Flowchart Completion</Badge>
        </div>
        <p className="mt-3 text-sm sm:text-base leading-relaxed">
          <strong>Prepared by Mehedi Hasan</strong>
        </p>
      </header>

      <Subsection title="1. Gap Fill কি এবং এর মূল চ্যালেঞ্জ?">
        <PointList items={[
          { text: 'Gap Fill-এ একটি বাক্য, সামারি, নোট বা টেবিলের কিছু অংশ ফাঁকা থাকে। প্যাসেজ থেকে সঠিক শব্দ বা তথ্য খুঁজে নিয়ে গ্যাপ পূরণ করতে হয়।' },
          { text: 'এর মূল চ্যালেঞ্জ হলো হুবহু শব্দ না পেয়ে Paraphrased (সমার্থক) শব্দ বা বাক্য খুঁজে বের করা।' },
        ]} />
      </Subsection>

      <Subsection title="2. গ্যাপ ফিল সলভ করার নিখুঁত ৪ ধাপ (4-Step Strategy)" badge="ধাপে ধাপে">
        <PointList items={steps} numbered />
      </Subsection>

      <Subsection title="3. গুরুত্বপূর্ণ টিপস এবং ট্র্যাপস (Tips & Traps)" badge="পরীক্ষায় মনে রাখুন">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <article className="rounded-xl border line p-4">
            <div className="flex items-start gap-2">
              <Badge>Serial Order</Badge>
              <p className="min-w-0 text-sm sm:text-base leading-relaxed">
                বেশিরভাগ Gap Fill প্রশ্ন প্যাসেজের ক্রম অনুযায়ী (Serially) সাজানো থাকে। অর্থাৎ ১ নম্বর প্রশ্নের উত্তর যেখানে পাবেন, ২ নম্বর প্রশ্নের উত্তর তার ঠিক পরেই থাকবে।
              </p>
            </div>
          </article>
          <Callout title="Disorder Rule (সামারির ক্ষেত্রে ব্যতিক্রম)" warning>
            যদি প্রশ্নটি পুরো প্যাসেজের ওপর কোনো Summary Completion হয়, তবে সেটি সিরিয়াল নাও মানতে পারে (Disorder হতে পারে)।
          </Callout>
          <Callout title="Distractor বা Trap থেকে সাবধান" warning>
            পরীক্ষকরা অনেক সময় গ্যাপের আশেপাশে এমন শব্দ রাখেন যা দেখতে ঠিক প্রশ্নের মতো মনে হয়, কিন্তু গেম খেলে অন্য কোনো তথ্য দেয়। তাই শুধু শব্দ মেলালে চলবে না, Grammar + Logic শতভাগ ঠিক আছে কিনা দেখতে হবে।
          </Callout>
          <Callout title="বানান ভুল (Spelling Mistake)">
            প্যাসেজ থেকে কোনো শব্দ কপি করার সময় বানান ভুল করলে নম্বর কাটা যাবে। তাই বানান সবসময় প্যাসেজ থেকে দেখে সাবধানে লিখবেন।
          </Callout>
        </div>
      </Subsection>
    </ReadingAccordion>
  );
}

function MatchingInformationSection() {
  return (
    <ReadingAccordion number={6} title="Matching Information to Paragraphs">
      <Subsection title="“Which paragraph contains...?” প্রশ্নের কৌশল" badge="শেষে সমাধান করুন">
        <Callout title="কৌশল: এই প্রশ্নটি শুরুতে সলভ করবেন না!">
          এটি প্যাসেজের সবার শেষে করুন, কারণ অন্য প্রশ্নগুলো সলভ করতে গিয়ে ইতিমধ্যেই আপনার পুরো প্যাসেজের লোকেশন মুখস্থ বা আয়ত্তে চলে আসবে।
        </Callout>
        <PointList items={[
          { title: 'কিওয়ার্ড:', text: 'নাম, সাল, সংখ্যা বা টেকনিক্যাল টার্ম খুঁজুন।' },
          { text: 'মনে রাখবেন, একটি প্যারাগ্রাফে একাধিক উত্তর থাকতে পারে অথবা কোনো কোনো প্যারাগ্রাফে কোনো উত্তরই নাও থাকতে পারে।' },
        ]} />
      </Subsection>
    </ReadingAccordion>
  );
}

function MatchingFeaturesSection() {
  return (
    <ReadingAccordion number={7} title="Matching Features (Statements to Options / People)">
      <Subsection title="ক্রম ও অপশন রিইউজ" badge="Disorder হতে পারে">
        <PointList items={[
          { text: 'এই প্রশ্নের উত্তরগুলো সাধারণত প্যারাগ্রাফের সিরিয়াল মেনে চলে না (Disorder হয়)।' },
          { text: 'প্রথমে অপশনগুলো প্যাসেজে মার্ক করে রাখুন।' },
        ]} />
        <Callout title="Instruction ভালো করে চেক করুন" warning>
          অপশনগুলো (A, B, C) একাধিকবার ব্যবহার করা যাবে কি না দেখুন—“You may use any letter more than once” লেখা থাকলে একই letter একাধিকবার ব্যবহার করা যাবে।
        </Callout>
      </Subsection>
    </ReadingAccordion>
  );
}

function ExamRulesSection() {
  return (
    <ReadingAccordion number={8} title="Exam Hall Golden Rules & Time Management">
      <Subsection title="সময় বণ্টন" badge="মোট ৬০ মিনিট">
        <p className="text-sm sm:text-base leading-relaxed">
          মোট ৬০ মিনিট। প্রতিটি প্যাসেজের জন্য সর্বোচ্চ ২০ মিনিট বরাদ্দ রাখুন:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            ['Passage 1', '২০ মিনিট'],
            ['Passage 2', '২০ মিনিট'],
            ['Passage 3', '২০ মিনিট'],
          ].map(([passage, time]) => (
            <div key={passage} className="card p-4 text-center">
              <p className="text-sm mute">{passage}</p>
              <p className="text-xl font-extrabold mt-1">{time}</p>
            </div>
          ))}
        </div>
      </Subsection>
      <Subsection title="প্যাসেজ নির্বাচন ও সময় নিয়ন্ত্রণ">
        <PointList items={[
          { title: 'প্যাসেজ নির্বাচন:', text: 'যেটি সবচেয়ে সহজ বা আপনার পরিচিত টপিকের মনে হবে, সেটি দিয়ে শুরু করুন।' },
          { text: 'কোনো একটি কঠিন প্রশ্নে আটকে বেশিক্ষণ সময় নষ্ট করবেন না (মিনিমাম সময়ে মুভ অন করুন)।' },
        ]} />
        <Callout title="উত্তর সঙ্গে সঙ্গে Answer Sheet-এ তুলুন" warning>
          রিডিং টেস্টে আলাদা করে উত্তর তোলার জন্য কোনো এক্সট্রা সময় দেওয়া হয় না, তাই সাথে সাথে অ্যানসার শিটে (OMR-এ) বা বক্সে তুলে ফেলুন।
        </Callout>
      </Subsection>
    </ReadingAccordion>
  );
}

export default function ReadingMasterclass() {
  const [activeGroup, setActiveGroup] = useState('core');

  return (
    <section className="space-y-4 fade" lang="bn">
      {/* <header className="card p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="logo shrink-0">
            <Icon name="Reading" size={17} color="#fff" />
          </span>
          <div className="min-w-0">
            <Badge>ULTIMATE READING MASTER HUB</Badge>
            <h2 className="mt-2 text-xl sm:text-2xl font-extrabold leading-snug">
              Ultimate IELTS Reading Masterclass Hub
            </h2>
            <p className="mt-1 text-sm mute">Prepared by Mehedi Hasan</p>
          </div>
        </div>
      </header> */}
      <p className="text-sm mute px-1">Core ও Advanced মডিউল থেকে বিষয় নির্বাচন করুন, তারপর যে নোটটি পড়তে চান সেটি খুলুন। প্রতিটি section-এর strategy, নিয়ম ও সতর্কতাগুলো একসাথে সাজানো হয়েছে।</p>
      <nav className="grid grid-cols-2 gap-2" aria-label="Reading study modules">
        {[
          ['core', 'Core Modules', '1–5 question types'],
          ['advanced', 'Advanced Modules', '6–8 exam strategies'],
        ].map(([key, title, description]) => (
          <button
            type="button"
            key={key}
            className="btn2 min-w-0 px-3 py-2 text-left"
            style={activeGroup === key ? { background: 'var(--soft)', borderColor: 'var(--acc)' } : undefined}
            aria-pressed={activeGroup === key}
            onClick={() => setActiveGroup(key)}
          >
            <span className="block font-bold text-sm sm:text-base">{title}</span>
            <span className="block text-xs mute mt-0.5">{description}</span>
          </button>
        ))}
      </nav>
      <div className="space-y-3" key={activeGroup}>
        {activeGroup === 'core' ? (
          <>
            <McqSection />
            <TrueFalseSection />
            <HeadingsSection />
            <GapFillSection />
            <SummaryAndEndingSection />
          </>
        ) : (
          <>
            <MatchingInformationSection />
            <MatchingFeaturesSection />
            <ExamRulesSection />
          </>
        )}
      </div>
    </section>
  );
}

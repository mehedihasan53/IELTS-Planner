export const skillNames = ['Reading', 'Listening', 'Writing', 'Speaking', 'Vocabulary'];
export const studyTypes = [...skillNames, 'Review'];

export const colors = {
  Reading: '#2563eb',
  Listening: '#0d9488',
  Writing: '#7c3aed',
  Speaking: '#e11d48',
  Vocabulary: '#d97706',
  Review: '#64748b',
  fixed: '#475569',
  meal: '#94a3b8',
  prayer: '#16a34a',
  rest: '#94a3b8',
  free: '#cbd5e1',
};

export const presets = {
  Gym: [{ name: 'Gym', start: '09:30', dur: 120 }],
  Work: [{ name: 'Work', start: '09:00', dur: 480 }],
  Prayer: [
    ['Fajr', '05:30', 20],
    ['Zuhr', '12:30', 20],
    ['Asr', '16:30', 15],
    ['Maghrib', '18:15', 15],
    ['Isha', '20:30', 20],
  ].map(([name, start, dur]) => ({ name, start, dur, kind: 'prayer' })),
  Other: [{ name: 'Class / Other', start: '15:00', dur: 60 }],
};

export const essentialActivities = [
  { name: 'Breakfast', start: '07:30', dur: 30 },
  { name: 'Lunch & rest', start: '12:30', dur: 45 },
  { name: 'Dinner', start: '20:30', dur: 30 },
];

export const roadmap = `Diagnostic Passage|Section 1 Basics|Question Analysis & Task 2 Structure|Part 1 Intro Questions
True / False / Not Given|Section 1 Practice|Paraphrasing & Introduction|Part 1 Topic Practice
Matching Headings|Section 2 Practice|Thesis Statement & Body Paragraph 1|Cue Card Intro
Sentence Completion|Section 2 Practice|Body Paragraph 2 Structure|Part 2 Practice
Multiple Choice (MCQ)|Section 3 Practice|Conclusion Writing|Part 3 Discussion
Matching Information|Section 4 Practice|Complete Essay Writing|Full Speaking Test
Mini Reading Test|Mini Listening Test|Essay Review & Feedback|Speaking Review
Matching Features|Section 1 Focused Test|Agree / Disagree Essay|Part 1 Practice
Matching Headings|Section 2 Focused Test|Discuss Both Views Essay|Cue Card Practice
True / False / Not Given|Section 3 Focused Test|Advantages & Disadvantages Essay|Part 3 Deep Dive
MCQ Strategies|Section 4 Focused Test|Problem & Solution Essay|Part 2 Practice
Sentence Completion|Full Section Practice|Two-part Question Essay|Part 1 Review
Timed Passage (20 min)|Full Listening Test|Task 1: Line Graph & Bar Chart|Speaking Mock
Full Reading Test|Full Listening Test|Task 1: Pie Chart & Tables|Full Review
Passage 2 (timed 18–20 min)|Section 3 & 4 Drill|Task 1: Map & Process Diagram|Practice & Recording
Weak Area Analysis|Full Test + Analysis|Task 2 Practice (timed 40 min)|Practice & Recording
Full Reading Test (60 min)|Section Drill|Task 1 + Task 2 Practice|Full Speaking Mock
Weak Question Focus|Full Listening Test|Task 2 Weak Type Practice|Vocabulary & Collocations
Weak Question Focus|Section Drill|Task 1 Overview Practice|Topic Cards Practice
Timed Passage|Section 3 & 4 Drill|Full Writing Test (60 min)|Error Notebook Evaluation
FULL IELTS MOCK TEST|FULL IELTS MOCK TEST|Band Score Analysis|Light Revision & Rest
Full Reading Test|Weak Area Practice|Task 2 Essay Writing|Speaking Practice
Reading Weak Areas|Full Listening Test|Task 1 Report Writing|Vocabulary Revision
Weak Question Practice|Section Drill|Full Writing Test (Task 1 + 2)|Part 3 Focus
Timed Passage|Weak Area Practice|Task 2 Speed Writing|Grammar & Sentence Check
Reading Mock|Listening Mock|Writing Self-Review|Speaking Mock
FULL IELTS MOCK TEST|FULL IELTS MOCK TEST|Detailed Mistake Analysis|Weakness Correction
FULL IELTS MOCK TEST|FULL IELTS MOCK TEST|Final Band Estimation|Formula & Template Review
Revise Vocabulary & Spelling|Revise Weak Sections|Essay Templates Review|Cue Cards Revision
FINAL MOCK TEST|FINAL MOCK TEST|Final Band Analysis|Final Review`.split('\n').map((row) => row.split('|'));

export const getRoadmapIndex = (plan, day) => Math.min(29, Math.floor(((day - 1) * 30) / plan.days));

export const getPhase = (index) => (
  index < 7 ? 'Foundation' : index < 14 ? 'Skill building' : index < 21 ? 'Intensive' : 'Exam prep'
);

export const defaultPlan = {
  name: '',
  level: 'Intermediate',
  target: 6.5,
  days: 30,
  hours: 6,
  fixed: [...presets.Gym, ...presets.Prayer].map((activity) => ({ ...activity })),
};

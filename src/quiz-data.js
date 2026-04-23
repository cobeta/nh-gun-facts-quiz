export const QUESTIONS = [
  {
    id: 'q1',
    prompt: "In New Hampshire, what's the most common cause of gun death?",
    answers: [
      { text: 'Street violence', correct: false, feedback: "Not even close. The answer is suicide — accounting for 87% of all NH gun deaths. And when a gun is used in a suicide attempt, it's almost always fatal. That's why waiting periods between purchase and possession save lives." },
      { text: 'Mass shootings', correct: false, feedback: "Not quite. It's actually suicide — 87% of NH gun deaths. Mass shootings dominate the headlines but suicide is the quiet epidemic. A gun makes a suicide attempt nearly always fatal, which is why waiting periods matter." },
      { text: 'Hunting accidents', correct: false, feedback: "Nope. Suicide accounts for 87% of NH gun deaths. This surprises most people — it's not what we see on the news, but it's where the real harm is happening." },
      { text: 'Suicide', correct: true, feedback: "Correct. 87% of NH gun deaths are suicides. When a firearm is involved in a suicide attempt, it's almost always lethal — which is exactly why waiting periods between purchase and possession save lives." },
    ],
  },
  {
    id: 'q2',
    prompt: "NH has more gun deaths per year than deaths from what other cause?",
    answers: [
      { text: 'Drug overdoses', correct: false, feedback: "Not that one. It's actually car crashes. Between 2019–2023, NH averaged 141 gun deaths per year vs. 118 traffic fatalities. Politicians who vow to “crack down on reckless drivers” while doing nothing on gun safety have some explaining to do." },
      { text: 'Heart disease', correct: false, feedback: "Not that one. It's car crashes. NH averaged 141 gun deaths per year vs. 118 traffic deaths (2019–2023). That comparison tends to get people's attention." },
      { text: 'Car crashes', correct: true, feedback: "Correct. 141 gun deaths per year vs. 118 traffic fatalities on average. Politicians who vow to crack down on reckless drivers while opposing gun safety measures haven't looked at these numbers." },
      { text: 'Workplace accidents', correct: false, feedback: "Not that one. Car crashes is the answer — NH averaged 141 gun deaths vs. 118 traffic deaths per year between 2019–2023." },
    ],
  },
  {
    id: 'q3',
    prompt: "What percentage of NH residents support universal background checks for gun purchases?",
    answers: [
      { text: "About half — it's pretty divisive", correct: false, feedback: "Way off. It's 84% — and here's the kicker: gun-owner and non-gun-owner households have virtually identical opinions on this. It's not a gun owner vs. non-owner issue. It's a policy vs. politics issue." },
      { text: 'Around 60%', correct: false, feedback: "Higher than that. 84% of NH residents support background checks, according to a 2023 UNH Survey. Even more striking: gun owners and non-gun owners agree almost equally." },
      { text: 'Around 75%', correct: false, feedback: "Close, but higher. 84% support background checks. 75% support protective orders for people who may be a danger to themselves or others. 66% support waiting periods. And gun owners and non-gun owners largely agree on all three." },
      { text: '84%', correct: true, feedback: "Correct. And gun owners and non-gun owners have virtually identical views on this. This isn't a partisan split — it's a gap between what voters want and what lawmakers are doing." },
    ],
  },
  {
    id: 'q4',
    prompt: "Where do most stolen guns in the US come from?",
    answers: [
      { text: 'Gun stores', correct: false, feedback: "Not stores. Cars are the biggest source — at least one gun is stolen from a vehicle every 9 minutes in the US. NH doesn't require employers to ban guns from parking lots, making every lot a potential source for criminals." },
      { text: 'Private sales', correct: false, feedback: "Not private sales. It's cars. A gun is stolen from a vehicle at least every 9 minutes across the US. NH currently has no law requiring employers to restrict guns in parking lots." },
      { text: 'Residential break-ins', correct: false, feedback: "Good guess, but no. Cars are actually the largest source. At least one gun is stolen from a vehicle every 9 minutes in the US — and NH has no law allowing employers to ban guns from their parking lots." },
      { text: 'Cars', correct: true, feedback: "Correct. At least one gun is stolen from a car every 9 minutes in the US. NH doesn't allow employers to ban guns in their parking lots — making every parking lot a potential source for criminals." },
    ],
  },
  {
    id: 'q5',
    prompt: "Does New Hampshire have a state law creating Gun-Free School Zones?",
    answers: [
      { text: 'Yes — state law protects all schools', correct: false, feedback: "Actually, no. There is no NH state law on this — only a federal one. In 2018, several school districts were informed by the AG's office that under NH law, only the State Legislature can regulate firearms. Students, teachers, and administrators were caught in the confusion." },
      { text: 'Yes — but only public schools', correct: false, feedback: "No state law exists at all. Only the federal law applies. In 2018, the NH Attorney General's Office had to inform school districts that the state has no such law — and that only the Legislature can regulate firearms." },
      { text: 'Only within 1,000 feet of a school', correct: false, feedback: "That's the federal rule, not a state one. New Hampshire has no state law — only the federal Gun-Free School Zones Act applies. In 2018 the AG's office had to clarify to school districts that only the Legislature can regulate firearms in NH." },
      { text: 'No', correct: true, feedback: "Correct — and that surprises most people. There's no NH state law. Only the federal Gun-Free School Zones Act applies. In 2018, school districts were blindsided when the AG's office clarified that only the State Legislature can regulate firearms in NH — leaving students, educators, and police in a confusing and risky situation." },
    ],
  },
  {
    id: 'q6',
    prompt: "Over the last decade, NH's gun death rate has:",
    answers: [
      { text: 'Stayed roughly flat', correct: false, feedback: "Not flat. It's gone up 57% — driven almost entirely by gun suicides. NH's gun suicide rate had the highest increase in the country from 2013 to 2022. Gun deaths among young people ages 15–34 jumped 26% in just one year." },
      { text: 'Dropped, thanks to safety programs', correct: false, feedback: "Actually the opposite. Gun deaths in NH rose 57% over the last decade. The gun suicide rate had the fastest increase in the nation from 2013–2022. Young people ages 15–34 saw a 26% spike in gun deaths between 2021 and 2022 alone." },
      { text: 'Increased by about 20%', correct: false, feedback: "Higher than that. NH's gun death rate has increased 57% over the last decade — almost all from gun suicides, which saw the largest rate increase in the country from 2013 to 2022." },
      { text: 'Increased by 57%', correct: true, feedback: "Correct — and it's alarming. Almost entirely driven by gun suicides. NH had the fastest-growing gun suicide rate in the country (2013–2022). Deaths among people ages 15–34 jumped 26% between 2021 and 2022 alone." },
    ],
  },
];

export const BOTTOM_LINE = [
  { stat: '87%', label: 'of NH gun deaths are suicides' },
  { stat: '141 vs 118', label: 'gun deaths per year vs. traffic deaths in NH' },
  { stat: '84%', label: 'of NH residents support background checks — gun owners included' },
  { stat: '75%', label: 'support protective orders for people in crisis' },
  { stat: '66%', label: 'support waiting periods between purchase and possession' },
  { stat: '+57%', label: "NH's gun death rate over a decade — fastest-growing gun suicide rate in the country" },
  { stat: '2025', label: 'NH lawmakers voted down the background check bill anyway' },
];

export const TIERS = [
  { min: 6, heading: 'Perfect score.', body: "You're already in the know. You clearly follow this issue closely. The facts are stark, and now you can share them. Most Granite Staters support action — the gap is between public opinion and political will." },
  { min: 4, heading: 'Solid. You know more than most.', body: "You've got the big picture. A few of these facts are hard to find in the news — which is part of the problem." },
  { min: 2, heading: 'Some surprises, right?', body: "These numbers don't make the front page — but they should. The good news: now you know them, and so can the people you talk to." },
  { min: 0, heading: "Eye-opening, wasn't it?", body: "Don't feel bad — most of these facts are buried. That's exactly why this quiz exists. Share it and change that." },
];

export function tierFor(score) {
  return TIERS.find(t => score >= t.min);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildDeck() {
  return QUESTIONS.map(q => ({ ...q, answers: shuffle(q.answers) }));
}

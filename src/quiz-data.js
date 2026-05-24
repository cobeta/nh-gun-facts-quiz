export const QUESTIONS = [
  {
    id: 'q1',
    prompt: "About 1 in 3 American homes with children have a gun. Of those, what percentage store it locked and unloaded, the way experts recommend?",
    answers: [
      {
        text: 'About 75%',
        correct: false,
        feedback: "Only 44% of gun-owning households with kids follow the safest storage practices. In NH, where about 41% of adults live in homes with firearms, that gap represents a lot of kids.",
        source: { label: 'Miller & Azrael, JAMA Network Open, 2022', url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2789269' },
      },
      {
        text: 'About 55%',
        correct: false,
        feedback: "Close, but lower. Only 44% store all guns locked and unloaded. The majority of gun-owning homes with kids don't follow the safest practices.",
        source: { label: 'Miller & Azrael, JAMA Network Open, 2022', url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2789269' },
      },
      {
        text: 'About 44%',
        correct: true,
        feedback: "Correct, and it surprises most people. Only 44% of gun-owning households with children store firearms locked and unloaded. The majority don't. In NH, where about 41% of adults live in homes with guns, that math adds up fast.",
        source: { label: 'Miller & Azrael, JAMA Network Open, 2022', url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2789269' },
      },
      {
        text: 'Almost all of them',
        correct: false,
        feedback: "Far from it. Only 44% of gun-owning households with kids store all guns locked and unloaded. Most don't follow the safest storage practices.",
        source: { label: 'Miller & Azrael, JAMA Network Open, 2022', url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2789269' },
      },
    ]
  },
  {
    id: 'q2',
    prompt: "A parent says: 'My child has no idea where the gun is.' According to researchers who then asked the children separately, how often was the parent wrong?",
    answers: [
      {
        text: "Almost never",
        correct: false,
        feedback: "Parents were wrong far more often than they thought. 39% of parents who believed their child didn't know where the gun was stored were contradicted by their own child.",
        source: { label: 'Baxley & Miller (2006), Arch Pediatr Adolesc Med', url: 'https://pubmed.ncbi.nlm.nih.gov/16651499/' },
      },
      {
        text: "About 25% of the time",
        correct: false,
        feedback: "Even more often than that. 39% of parents who thought their child didn't know where the gun was were contradicted by their own child. Kids under 10 were just as likely to know as teenagers.",
        source: { label: 'Baxley & Miller (2006), Arch Pediatr Adolesc Med', url: 'https://pubmed.ncbi.nlm.nih.gov/16651499/' },
      },
      {
        text: "About 40% of the time",
        correct: true,
        feedback: "Correct. 39% of parents who believed their child didn't know where the gun was stored were contradicted by their own child. The gun wasn't hidden as well as they thought, and kids under 10 were just as likely to know as teenagers.",
        source: { label: 'Baxley & Miller (2006), Arch Pediatr Adolesc Med', url: 'https://pubmed.ncbi.nlm.nih.gov/16651499/' },
      },
    ]
  },
  {
    id: 'q3',
    promptIntro: "A study asked both gun-owning and non-gun-owning parents whether it's appropriate to ask about unlocked firearms before letting their child visit another home.",
    prompt: "What percentage said it was okay to ask?",
    answers: [
      {
        text: "About 15%",
        correct: false,
        feedback: "Far more than that. 85% said it's appropriate, and gun-owning parents agreed at nearly the same rate (84%). But only about 30% of parents ever actually have the conversation.",
        source: { label: 'Simonetti et al. (2025), J Pediatrics & Child Health; Haasz et al. (2025), Pediatrics', url: 'https://doi.org/10.1016/j.jpedcp.2025.200174' },
      },
      {
        text: "About 40%",
        correct: false,
        feedback: "Much higher. 85% of parents, including 84% of gun owners, said asking is appropriate. The real surprise: only about 30% ever actually do it.",
        source: { label: 'Simonetti et al. (2025), J Pediatrics & Child Health; Haasz et al. (2025), Pediatrics', url: 'https://doi.org/10.1016/j.jpedcp.2025.200174' },
      },
      {
        text: "About 60%",
        correct: false,
        feedback: "Even higher. 85% said it's appropriate, and gun-owning parents agreed at nearly the same rate (84%). Yet only about 30% of parents report ever asking.",
        source: { label: 'Simonetti et al. (2025), J Pediatrics & Child Health; Haasz et al. (2025), Pediatrics', url: 'https://doi.org/10.1016/j.jpedcp.2025.200174' },
      },
      {
        text: "About 85%",
        correct: true,
        feedback: "Correct. 85% said it's appropriate, and gun-owning parents agreed at nearly the same rate (84%). But another study found only about 30% of parents ever actually have the conversation.",
        source: { label: 'Simonetti et al. (2025), J Pediatrics & Child Health; Haasz et al. (2025), Pediatrics', url: 'https://doi.org/10.1016/j.jpedcp.2025.200174' },
      },
    ]
  },
  {
    id: 'q4',
    prompt: "You inherit or find a gun you don't want in your home. What's the safest way to get rid of it?",
    answers: [
      {
        text: 'Drop it in a metal recycling bin',
        correct: false,
        feedback: [
          { bold: false, text: "The safest option is to talk to the local police. Two things to know: " },
          { bold: true, text: "call the non-emergency line" },
          { bold: false, text: " to arrange it first, and " },
          { bold: true, text: "don't just walk in carrying a firearm." },
          { bold: false, text: " They'll take it for destruction or point you to the nearest agency that will." },
        ],
        source: { label: '* As verified with local police departments in the area.' },
      },
      {
        text: 'Throw it out with the trash',
        correct: false,
        feedback: [
          { bold: false, text: "The safest option is to talk to the local police. Two things to know: " },
          { bold: true, text: "call the non-emergency line" },
          { bold: false, text: " to arrange it first, and " },
          { bold: true, text: "don't just walk in carrying a firearm." },
          { bold: false, text: " They'll take it for destruction or point you to the nearest agency that will." },
        ],
        source: { label: '* As verified with local police departments in the area.' },
      },
      {
        text: "Talk to the local police",
        correct: true,
        feedback: [
          { bold: false, text: "Correct. Two things to know: " },
          { bold: true, text: "call the non-emergency line" },
          { bold: false, text: " to arrange it first, and " },
          { bold: true, text: "don't just walk in carrying a firearm." },
          { bold: false, text: " They'll take it for destruction or point you to the nearest agency that will." },
        ],
        source: { label: '* As verified with local police departments in the area.' },
      },
      {
        text: 'Bury it somewhere safe',
        correct: false,
        feedback: [
          { bold: false, text: "The safest option is to talk to the local police. Two things to know: " },
          { bold: true, text: "call the non-emergency line" },
          { bold: false, text: " to arrange it first, and " },
          { bold: true, text: "don't just walk in carrying a firearm." },
          { bold: false, text: " They'll take it for destruction or point you to the nearest agency that will." },
        ],
        source: { label: '* As verified with local police departments in the area.' },
      },
    ]
  },
];

export const BOTTOM_LINE = [
  { stat: '1 in 3', label: 'US homes with children have at least one gun' },
  { stat: '44%', label: 'of gun-owning households with children store all guns locked and unloaded' },
  { stat: '76%', label: 'of kids in gun-owning homes know where the gun is stored' },
  { stat: '4.6M', label: 'children in the US live with a loaded, unlocked gun' },
  { stat: '~20%', label: "of unintentional child gun deaths happen at a friend's home" },
  { stat: '8/day', label: 'children in the US are unintentionally injured or killed by improperly stored guns' },
  // Index [6] is the verdict stat — used in the dark green "verdict" block
  { stat: '85%', label: 'of parents, including gun owners, say it\'s appropriate to ask about firearms before a playdate' },
];

export const TIERS = [
  {
    min: 4,
    heading: 'You knew all four.',
    body: "You're ahead of most parents. These stats don't make headlines, but they matter every time your kid walks into someone else's house."
  },
  {
    min: 3,
    heading: 'Mostly there.',
    body: "A couple of these facts catch most people off guard, especially the one about kids knowing where guns are hidden."
  },
  {
    min: 1,
    heading: 'Some surprises in there.',
    body: "You're not alone. Most parents have never thought through these numbers. That's exactly why this quiz exists."
  },
  {
    min: 0,
    heading: 'Eye-opening, right?',
    body: "Don't feel bad. These facts are buried. Now you know them, and so can the people you share this with."
  },
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

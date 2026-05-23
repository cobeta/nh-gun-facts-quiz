export const QUESTIONS = [
  {
    id: 'q1',
    prompt: "About 1 in 3 American homes with children have a gun. Of those, what percentage store it both locked and unloaded — the way experts recommend?",
    answers: [
      {
        text: 'About 75%',
        correct: false,
        feedback: "Only about 35% of gun-owning households with kids store firearms both locked and unloaded. In NH, where about 41% of adults live in homes with firearms, that gap represents a lot of kids.",
        source: { label: 'Miller et al., JAMA Network Open, 2026', url: 'https://jamanetwork.com/journals/jamanetworkopen' },
      },
      {
        text: 'About 55%',
        correct: false,
        feedback: "Higher than you'd expect, but still lower. About 35% store guns both locked and unloaded — the rest use only one precaution, or neither.",
        source: { label: 'Miller et al., JAMA Network Open, 2026', url: 'https://jamanetwork.com/journals/jamanetworkopen' },
      },
      {
        text: 'About 35%',
        correct: true,
        feedback: "Correct — and it surprises most people. Only about 35% of gun-owning parents store firearms both locked and unloaded. Another 21% store them unlocked and loaded. In NH, where about 41% of adults live in homes with guns, that math adds up fast.",
        source: { label: 'Miller et al., JAMA Network Open, 2026', url: 'https://jamanetwork.com/journals/jamanetworkopen' },
      },
      {
        text: 'Almost all of them',
        correct: false,
        feedback: "Far from it. Only about 35% of gun-owning households with kids store all guns both locked and unloaded. About 1 in 5 store them unlocked and loaded.",
        source: { label: 'Miller et al., JAMA Network Open, 2026', url: 'https://jamanetwork.com/journals/jamanetworkopen' },
      },
    ]
  },
  {
    id: 'q2',
    prompt: "A parent says 'don't worry, the gun is hidden.' Researchers asked kids ages 5–14 whose parents said the same thing. What did they find?",
    answers: [
      {
        text: "Kids had no idea where it was",
        correct: false,
        feedback: "Actually, 75% of kids in gun-owning homes know where the gun is stored — even when parents think it's hidden. And 22% of parents didn't know their child had already handled it.",
        source: { label: 'Baxley & Miller (2006), Pediatrics', url: 'https://today.uconn.edu/2024/03/storing-firearms-at-home-what-uconn-experts-say/' },
      },
      {
        text: "About 1 in 4 kids knew",
        correct: false,
        feedback: "Much higher than that. 75% of kids know where the gun is, even when parents think it's out of reach. Nearly a quarter of parents didn't know their child had already handled it.",
        source: { label: 'Baxley & Miller (2006), Pediatrics', url: 'https://today.uconn.edu/2024/03/storing-firearms-at-home-what-uconn-experts-say/' },
      },
      {
        text: "About half knew",
        correct: false,
        feedback: "Even higher. Researchers found that 75% of kids in gun-owning homes know where the gun is stored. And 22% of parents didn't know their child had already handled it.",
        source: { label: 'Baxley & Miller (2006), Pediatrics', url: 'https://today.uconn.edu/2024/03/storing-firearms-at-home-what-uconn-experts-say/' },
      },
      {
        text: "About 3 in 4 kids knew",
        correct: true,
        feedback: "Correct. 75% of kids in gun-owning homes know where the gun is — even when parents believe it's safely hidden. And 22% of parents were unaware that their child had already handled it. Kids are better at finding things than we think.",
        source: { label: 'Baxley & Miller (2006), Pediatrics', url: 'https://today.uconn.edu/2024/03/storing-firearms-at-home-what-uconn-experts-say/' },
      },
    ]
  },
  {
    id: 'q3',
    prompt: "Before a playdate, parents ask about allergies, pets, and supervision. How many ask 'is there an unlocked gun in your home?'",
    answers: [
      {
        text: "Most parents ask",
        correct: false,
        feedback: "The opposite is true. More than 60% of parents have never asked. Nearly 20% of unintentional firearm deaths in children happen at a friend's home — not their own.",
        source: { label: 'Garbutt et al., Pediatrics, 2024', url: 'https://publications.aap.org/pediatrics/article-abstract/154/6/e2024068061' },
      },
      {
        text: "About half ask",
        correct: false,
        feedback: "Far fewer. More than 60% of parents have never asked about guns before a playdate. Most said it simply never occurred to them.",
        source: { label: 'Garbutt et al., Pediatrics, 2024', url: 'https://publications.aap.org/pediatrics/article-abstract/154/6/e2024068061' },
      },
      {
        text: "About 2 in 3 ask",
        correct: false,
        feedback: "Actually far fewer. More than 60% have never asked — meaning fewer than 4 in 10 ever have. Most parents say it just didn't occur to them.",
        source: { label: 'Garbutt et al., Pediatrics, 2024', url: 'https://publications.aap.org/pediatrics/article-abstract/154/6/e2024068061' },
      },
      {
        text: "Fewer than 4 in 10",
        correct: true,
        feedback: "Correct. More than 60% of parents have never asked. Nearly 20% of unintentional firearm deaths in children happen at a friend's home. Most parents say it simply never occurred to them to ask.",
        source: { label: 'Garbutt et al., Pediatrics, 2024', url: 'https://publications.aap.org/pediatrics/article-abstract/154/6/e2024068061' },
      },
    ]
  },
  {
    id: 'q4',
    prompt: "You or a family member have a gun you no longer want. What's the safest way to get rid of it?",
    answers: [
      {
        text: 'Leave it at a gun shop',
        correct: false,
        feedback: "Gun shops aren't required to accept unwanted firearms. The safest and easiest option is to call your local police non-emergency line — they can arrange a no-questions-asked surrender.",
        source: { label: 'NH Dept. of Safety', url: 'https://www.nh.gov/safety/divisions/nhsp/' },
      },
      {
        text: 'Give it to a friend or neighbor',
        correct: false,
        feedback: "Transferring a gun informally can create legal risk and puts the new owner in an unvetted situation. The safest option is calling your local police non-emergency line for a safe surrender.",
        source: { label: 'NH Dept. of Safety', url: 'https://www.nh.gov/safety/divisions/nhsp/' },
      },
      {
        text: 'Call the police non-emergency line',
        correct: true,
        feedback: "Correct. NH police departments accept unwanted firearms through their non-emergency line — no questions asked. It's the safest, easiest, and completely legal way to get rid of a gun you no longer want.",
        source: { label: 'NH Dept. of Safety', url: 'https://www.nh.gov/safety/divisions/nhsp/' },
      },
      {
        text: 'Disassemble it and throw it away',
        correct: false,
        feedback: "Disposing of a firearm in the trash is unsafe and may be illegal. The right call — literally — is your local police non-emergency line. They accept unwanted guns, no questions asked.",
        source: { label: 'NH Dept. of Safety', url: 'https://www.nh.gov/safety/divisions/nhsp/' },
      },
    ]
  },
];

export const BOTTOM_LINE = [
  { stat: '1 in 3', label: 'US homes with children have at least one gun' },
  { stat: '35%', label: 'of gun-owning parents store firearms both locked and unloaded' },
  { stat: '75%', label: 'of kids in gun-owning homes know where the gun is stored' },
  { stat: '4.6M', label: 'children in the US live with a loaded, unlocked gun' },
  { stat: '~20%', label: "of unintentional child gun deaths happen at a friend's home" },
  { stat: '8/day', label: 'children in the US are unintentionally injured or killed by improperly stored guns' },
  // Index [6] is the verdict stat — used in the dark green "verdict" block
  { stat: 'Most', label: 'gun-owning parents say they would not mind being asked about storage before a playdate' },
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
    body: "A couple of these facts catch most people off guard — especially the one about kids knowing where guns are hidden."
  },
  {
    min: 1,
    heading: 'Some surprises in there.',
    body: "You're not alone — most parents have never thought through these numbers. That's exactly why this quiz exists."
  },
  {
    min: 0,
    heading: 'Eye-opening, right?',
    body: "Don't feel bad. These facts are buried. Now you know them — and so can the people you share this with."
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

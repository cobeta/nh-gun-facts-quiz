# Safe Storage Quiz — Implementation Spec

## Overview

Replace the current NH Gun Facts political quiz with a new **Safe Storage quiz** that is:
- Fully non-political
- Aimed at parents and caregivers (gun owners and non-owners alike)
- Designed to expose knowledge gaps, then empower action
- A hook to drive traffic to besmartforkids.org

**Format:** 3 questions · results page with reveal moment

---

## Files to Change

| File | Changes |
|------|---------|
| `quiz-data.js` | Replace `QUESTIONS`, `TIERS`, `BOTTOM_LINE` arrays |
| `App.jsx` | Update results page copy and verdict block |

---

## `quiz-data.js` — Full Replacement

### QUESTIONS Array

Replace the existing 6-question `QUESTIONS` array with these 3:

---

#### Q1 — Storage Reality Check

```js
{
  id: 'q1',
  prompt: "About 1 in 3 American homes with children have a gun. Of those, what percentage store it locked and unloaded — the way experts recommend?",
  answers: [
    {
      text: 'About 75%',
      correct: false,
      feedback: "Only 44% of gun-owning households with kids follow the safest storage practices. In NH, where about 41% of adults live in homes with firearms, that gap represents a lot of kids."
    },
    {
      text: 'About 55%',
      correct: false,
      feedback: "Close, but lower. Only 44% store all guns locked and unloaded. The majority of gun-owning homes with kids don't follow the safest practices."
    },
    {
      text: 'About 44%',
      correct: true,
      feedback: "Correct — and it surprises most people. Only 44% of gun-owning households with children store firearms locked and unloaded. The majority don't. In NH, where about 41% of adults live in homes with guns, that math adds up fast."
    },
    {
      text: 'Almost all of them',
      correct: false,
      feedback: "Far from it. Only 44% of gun-owning households with kids store all guns locked and unloaded. Most don't follow the safest storage practices."
    },
  ]
}
```

**Source:** Johns Hopkins Bloomberg School of Public Health (2018) — https://publichealth.jhu.edu/2018/survey-more-than-half-of-u-s-gun-owners-do-not-safely-store-their-guns

---

#### Q2 — The Hidden Gun Problem

```js
{
  id: 'q2',
  prompt: "A parent says 'don't worry, the gun is hidden.' Researchers asked kids ages 5–14 whose parents said the same thing. What did they find?",
  answers: [
    {
      text: "Kids had no idea where it was",
      correct: false,
      feedback: "Actually, 75% of kids in gun-owning homes know where the gun is stored — even when parents think it's hidden. And 22% of parents didn't know their child had already handled it."
    },
    {
      text: "About 1 in 4 kids knew",
      correct: false,
      feedback: "Much higher than that. 75% of kids know where the gun is, even when parents think it's out of reach. Nearly a quarter of parents didn't know their child had already handled it."
    },
    {
      text: "About half knew",
      correct: false,
      feedback: "Even higher. Researchers found that 75% of kids in gun-owning homes know where the gun is stored. And 22% of parents didn't know their child had already handled it."
    },
    {
      text: "About 3 in 4 kids knew",
      correct: true,
      feedback: "Correct. 75% of kids in gun-owning homes know where the gun is — even when parents believe it's safely hidden. And 22% of parents were unaware that their child had already handled it. Kids are better at finding things than we think."
    },
  ]
}
```

**Source:** UConn ARMS Center (2024) — https://today.uconn.edu/2024/03/storing-firearms-at-home-what-uconn-experts-say/
Original study: Baxley & Miller (2006) — https://pubmed.ncbi.nlm.nih.gov/16651499/

---

#### Q3 — The Question Parents Don't Ask

```js
{
  id: 'q3',
  prompt: "Before a playdate, parents ask about allergies, pets, and supervision. How many ask 'is there an unlocked gun in your home?'",
  answers: [
    {
      text: "Most parents ask",
      correct: false,
      feedback: "The opposite is true. More than 60% of parents have never asked. Nearly 20% of unintentional firearm deaths in children happen at a friend's home — not their own."
    },
    {
      text: "About half ask",
      correct: false,
      feedback: "Far fewer. More than 60% of parents have never asked about guns before a playdate. Most said it simply never occurred to them."
    },
    {
      text: "About 1 in 3 ask",
      correct: false,
      feedback: "Even lower. More than 60% have never asked — meaning fewer than 4 in 10 ever have. Most parents say it just didn't occur to them."
    },
    {
      text: "Fewer than 4 in 10",
      correct: true,
      feedback: "Correct. More than 60% of parents have never asked. Nearly 20% of unintentional firearm deaths in children happen at a friend's home. Most parents say it simply never occurred to them to ask."
    },
  ]
}
```

**Source:** Lurie Children's Hospital / Pediatrics (2024) — https://publications.aap.org/pediatrics/article-abstract/154/6/e2024068061
Also: Seattle Children's Hospital — https://www.seattlechildrens.org/healthy-tides/guns-stored-safely/

---

### BOTTOM_LINE Array

Replace the existing `BOTTOM_LINE` with these stats (used in the results grid):

```js
export const BOTTOM_LINE = [
  { stat: '1 in 3', label: 'US homes with children have at least one gun' },
  { stat: '44%', label: 'of those households store all guns locked and unloaded' },
  { stat: '75%', label: 'of kids in gun-owning homes know where the gun is stored' },
  { stat: '4.6M', label: 'children in the US live with a loaded, unlocked gun' },
  { stat: '~20%', label: 'of unintentional child gun deaths happen at a friend\'s home' },
  { stat: '8/day', label: 'children in the US are unintentionally injured or killed by improperly stored guns' },
  // Index [6] is the verdict stat — used in the dark green "verdict" block
  { stat: '93%', label: 'of gun-owning parents are comfortable being asked about storage' },
];
```

**Sources:**
- 4.6M stat: National Firearm Survey (2021) via https://agreetoagree.org/conversation-guides/guns-in-the-home
- 8/day stat: https://www.seattlechildrens.org/healthy-tides/guns-stored-safely/
- 93% stat: https://www.seattlechildrens.org/healthy-tides/guns-stored-safely/

---

### TIERS Array

Replace with:

```js
export const TIERS = [
  {
    min: 3,
    heading: 'You knew all three.',
    body: "You're ahead of most parents. These stats don't make headlines, but they matter every time your kid walks into someone else's house."
  },
  {
    min: 2,
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
```

---

## `App.jsx` — Results Page Changes

### 1. Verdict Block (dark green panel)

Replace the existing verdict block copy with:

```jsx
<div className="results-verdict-eyebrow">What might surprise you most</div>
<div className="results-verdict-stat">93%</div>
<div className="results-verdict-text">
  <strong>Feel awkward asking about guns before a playdate?</strong>{' '}
  Most gun-owning parents actually want you to ask. 93% say they'd be
  comfortable — even welcome — the question. The awkwardness is mostly in
  your head. The conversation is easier than you think.
</div>
```

### 2. Verdict Eyebrow Label

Change `"What lawmakers did about it"` → `"What might surprise you most"`

### 3. SMART Section

Keep the Be SMART section exactly as-is. It's a perfect CTA fit.

### 4. Be SMART CTA block — update subtitle copy

The existing subtitle in `results-besmart-cta-sub` currently reads:

> "Be SMART is a national program helping parents and caregivers reduce child gun deaths through secure storage."

Replace with:

> "Be SMART is a national program helping parents and caregivers reduce child gun deaths through secure storage. They also have ready-to-use conversation starters for talking to other parents — so you don't have to figure out the words yourself."

### 5. Add a third CTA link inside `results-besmart-cta-links`

After the existing two links (`besmartforkids.org` and `Community resources`), add:

```jsx
<a
  className="results-besmart-cta-secondary"
  href="https://besmartforkids.org/secure-gun-storage/resources/"
  target="_blank"
  rel="noopener noreferrer"
>
  Conversation starters ↗
</a>
```

This points to the Be SMART resources page, which includes:
- A dedicated guide on asking other parents about guns before playdates (with example scripts)
- The "SMART Conversations" video series showing real examples of how to have the conversation
- Storage device guides, warning sign resources, and more

### 6. Featured PDFs

Keep the existing `FEATURED_PDFS` array as-is — all three PDFs are relevant.

### 5. Welcome Screen

Update the tagline and headline in `WelcomeScreen`:

```jsx
// Eyebrow (currently "Six questions · Two minutes")
"Three questions · Two minutes"

// Display headline (currently "What do you actually know about guns in NH?")
"What do you actually know about guns in your kids' world?"

// Subtext / CTA label stays the same
```

---

## What Does NOT Change

- All visual design, colors, animations, layout
- Progress bar (will show 3 pips instead of 6)
- Answer button component
- Welcome screen structure
- Results screen structure
- Be SMART section
- PDF resource links
- Share functionality
- `buildDeck()` and `shuffle()` functions

---

## Sources Summary

| Fact | Source |
|------|--------|
| 44% safe storage | https://publichealth.jhu.edu/2018/survey-more-than-half-of-u-s-gun-owners-do-not-safely-store-their-guns |
| 41% NH gun ownership | https://www.cbsnews.com/pictures/gun-ownership-rates-by-state/ |
| 75% of kids know | https://today.uconn.edu/2024/03/storing-firearms-at-home-what-uconn-experts-say/ |
| 60%+ never asked | https://publications.aap.org/pediatrics/article-abstract/154/6/e2024068061 |
| 20% at friend's home | https://www.scientificamerican.com/article/how-to-tactfully-ask-your-childs-friends-parents-if-they-have-guns-at-home/ |
| 4.6M kids, loaded unlocked | https://agreetoagree.org/conversation-guides/guns-in-the-home |
| 8 kids/day | https://www.seattlechildrens.org/healthy-tides/guns-stored-safely/ |
| 93% comfortable being asked | https://www.seattlechildrens.org/healthy-tides/guns-stored-safely/ |

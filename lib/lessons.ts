export type Lesson = {
  id: string;
  title: string;
  content: string;
  showTips?: boolean;
};

export type Section = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Level = {
  id: string;
  title: string;
  sections: Section[];
};

// ==========================================
// 🟢 BEGINNER LEVEL (20 Lessons)
// ==========================================
const beginnerSections: Section[] = [
  {
    id: "home-row",
    title: "1️⃣ Home Row",
    lessons: [
      {
        id: "1",
        title: "A S D F Introduction",
        content: "asdf fads sad dfas\nsafd adsf afsd sdaf\nsad asdf fads safd\ndfas adsf afsd asdf",
        showTips: true,
      },
      {
        id: "2",
        title: "; L K J Introduction",
        content: ";lkj jkl; lkj; kjl;\n;jlk ljk; k;jl ;jkl\njkl; lkj; kjl; ;lkj\nljk; ;jlk k;jl jkl;",
      },
      {
        id: "3",
        title: "Full Home Row Combination",
        content: "asdfg ;lkjh dash flag\nglass half ask glad\nflash gash hall slag\nflag dash glad half",
      },
      {
        id: "4",
        title: "Home Row Flow (Final)",
        content: "sad flag hall glass\nflash glad ask half\nslag dash fall glad\nhall flask sad gash\nflag glass dash hall",
      },
    ],
  },
  {
    id: "top-row",
    title: "2️⃣ Top Row",
    lessons: [
      {
        id: "1",
        title: "Q W E R Introduction",
        content: "qwer rewq werq qrew\nrweq were rare ewer\nrewq qwer rweq werq\nrare ewer qrew rewq",
        showTips: true,
      },
      {
        id: "2",
        title: "P O I U Introduction",
        content: "poiu iuop opui uipo\npiou pour loop poor\niuop poiu uipo opui\npoor pour piou iuop",
      },
      {
        id: "3",
        title: "Full Top Row Combination",
        content: "qwert poiuy write your\npower quit quiet type\nroute your query port\ntype worry your power",
      },
      {
        id: "4",
        title: "Top Row Flow Mixed Patterns",
        content: "quiet power write query\ntype quickly report work\nroute your worry type\npower your quick route\nquery write work worry",
      },
      {
        id: "5",
        title: "Top + Home Row Words (Final)",
        content: "water write trade heart\npower great where there\nafter share tall water\nheart trade where power\ngreat after there share",
      },
    ],
  },
  {
    id: "bottom-row",
    title: "3️⃣ Bottom Row",
    lessons: [
      {
        id: "1",
        title: "Z X C V Introduction",
        content: "zxcv vxcz cxvz zvxc\nxcvz vex zax zvxc\nvxcz zxcv xcvz cxvz\nzax vex zvxc vxcz",
        showTips: true,
      },
      {
        id: "2",
        title: "/ . , M Introduction",
        content: "/.,m m,./ .,m/ ,m/.\nm/,., ./m, ,./m\nm,./ /.,m ,m/. ./m,",
      },
      {
        id: "3",
        title: "Full Bottom Row Combination",
        content: "zxcvb /.,mn zoom cabin\nmix zone ban box\nvex man cab mix\nzone cabin max zoom",
      },
      {
        id: "4",
        title: "Bottom Row Flow Mixed Patterns",
        content: "calm box van zoom\nmix zone cabin maze\nzoom cabin calm van\nmaze mix box van\ncabin zoom calm mix",
      },
      {
        id: "5",
        title: "Full Keyboard Simple Words (Final)",
        content: "zebra combine random brave\ncomplex number vortex moment\nbroken maximize random zebra\nvortex combine brave number\nmoment complex broken maximize",
      },
    ],
  },
  {
    id: "simple-words",
    title: "4️⃣ Simple Words",
    lessons: [
      {
        id: "1",
        title: "Short Common Words",
        content: "cat dog run sun hat map\nsit cup pen red top bed\nfan box car zip man win\nrun hat dog cat bed sun\nmap sit pen fan car zip\nwin top cup red man box",
      },
      {
        id: "2",
        title: "Medium Length Words",
        content: "happy water table chair\ngreen quick light brown\nstrong better smooth bright\nwater chair happy quick\nlight strong green better\nbrown smooth bright table",
      },
    ],
  },
  {
    id: "short-sentences",
    title: "5️⃣ Short Sentences",
    lessons: [
      {
        id: "1",
        title: "Basic Sentences",
        content: "the sun is bright today\ni like to read books\nwe play in the park\nthe sun is bright today\nwe play in the park\ni like to read books\nlearning to type takes practice\nfocus on the keys while typing\nlearning to type takes practice\nfocus on the keys while typing",
      },
      {
        id: "2",
        title: "Slightly Longer Sentences",
        content: "typing is a useful skill for work\npractice every day to improve speed\nstay calm and type with focus\npractice every day to improve speed\ntyping is a useful skill for work\nstay calm and type with focus\nconsistent effort builds typing strength\nconsistent effort builds typing strength",
      },
      {
        id: "3",
        title: "Beginner Final Challenge",
        content: "consistent practice builds strong typing habits\naccuracy is more important than speed\nfocus on control before increasing pace\naccuracy is more important than speed\nfocus on control before increasing pace\nconsistent practice builds strong typing habits",
      },
    ],
  },
  {
    id: "beginner-review",
    title: "6️⃣ Beginner Review",
    lessons: [
      {
        id: "1",
        title: "Final Integrated Practice",
        content: "future motion system design\nsilver market active engine\nfocus improves steady typing control\nplanet basic system silver\nsteady practice builds mental focus\ndesign engine market future\nsmall effort creates better control\nactive motion planet silver\npractice improves steady control\nfuture system design active\nsmall effort creates better control",
      },
    ],
  },
];

// ==========================================
// 🟡 INTERMEDIATE LEVEL (14 Lessons)
// ==========================================
const intermediateSections: Section[] = [
  {
    id: "capital-letters",
    title: "1️⃣ Capital Letters",
    lessons: [
      {
        id: "1",
        title: "Shift Key Control",
        content: "Apple Banana Cherry Denmark Elephant France Germany\nHello India Japan Kangaroo London Mexico Norway\nParis Queen Russia Spain Turkey Utah Venice\nXerox Yield Zebra Alpha Bravo Charlie Delta",
      },
      {
        id: "2",
        title: "Proper Nouns & Sentence Starts",
        content: "Mr. Smith went to Washington on Tuesday.\nI saw John in London last January.\nParis is beautiful during the mild spring.\nThe Microsoft team arrived early on Monday.\nMaria and David visited Central Park.",
      },
      {
        id: "3",
        title: "Mixed Capital Paragraph",
        content: "The North American team finished their project early. Sarah, the project manager, thanked Dave and Alice for their hard work. Apple and Google both released new products in September. Mr. Anderson was pleased with the third quarter results.",
      },
    ],
  },
  {
    id: "punctuation",
    title: "2️⃣ Punctuation",
    lessons: [
      {
        id: "1",
        title: "Period & Comma Practice",
        content: "cats, dogs, and birds are common pets.\nhe sat, ate, and left the building.\nthe quick, brown fox jumps.\na small, quiet, and peaceful town.\nrun, jump, and play all day.",
      },
      {
        id: "2",
        title: "Question Marks & Exclamation",
        content: "Where are you going? I don't know!\nStop doing that right now! Why?\nHow did you finish so fast? Amazing!\nAre we there yet? No, sit down!\nWhat is the meaning of this? Unbelievable!",
      },
      {
        id: "3",
        title: "Fully Mixed Punctuation Paragraph",
        content: "Hello, how are you today? I'm doing great, thanks for asking! Did you see the new movie? No, I haven't seen it yet. I really want to go, but I'm busy. Let's try to go next week!",
      },
    ],
  },
  {
    id: "word-flow",
    title: "3️⃣ Word Flow",
    lessons: [
      {
        id: "1",
        title: "Medium Word Rhythm Drill",
        content: "because problem nothing another company\nsystem through public without consider\nhowever program country service during\nbecause consider public without another",
      },
      {
        id: "2",
        title: "Multi-word Flow Transitions",
        content: "would you like to go there tonight\nthis is something we need to do\nthere are many people here today\nshe will come back after the show",
      },
    ],
  },
  {
    id: "medium-paragraph",
    title: "4️⃣ Medium Paragraph",
    lessons: [
      {
        id: "1",
        title: "Structured 3–4 Sentence Paragraph",
        content: "The morning sun broke through the clouds, warming the cold earth. Birds began to sing their morning songs from the high branches. A gentle breeze moved through the tall grass, signaling the start of a clear, beautiful day.",
      },
      {
        id: "2",
        title: "Extended Controlled Paragraph",
        content: "Learning to type well requires both patience and practice. While speed is often the goal, accuracy must be mastered first. Pushing yourself too hard can create bad habits that are hard to break. Keep your posture straight, your wrists relaxed, and focus on hitting the right keys every single time.",
      },
    ],
  },
  {
    id: "rhythm-practice",
    title: "5️⃣ Rhythm Practice",
    lessons: [
      {
        id: "1",
        title: "Consistent Pace Drill",
        content: "steady hands make smooth typing\nfocus on the rhythm not the speed\nbreathe in and keep a steady pace\nfast typing comes from slow typing\nnever rush the keys stay relaxed",
      },
      {
        id: "2",
        title: "Speed-Control Balance Exercise",
        content: "typing fast is good but typing well is better\ndo not sacrifice control for a few extra words\nbreathe out and relax your tense shoulders\na steady consistent pace wins the marathon",
      },
    ],
  },
  {
    id: "accuracy-training",
    title: "6️⃣ Accuracy Training Mode",
    lessons: [
      {
        id: "1",
        title: "Accuracy-Focused Drill",
        content: "precision before velocity always\nevery single keystroke must be intentional\nfeel the keys and know their specific locations\nmaking mistakes slows you down more than typing slowly\ndeliberate practice builds perfect accuracy",
      },
    ],
  },
  {
    id: "speed-training",
    title: "7️⃣ Speed Training Mode",
    lessons: [
      {
        id: "1",
        title: "Controlled Speed Drill",
        content: "move quickly but do not lose your balance\nthe fingers should glide across the keyboard\ntrust your muscle memory and let it take over\nfast fluid motions without any hesitation\npush the limit gently while staying in control",
      },
    ],
  },
];

// ==========================================
// 🔴 ADVANCED LEVEL (12 Lessons)
// ==========================================
const advancedSections: Section[] = [
  {
    id: "numbers-symbols",
    title: "1️⃣ Numbers & Symbols",
    lessons: [
      {
        id: "1",
        title: "Number Row Practice",
        content: "01 23 45 67 89\n120 340 560 780 900\n1984 2001 1066 1776 2024\n09 87 65 43 21\n123 456 789 012",
      },
      {
        id: "2",
        title: "Common Symbols",
        content: "user_name@email.com #hashtag !\nfunction(a, b) { return a + b; }\n100% pure & natural! $45.00\n(this is not a drill) *warning*\n[array_index] | obj.property",
      },
      {
        id: "3",
        title: "Mixed Numeric Sentences",
        content: "Order #4592 will arrive by 10/24.\nContact support at 1-800-555-0199.\nThe total cost is $299.99 (including 8% tax).\nTemperatures rose by 15.4 degrees in 2023.\nShe scored 98% on her final exam.",
      },
    ],
  },
  {
    id: "mixed-case",
    title: "2️⃣ Mixed Case",
    lessons: [
      {
        id: "1",
        title: "Random Capitalization",
        content: "tHiS iS mIxEd cAsE\nJaVaScRiPt iS fUn\nhElLo wOrLd 123\ncAmElCaSe iS oFtEn uSeD\nNoThInG MaKeS SeNsE",
      },
      {
        id: "2",
        title: "Realistic Mixed Formatting",
        content: "ID: AQ_8923-Z. Auth Token: Xk9jL3M.\nUser 'JaneDoe' updated 4 files.\nCommit 9f2a4c: Fix Navbar UI Bug.\nURL: https://api.example.com/v1/users\nENV_VAR=PRODUCTION_KEY_99X",
      },
    ],
  },
  {
    id: "technical-text",
    title: "3️⃣ Technical Text",
    lessons: [
      {
        id: "1",
        title: "Code-Style Text",
        content: "const data = fetch('/api/stats');\nif (data.length > 0) { console.log('OK'); }\nreturn state.filter(x => x.active === true);\n<div className=\"flex flex-col gap-4\">\nimport { useState } from 'react';",
      },
      {
        id: "2",
        title: "Technical Vocabulary Paragraph",
        content: "The asynchronous fetch request returned a highly nested JSON payload. We utilized a mapping function to iterate through the array, extracting specific properties to render in the user interface component. Error handling was implemented via a try-catch block to prevent runtime crashes.",
      },
    ],
  },
  {
    id: "long-paragraph",
    title: "4️⃣ Long Paragraph",
    lessons: [
      {
        id: "1",
        title: "8-10 Line Paragraph",
        content: "The history of computing is a fascinating journey of continuous abstraction. Early programmers physically flipped switches and moved cables to encode instructions. Later, assembly languages provided a slightly more humane interface, allowing humans to write text that corresponded to machine operations. Eventually, high-level languages like C and Java allowed developers to express complex logic without worrying about the hardware. Today, modern frameworks handle routing, state, and rendering invisibly, leaving the developer to focus almost entirely on the user experience and business logic. Each layer of abstraction builds upon the invisible foundation of the layer beneath it.",
      },
      {
        id: "2",
        title: "12-15 Line Paragraph",
        content: "Deep work, the ability to concentrate without distraction on a cognitively demanding task, is an indispensable skill in the modern economy. Open plan offices, constant notification pings, and the expectation of immediate email replies have severely fragmented the attention span of the average professional knowledge worker. However, those who consciously train themselves to resist these shiny distractions and immerse themselves fully in a singular problem stand out. Designing an environment optimized for focus, whether by wearing noise-canceling headphones, blocking distracting websites, or scheduling strict deep work blocks, allows individuals to produce significantly better work in a fraction of the time. The transition from shallow, reactive tasks to proactive, deep engagement acts as a powerful catalyst for both professional growth and personal satisfaction in one's craft.",
      },
    ],
  },
  {
    id: "speed-stability",
    title: "5️⃣ Speed Stability",
    lessons: [
      {
        id: "1",
        title: "Accuracy Under Pressure",
        content: "when the pace increases friction starts\ndo not let the urge to race cause typos\nkeep your wrists relaxed and eyes forward\nthe faster you go the lighter you touch\nsmooth rapid strikes without hesitation",
      },
      {
        id: "2",
        title: "Extended Stability Challenge",
        content: "A consistent rhythm is more valuable than sporadic bursts of speed followed by a cascade of errors. Imagine a metronome ticking steadily in the background. Every keystroke should align perfectly with that invisible beat. Maintain this smooth, unbroken tempo from the very first letter to the very last punctuation mark.",
      },
    ],
  },
  {
    id: "advanced-review",
    title: "6️⃣ Advanced Review",
    lessons: [
      {
        id: "1",
        title: "Full Integrated Advanced Paragraph",
        content: "Welcome to your final challenge! In 2024, ACME Corp (a division of TechGlobal) reported a 34.5% increase in annual recurring revenue. The CEO, Ms. J. K. Anderson, stated: \"Our core focus on user-centric design (UCD) drove our success. We reduced latency by 120ms and optimized 10,000+ db queries.\" Do you think this momentum will continue? By investing $4.5 million in R&D, they expect even greater returns in Q3/Q4. Excellent work completing the advanced tier!",
      },
    ],
  },
];

// ==========================================
// EXPORT LEVELS ARRAY
// ==========================================
export const levels: Level[] = [
  {
    id: "beginner",
    title: "🟢 Level 1 - Beginner",
    sections: beginnerSections,
  },
  {
    id: "intermediate",
    title: "🟡 Level 2 - Intermediate",
    sections: intermediateSections,
  },
  {
    id: "advanced",
    title: "🔴 Level 3 - Advanced",
    sections: advancedSections,
  },
];

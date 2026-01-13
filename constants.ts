import { LessonPlan, SavedLesson, LessonType } from "./types";
import { Anchor, Target, Zap, Lightbulb, Monitor, PlayCircle, Gift, Crosshair } from 'lucide-react';

export const INITIAL_LESSON_PLAN: LessonPlan = {
  meta: {
    grade: '',
    subject: '',
    standard: '',
    topic: '',
    lessonType: 'UNSET' as any,
    objectiveRaw: '',
    previewIdea: ''
  },
  rows: {
    preview: {
      id: 'preview',
      title: 'PREVIEW',
      icon: 'Anchor',
      description: 'Access prior knowledge and/or provide relevance',
      teacherAction: { content: 'Ask a question that connects non-academic experience to the concept.' },
      languageStrategy: { content: '' },
      checkForUnderstanding: { content: '' }
    },
    objective: {
      id: 'objective',
      title: 'LEARNING OBJECTIVE',
      icon: 'Target',
      description: 'Deconstructed standard',
      teacherAction: { content: 'State the objective clearly. Must match Independent Practice.' },
      languageStrategy: { content: '' },
      checkForUnderstanding: { content: '' }
    },
    review: {
      id: 'review',
      title: 'REVIEW',
      icon: 'Zap',
      description: 'Sub-skills necessary for this lesson',
      teacherAction: { content: 'Identify constituent skills needed for this specific lesson.' },
      languageStrategy: { content: '' },
      checkForUnderstanding: { content: '' }
    },
    keyIdeas: {
      id: 'keyIdeas',
      title: 'KEY IDEAS',
      icon: 'Lightbulb',
      description: 'Concept Map, Definitions, Rules, Conditions',
      teacherAction: { content: 'Define "What" it is and "When" to use it. Use a Concept Map.' },
      languageStrategy: { content: 'Include Language Frames.' },
      checkForUnderstanding: { content: '' }
    },
    expertThinking: {
      id: 'expertThinking',
      title: 'EXPERT THINKING',
      icon: 'Monitor',
      description: 'Steps / Concept Map',
      teacherAction: { content: 'Model the thinking process. "I do".' },
      languageStrategy: { content: '' },
      checkForUnderstanding: { content: '' }
    },
    guidedPractice: {
      id: 'guidedPractice',
      title: 'GUIDED PRACTICE',
      icon: 'PlayCircle',
      description: 'Teacher gradually releases control to student',
      teacherAction: { content: 'Do step 1, stop, check. Do step 2, stop, check.' },
      languageStrategy: { content: 'Collaborative Strategies.' },
      checkForUnderstanding: { content: '' }
    },
    closure: {
      id: 'closure',
      title: 'CLOSURE',
      icon: 'Gift',
      description: 'Verbal reiteration of Key Ideas',
      teacherAction: { content: 'Students verbally reiterate the Key Ideas to a partner or class. Verify they can "Speak the Concept".' },
      languageStrategy: { content: '' },
      checkForUnderstanding: { content: '' }
    },
    independentPractice: {
      id: 'independentPractice',
      title: 'INDEPENDENT PRACTICE',
      icon: 'Crosshair',
      description: 'Matches learning objective',
      teacherAction: { content: 'Students work independently. Matches objective exactly.' },
      languageStrategy: { content: '' },
      checkForUnderstanding: { content: '' }
    }
  }
};

export const ICON_MAP: Record<string, any> = {
  Anchor, Target, Zap, Lightbulb, Monitor, PlayCircle, Gift, Crosshair
};

export const DEMO_LESSONS: SavedLesson[] = [
  {
    id: 'demo-1',
    name: 'Math: Division with Remainders',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    plan: {
      ...INITIAL_LESSON_PLAN,
      meta: {
        grade: '5th Grade',
        subject: 'Mathematics',
        standard: 'CCSS.MATH.CONTENT.5.NBT.B.6',
        topic: 'Long Division with Remainders',
        lessonType: LessonType.PROCEDURAL,
        objectiveRaw: 'Students will divide 3-digit dividends by 1-digit divisors with remainders.',
        previewIdea: 'Sharing 50 cookies among 6 friends equally.'
      },
      rows: {
        ...INITIAL_LESSON_PLAN.rows,
        preview: {
          ...INITIAL_LESSON_PLAN.rows.preview,
          teacherAction: { content: 'Imagine you have 50 cookies and 6 friends. If you want everyone to have the exact same amount, how many does each person get? Is there anything left over?' },
          languageStrategy: { content: 'Numbered Heads Together' },
          checkForUnderstanding: { content: 'Thumbs up if you think there will be a "leftover" cookie.' }
        },
        keyIdeas: {
          ...INITIAL_LESSON_PLAN.rows.keyIdeas,
          teacherAction: { content: 'A Remainder is the "leftover" amount when a number cannot be divided into equal whole parts. \nSteps: 1. Divide, 2. Multiply, 3. Subtract, 4. Bring Down, 5. Remainder Check.' },
          languageStrategy: { content: 'Sentence Frame: "The quotient is __ with a remainder of __."' },
          checkForUnderstanding: { content: 'Whiteboard check: Define "Dividend" in your own words.' }
        },
        expertThinking: {
          ...INITIAL_LESSON_PLAN.rows.expertThinking,
          teacherAction: { content: 'Teacher models 145 ÷ 4. "I look at the 1, 4 doesn\'t go into 1. I look at 14. 4 goes into 14 three times. 3 times 4 is 12. 14 minus 12 is 2. I bring down the 5..."' },
          languageStrategy: { content: 'Think-Aloud Protocol' },
          checkForUnderstanding: { content: 'Stop after the first subtraction: "Why did I write a 2 here?"' }
        },
        closure: {
            ...INITIAL_LESSON_PLAN.rows.closure,
            teacherAction: { content: 'Turn & Talk: Explain to your partner what a remainder is and name the 5 steps of the division algorithm. Teacher circulates to listen for accuracy.' },
            languageStrategy: { content: 'Partner Share: "First I ___, then I ___."' },
            checkForUnderstanding: { content: 'Teacher selects 3 students to say the steps aloud.' }
        }
      }
    }
  },
  {
    id: 'demo-2',
    name: 'ELA: Character Perspective',
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    plan: {
      ...INITIAL_LESSON_PLAN,
      meta: {
        grade: '4th Grade',
        subject: 'English Language Arts (ELA)',
        standard: 'CCSS.ELA-LITERACY.RL.4.6',
        topic: 'Point of View and Perspective',
        lessonType: LessonType.DECLARATIVE,
        objectiveRaw: 'Students will compare the points of view of two characters in the same story.',
        previewIdea: 'How a student feels about a surprise test vs. how a teacher feels about it.'
      },
      rows: {
        ...INITIAL_LESSON_PLAN.rows,
        preview: {
          ...INITIAL_LESSON_PLAN.rows.preview,
          teacherAction: { content: 'Suppose I announce a surprise test right now. How do you feel? (Scared/Angry). How do I feel? (Excited to see what you know). Why are our feelings different for the same event?' },
          languageStrategy: { content: 'Think-Pair-Share' },
          checkForUnderstanding: { content: 'Fist-to-Five: How well do you understand why people see things differently?' }
        },
        keyIdeas: {
          ...INITIAL_LESSON_PLAN.rows.keyIdeas,
          teacherAction: { content: 'Perspective is the "lens" through which a character sees the world, shaped by their experiences and roles. Point of View is the narrator\'s position (1st or 3rd person).' },
          languageStrategy: { content: 'Frame: "Character A sees the event as ___ because ___, while Character B sees it as ___."' },
          checkForUnderstanding: { content: 'Quick Write: List two things that shape a person\'s perspective.' }
        },
        closure: {
            ...INITIAL_LESSON_PLAN.rows.closure,
            teacherAction: { content: 'Students stand up and find a partner from across the room. They must verbally explain the difference between Point of View and Perspective using the sentence frames provided.' },
            languageStrategy: { content: 'Stand Up, Hand Up, Pair Up' },
            checkForUnderstanding: { content: 'Listening for the use of "lens" and "narrator" in student explanations.' }
        }
      }
    }
  },
  {
    id: 'demo-3',
    name: 'Science: The Water Cycle',
    timestamp: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
    plan: {
      ...INITIAL_LESSON_PLAN,
      meta: {
        grade: '3rd Grade',
        subject: 'Science (NGSS)',
        standard: 'NGSS 3-ESS2-1',
        topic: 'Stages of the Water Cycle',
        lessonType: LessonType.DECLARATIVE,
        objectiveRaw: 'Students will identify and describe the four main stages of the water cycle.',
        previewIdea: 'Observing a puddle disappear after a rainstorm.'
      },
      rows: {
        ...INITIAL_LESSON_PLAN.rows,
        preview: {
          ...INITIAL_LESSON_PLAN.rows.preview,
          teacherAction: { content: 'Think about a big puddle on the sidewalk after it rains. After the sun comes out, the puddle is gone. Where did that water go? Did it just vanish into nothing?' },
          languageStrategy: { content: 'Choral Response' },
          checkForUnderstanding: { content: 'Point to the sky if you think the water is up there.' }
        },
        keyIdeas: {
          ...INITIAL_LESSON_PLAN.rows.keyIdeas,
          teacherAction: { content: 'The Water Cycle is the continuous movement of water on, above, and below the Earth. \n1. Evaporation (Liquid to Gas), 2. Condensation (Gas to Liquid), 3. Precipitation (Falling), 4. Collection.' },
          languageStrategy: { content: 'Total Physical Response (TPR) gestures for each stage.' },
          checkForUnderstanding: { content: 'Match the term to the definition on the board.' }
        },
        closure: {
            ...INITIAL_LESSON_PLAN.rows.closure,
            teacherAction: { content: 'Without looking at the board, students must name the 4 stages of the water cycle in order to their partner, performing the hand gesture for each.' },
            languageStrategy: { content: 'Partner Recall' },
            checkForUnderstanding: { content: 'Teacher calls out "Evaporation!" and class responds with the definition chorally.' }
        }
      }
    }
  }
];
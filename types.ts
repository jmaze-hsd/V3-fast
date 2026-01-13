export enum LessonType {
  DECLARATIVE = 'DECLARATIVE',
  PROCEDURAL = 'PROCEDURAL',
  UNSET = 'UNSET'
}

export interface LessonContext {
  grade: string;
  subject: string;
  standard: string;
  topic: string;
  lessonType: LessonType;
  objectiveRaw: string;
  previewIdea: string;
}

export interface FrameworkCell {
  content: string;
  isLoading?: boolean;
}

export interface LessonRow {
  id: string;
  title: string;
  icon: string;
  description: string;
  teacherAction: FrameworkCell;
  languageStrategy: FrameworkCell;
  checkForUnderstanding: FrameworkCell;
}

export interface LessonPlan {
  meta: LessonContext;
  rows: {
    preview: LessonRow;
    objective: LessonRow;
    review: LessonRow;
    keyIdeas: LessonRow;
    expertThinking: LessonRow;
    guidedPractice: LessonRow;
    closure: LessonRow;
    independentPractice: LessonRow;
  };
}

export interface SavedLesson {
  id: string;
  name: string;
  timestamp: number;
  plan: LessonPlan;
}

export interface StandardOption {
  code: string;
  description: string;
}

export interface StandardCategory {
  domain: string;
  standards: StandardOption[];
}

export type RowKey = keyof LessonPlan['rows'];
export type ColKey = 'teacherAction' | 'languageStrategy' | 'checkForUnderstanding';
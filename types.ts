export enum Dosha {
  Vata = 'Vata',
  Pitta = 'Pitta',
  Kapha = 'Kapha',
}

export interface QuizQuestion {
  question: {
    en: string;
    hi: string;
  };
  options: {
    text: {
      en: string;
      hi: string;
    };
    dosha: Dosha;
  }[];
}

export interface RoutineItem {
  habits: string[];
  yoga: string[];
  herbs: string[];
}

export interface PersonalizedRoutine {
  morning: RoutineItem;
  afternoon: RoutineItem;
  evening: RoutineItem;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface HerbalRemedy {
  herb: string;
  description: string;
  usage: string;
}

export interface KnowledgeInfo {
  content: string;
  imageSearchQuery: string;
}

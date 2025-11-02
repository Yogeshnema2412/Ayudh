
import React from 'react';
import { QuizQuestion, Dosha } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: {
      en: 'How would you describe your physical frame?',
      hi: 'आप अपने शारीरिक गठन का वर्णन कैसे करेंगे?',
    },
    options: [
      { text: { en: 'Thin, light, and quick. I have trouble gaining weight.', hi: 'पतला, हल्का, और फुर्तीला। मुझे वजन बढ़ाने में मुश्किल होती है।' }, dosha: Dosha.Vata },
      { text: { en: 'Medium build, well-proportioned, with good muscle tone.', hi: 'मध्यम कद-काठी, सुडौल, अच्छी मांसपेशियों के साथ।' }, dosha: Dosha.Pitta },
      { text: { en: 'Solid, heavy, and strong. I gain weight easily.', hi: 'ठोस, भारी, और मजबूत। मेरा वजन आसानी से बढ़ जाता है।' }, dosha: Dosha.Kapha },
    ],
  },
  {
    question: {
      en: 'What is your skin typically like?',
      hi: 'आपकी त्वचा आमतौर पर कैसी होती है?',
    },
    options: [
      { text: { en: 'Dry, thin, and prone to being cold.', hi: 'सूखी, पतली, और ठंड लगने की प्रवृत्ति वाली।' }, dosha: Dosha.Vata },
      { text: { en: 'Sensitive, warm, and prone to redness or acne.', hi: 'संवेदनशील, गर्म, और लालिमा या मुंहासों की प्रवृत्ति वाली।' }, dosha: Dosha.Pitta },
      { text: { en: 'Oily, cool, and smooth.', hi: 'तैलीय, ठंडी, और चिकनी।' }, dosha: Dosha.Kapha },
    ],
  },
  {
    question: {
      en: 'How is your appetite and digestion?',
      hi: 'आपकी भूख और पाचन कैसा है?',
    },
    options: [
      { text: { en: 'Irregular. I sometimes forget to eat.', hi: 'अनियमित। मैं कभी-कभी खाना भूल जाता हूँ।' }, dosha: Dosha.Vata },
      { text: { en: 'Strong and sharp. I get irritable if I miss a meal.', hi: 'तेज और मजबूत। अगर मैं भोजन छोड़ दूं तो मुझे चिड़चिड़ापन होता है।' }, dosha: Dosha.Pitta },
      { text: { en: 'Slow but steady. I enjoy food but can skip meals.', hi: 'धीमा लेकिन स्थिर। मुझे भोजन का आनंद आता है लेकिन मैं भोजन छोड़ सकता हूँ।' }, dosha: Dosha.Kapha },
    ],
  },
  {
    question: {
      en: 'How do you react to weather?',
      hi: 'आप मौसम पर कैसी प्रतिक्रिया देते हैं?',
    },
    options: [
      { text: { en: 'I dislike cold, dry, and windy weather.', hi: 'मुझे ठंडा, शुष्क और हवा वाला मौसम नापसंद है।' }, dosha: Dosha.Vata },
      { text: { en: 'I dislike hot weather and intense sun.', hi: 'मुझे गर्म मौसम और तेज धूप नापसंद है।' }, dosha: Dosha.Pitta },
      { text: { en: 'I dislike damp, cold, and cloudy weather.', hi: 'मुझे नम, ठंडा और बादल वाला मौसम नापसंद है।' }, dosha: Dosha.Kapha },
    ],
  },
  {
    question: {
      en: 'What is your typical energy pattern?',
      hi: 'आपका सामान्य ऊर्जा पैटर्न क्या है?',
    },
    options: [
      { text: { en: 'Comes in bursts, variable. I can get tired easily.', hi: 'अचानक आती है, परिवर्तनशील। मैं आसानी से थक सकता हूँ।' }, dosha: Dosha.Vata },
      { text: { en: 'Consistent and strong. I am focused and driven.', hi: 'सुसंगत और मजबूत। मैं केंद्रित और प्रेरित हूँ।' }, dosha: Dosha.Pitta },
      { text: { en: 'Steady and enduring. It takes me a while to get going.', hi: 'स्थिर और स्थायी। मुझे शुरू होने में थोड़ा समय लगता है।' }, dosha: Dosha.Kapha },
    ],
  },
];

export const IMAGES = {
    WELCOME_HERO: 'https://images.pexels.com/photos/3965433/pexels-photo-3965433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    VATA: 'https://images.pexels.com/photos/1688031/pexels-photo-1688031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    PITTA: 'https://images.pexels.com/photos/161815/fire-fire-burning-heat-flame-161815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    KAPHA: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

export const ICONS = {
    LEAF: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />
        </svg>
    ),
    SUN: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
    ),
    MOON: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
    ),
    CHAT: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.544-.467l-1.03-.227c-.543-.12-1.033-.428-1.396-.833l-.06-.061l-.061-.061c-.399-.363-.695-.854-.813-1.396l-.227-1.03a9.76 9.76 0 0 1-.467-2.544C3 7.444 7.03 3.75 12 3.75s9 3.694 9 8.25Z" />
        </svg>
    ),
    BOOK: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
    ),
    RESET: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-11.667-11.667a8.25 8.25 0 0 0-11.667 0l-3.181 3.183" />
        </svg>
    ),
    HERB_REMEDY: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5v-5.714c0-1.242-.992-2.25-2.22-2.25h-1.06c-.334 0-.654.125-.9.35l-3.006 2.255a2.25 2.25 0 0 0-.9 3.518l3.006 2.255c.246.185.566.29.9.29h1.06c1.228 0 2.22-.992 2.22-2.25Zm-8.384 1.51L5 14.5m1.366-2.518c.246.185.566.29.9.29h1.06c1.228 0 2.22-.992 2.22-2.25v-1.06c0-.334-.125-.654-.35-.9L8.634 6.018a2.25 2.25 0 0 0-3.518.9l-2.255 3.006c-.225.3-.35.666-.35.986v1.06c0 1.228.992 2.25 2.22 2.25h1.06c.334 0 .654-.125.9-.29Z" />
        </svg>
    ),
};

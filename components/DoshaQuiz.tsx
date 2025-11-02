
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { Dosha } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface DoshaQuizProps {
  onQuizComplete: (dosha: Dosha) => void;
}

const DoshaQuiz: React.FC<DoshaQuizProps> = ({ onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ [Dosha.Vata]: 0, [Dosha.Pitta]: 0, [Dosha.Kapha]: 0 });
  const { language, t } = useLanguage();

  const handleAnswer = (dosha: Dosha) => {
    setScores(prevScores => ({ ...prevScores, [dosha]: prevScores[dosha] + 1 }));

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    // The finishQuiz logic is re-evaluated with the final scores state.
    // We need to pass the latest scores to it.
    const finalScores = { ...scores, [QUIZ_QUESTIONS[currentQuestionIndex].options.find(o => o.dosha)!.dosha]: scores[QUIZ_QUESTIONS[currentQuestionIndex].options.find(o => o.dosha)!.dosha]};
    
    // A slight delay to ensure state update completes before calculating the result.
    setTimeout(() => {
        const dominantDosha = Object.keys(scores).reduce((a, b) => scores[a as Dosha] > scores[b as Dosha] ? a : b) as Dosha;
        onQuizComplete(dominantDosha);
    }, 0);
  };
  
  const progressPercentage = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-200/50">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-orange-600 uppercase mb-2">{t('doshaQuizTitle')}</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">{currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</p>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-medium text-gray-800 mb-8">{currentQuestion.question[language]}</h3>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.dosha)}
              className="w-full text-left text-lg p-4 bg-yellow-50/70 border border-orange-200 rounded-lg hover:bg-orange-100 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {option.text[language]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoshaQuiz;

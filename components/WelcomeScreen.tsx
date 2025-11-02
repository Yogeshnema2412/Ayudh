import React from 'react';
import { IMAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartQuiz }) => {
  const { t } = useLanguage();

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[90vh] text-center p-4 rounded-2xl bg-cover bg-center"
      style={{ backgroundImage: `url(${IMAGES.WELCOME_HERO})` }}
    >
      <div className="bg-black/50 p-6 md:p-10 rounded-xl max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span className="text-green-300">{t('welcomeTitle')}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          {t('welcomeSubtitle')}
        </p>
        <button
          onClick={onStartQuiz}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          {t('discoverDosha')}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

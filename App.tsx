
import React, { useState, useCallback } from 'react';
import { Dosha } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import DoshaQuiz from './components/DoshaQuiz';
import Dashboard from './components/Dashboard';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

type AppState = 'welcome' | 'quiz' | 'dashboard';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [userDosha, setUserDosha] = useState<Dosha | null>(null);

  const handleStartQuiz = useCallback(() => {
    setAppState('quiz');
  }, []);

  const handleQuizComplete = useCallback((dosha: Dosha) => {
    setUserDosha(dosha);
    setAppState('dashboard');
  }, []);
  
  const handleReset = useCallback(() => {
    setUserDosha(null);
    setAppState('welcome');
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'quiz':
        return <DoshaQuiz onQuizComplete={handleQuizComplete} />;
      case 'dashboard':
        return userDosha ? <Dashboard userDosha={userDosha} onReset={handleReset} /> : <WelcomeScreen onStartQuiz={handleStartQuiz} />;
      case 'welcome':
      default:
        return <WelcomeScreen onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#fefce8] text-gray-800 transition-colors duration-500">
        <LanguageSwitcher />
        <main className="container mx-auto p-4 md:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default App;

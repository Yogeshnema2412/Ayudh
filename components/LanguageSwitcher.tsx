import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const buttonStyle = "px-4 py-2 rounded-md font-semibold transition-colors duration-200";
    const activeStyle = "bg-green-600 text-white shadow";
    const inactiveStyle = "bg-white hover:bg-green-50 text-gray-600";

    return (
        <div className="absolute top-4 right-4 z-50 flex space-x-2 p-1 bg-gray-100 rounded-lg">
            <button
                onClick={() => setLanguage('en')}
                className={`${buttonStyle} ${language === 'en' ? activeStyle : inactiveStyle}`}
            >
                English
            </button>
            <button
                onClick={() => setLanguage('hi')}
                className={`${buttonStyle} ${language === 'hi' ? activeStyle : inactiveStyle}`}
            >
                हिन्दी
            </button>
        </div>
    );
};

export default LanguageSwitcher;

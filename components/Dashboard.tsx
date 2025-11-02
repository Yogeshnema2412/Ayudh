import React, { useState, useEffect, useMemo } from 'react';
import { Dosha, PersonalizedRoutine } from '../types';
import { getPersonalizedRoutine } from '../services/geminiService';
import AyurDocChat from './AyurDocChat';
import KnowledgeHub from './KnowledgeHub';
import HerbalRemedyFinder from './HerbalRemedyFinder';
import { ICONS, IMAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  userDosha: Dosha;
  onReset: () => void;
}

type ActiveView = 'routine' | 'chat' | 'knowledge' | 'remedies';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center p-8">
        <div className="w-16 h-16 border-4 border-t-transparent border-green-600 rounded-full animate-spin"></div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ userDosha, onReset }) => {
    const [routine, setRoutine] = useState<PersonalizedRoutine | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [activeView, setActiveView] = useState<ActiveView>('routine');
    const { t } = useLanguage();
    
    const RoutineCard: React.FC<{ title: string; icon: React.ReactNode; items: { habits: string[], yoga: string[], herbs: string[] } }> = ({ title, icon, items }) => (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-200/60">
            <div className="flex items-center mb-4">
                {icon}
                <h3 className="text-2xl font-semibold text-gray-800 ml-3">{title}</h3>
            </div>
            <div className="space-y-4 text-gray-600">
                <div>
                    <h4 className="font-semibold text-green-800 mb-2">{t('habits')}</h4>
                    <ul className="list-disc list-inside space-y-1">{items.habits.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
                <div>
                    <h4 className="font-semibold text-green-800 mb-2">{t('yoga')}</h4>
                    <ul className="list-disc list-inside space-y-1">{items.yoga.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
                <div>
                    <h4 className="font-semibold text-green-800 mb-2">{t('herbs')}</h4>
                    <ul className="list-disc list-inside space-y-1">{items.herbs.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (err) => {
                console.warn(`Geolocation error: ${err.message}`);
                // Proceed without location
                setLocation(null);
            },
            { timeout: 10000 }
        );
    }, []);

    useEffect(() => {
        const fetchRoutine = async () => {
            if (userDosha) {
                try {
                    setLoading(true);
                    setError(null);
                    const result = await getPersonalizedRoutine(userDosha, location);
                    setRoutine(result);
                } catch (e) {
                    setError(e instanceof Error ? e.message : 'An unknown error occurred.');
                } finally {
                    setLoading(false);
                }
            }
        };

        // Fetch routine once location is determined or failed
        if (location !== undefined) {
          fetchRoutine();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDosha, location]);

    const doshaInfo = useMemo(() => ({
        [Dosha.Vata]: {
            description: "Represents air and ether. Vata types are typically creative, energetic, and lively.",
            color: "bg-blue-100/70 text-blue-800",
            borderColor: "border-blue-300",
            image: IMAGES.VATA,
        },
        [Dosha.Pitta]: {
            description: "Represents fire and water. Pitta types are often intelligent, focused, and ambitious.",
            color: "bg-red-100/70 text-red-800",
            borderColor: "border-red-300",
            image: IMAGES.PITTA,
        },
        [Dosha.Kapha]: {
            description: "Represents earth and water. Kapha types are usually calm, loving, and grounded.",
            color: "bg-green-100/70 text-green-800",
            borderColor: "border-green-300",
            image: IMAGES.KAPHA,
        },
    }), []);
    
    const NavButton: React.FC<{ view: ActiveView; label: string; icon: React.ReactNode }> = ({ view, label, icon }) => (
        <button
            onClick={() => setActiveView(view)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${activeView === view ? 'bg-green-600 text-white shadow' : 'bg-white hover:bg-green-50 text-gray-600'}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="space-y-8">
            <header className={`relative p-6 rounded-xl shadow-lg border overflow-hidden ${doshaInfo[userDosha].borderColor}`}>
                <img src={doshaInfo[userDosha].image} alt={`${userDosha} dosha representation`} className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"/>
                <div className={`relative z-10 p-4 rounded-lg ${doshaInfo[userDosha].color}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{t('dashboardTitle')}</h1>
                            <p className="mt-2 text-xl font-semibold">{t('dominantDosha')} <span className="font-bold">{userDosha}</span></p>
                            <p className="mt-1 max-w-2xl">{doshaInfo[userDosha].description}</p>
                        </div>
                        <button onClick={onReset} className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 bg-white/50 hover:bg-white rounded-lg text-sm font-semibold transition-colors">
                            <ICONS.RESET className="w-5 h-5"/>
                            <span>{t('restart')}</span>
                        </button>
                    </div>
                </div>
            </header>

            <nav className="flex flex-wrap gap-2 md:gap-4 p-2 bg-gray-100 rounded-lg">
                <NavButton view="routine" label={t('myRoutine')} icon={<ICONS.LEAF className="w-5 h-5"/>} />
                <NavButton view="chat" label={t('ayurDocAI')} icon={<ICONS.CHAT className="w-5 h-5"/>} />
                <NavButton view="knowledge" label={t('knowledgeHub')} icon={<ICONS.BOOK className="w-5 h-5"/>} />
                <NavButton view="remedies" label={t('herbalRemedies')} icon={<ICONS.HERB_REMEDY className="w-5 h-5"/>} />
            </nav>

            <div className="transition-all duration-300">
                {activeView === 'routine' && (
                    <>
                        {loading && <LoadingSpinner />}
                        {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
                        {routine && !loading && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <RoutineCard title={t('morning')} icon={<ICONS.SUN className="w-8 h-8 text-orange-500" />} items={routine.morning} />
                                <RoutineCard title={t('afternoon')} icon={<ICONS.LEAF className="w-8 h-8 text-green-500" />} items={routine.afternoon} />
                                <RoutineCard title={t('evening')} icon={<ICONS.MOON className="w-8 h-8 text-blue-500" />} items={routine.evening} />
                            </div>
                        )}
                    </>
                )}
                {activeView === 'chat' && <AyurDocChat />}
                {activeView === 'knowledge' && <KnowledgeHub />}
                {activeView === 'remedies' && <HerbalRemedyFinder />}
            </div>
        </div>
    );
};

export default Dashboard;

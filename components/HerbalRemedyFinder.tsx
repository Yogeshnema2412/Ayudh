import React, { useState, useCallback } from 'react';
import { getHerbalRemedies } from '../services/geminiService';
import { HerbalRemedy } from '../types';
import { ICONS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const HerbalRemedyFinder: React.FC = () => {
    const [symptoms, setSymptoms] = useState('');
    const [remedies, setRemedies] = useState<HerbalRemedy[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useLanguage();

    const handleSearch = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!symptoms.trim()) return;

        setLoading(true);
        setError(null);
        setRemedies([]);

        try {
            const result = await getHerbalRemedies(symptoms);
            setRemedies(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [symptoms]);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('remedyFinderTitle')}</h2>
            <p className="mb-4 text-gray-600">{t('remedyFinderDesc')}</p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
                <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder={t('remedyPlaceholder')}
                    className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow resize-none"
                    rows={2}
                    disabled={loading}
                />
                <button type="submit" disabled={loading || !symptoms.trim()} className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                    <ICONS.HERB_REMEDY className="w-5 h-5"/>
                    {loading ? t('finding') : t('findRemedies')}
                </button>
            </form>

            <div className="min-h-[200px]">
                {loading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
                    </div>
                )}
                {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
                
                {remedies.length > 0 && (
                     <div className="space-y-4">
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg" role="alert">
                            <p className="font-bold">{t('remedyDisclaimerTitle')}</p>
                            <p>{t('remedyDisclaimerText')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {remedies.map((remedy, index) => (
                            <div key={index} className="bg-green-50/50 border border-green-200 p-4 rounded-lg">
                                <h3 className="text-xl font-bold text-green-800">{remedy.herb}</h3>
                                <p className="mt-2 text-gray-600">{remedy.description}</p>
                                <div className="mt-3 pt-3 border-t border-green-200">
                                    <h4 className="font-semibold text-gray-700">{t('commonUsage')}</h4>
                                    <p className="text-gray-600">{remedy.usage}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
                 {!remedies.length && !loading && !error && <p className="text-center text-gray-500 pt-16">{t('remedyDefaultText')}</p>}
            </div>
        </div>
    );
};

export default HerbalRemedyFinder;

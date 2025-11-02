import React, { useState, useCallback } from 'react';
import { getKnowledgeInfo } from '../services/geminiService';
import { KnowledgeInfo } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const KnowledgeHub: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [info, setInfo] = useState<KnowledgeInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useLanguage();

    const handleSearch = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setError(null);
        setInfo(null);

        try {
            const result = await getKnowledgeInfo(topic);
            setInfo(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [topic]);

    // A simple markdown to HTML converter
    const renderMarkdown = (text: string) => {
        const html = text
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold mt-8 mb-4">$1</h1>')
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*)\*/g, '<em>$1</em>')
            .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
            .replace(/\n/g, '<br />');

        const listWrappedHtml = html.replace(/<li/g, '<ul><li').replace(/<\/li><br \/><ul><li/g, '</li><li').replace(/<\/li><br \/>/g, '</li></ul>');

        return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: listWrappedHtml }} />;
    };


    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('knowledgeHubTitle')}</h2>
            <p className="mb-4 text-gray-600">{t('knowledgeHubDesc')}</p>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={t('knowledgePlaceholder')}
                    className="flex-grow p-3 border border-emerald-200 bg-emerald-50/50 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder-emerald-600/70"
                    disabled={loading}
                />
                <button type="submit" disabled={loading || !topic.trim()} className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 transition-colors">
                    {loading ? t('searching') : t('search')}
                </button>
            </form>

            <div className="min-h-[200px] bg-emerald-50 p-4 rounded-lg transition-colors">
                {loading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-12 h-12 border-4 border-t-transparent border-emerald-500 rounded-full animate-spin"></div>
                    </div>
                )}
                {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
                
                {info && (
                    <div className="animate-fade-in">
                        <img 
                            key={info.imageSearchQuery}
                            src={`https://source.unsplash.com/500x300/?${encodeURIComponent(info.imageSearchQuery)}`} 
                            alt={topic} 
                            className="w-full h-48 object-cover rounded-lg mb-4 shadow-md bg-gray-200"
                        />
                        <div className="text-gray-700 space-y-2">{renderMarkdown(info.content)}</div>
                    </div>
                )}

                 {!info && !loading && !error && <p className="text-center text-gray-500 pt-16">{t('knowledgeDefaultText')}</p>}
            </div>
        </div>
    );
};

export default KnowledgeHub;

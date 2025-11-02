
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';
import { createAyurDocChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const AyurDocChat: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const initChat = () => {
            const newChat = createAyurDocChat();
            setChat(newChat);
            setMessages([{ role: 'model', content: "Namaste! I am AyurDoc, your AI assistant for Ayurvedic wisdom. How can I help you on your wellness journey today?" }]);
        };
        initChat();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading || !chat) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await chat.sendMessageStream({ message: input });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', content: '' }]);
            
            for await (const chunk of response) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I encountered an error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    }, [input, loading, chat]);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200/50 flex flex-col h-[70vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{t('chatWithAyurDoc')}</h2>
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                         <div className="max-w-xs px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('chatPlaceholder')}
                    className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow"
                    disabled={loading}
                />
                <button type="submit" disabled={loading || !input.trim()} className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition-colors">
                    {t('send')}
                </button>
            </form>
        </div>
    );
};

export default AyurDocChat;

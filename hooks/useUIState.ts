import { useState, useCallback } from 'react';
import type { Tab, ToastType } from '../types';

export const useUIState = () => {
    const [activeTab, _setActiveTab] = useState<Tab>('stats');
    const [completedTabs, setCompletedTabs] = useState<Set<Tab>>(new Set());
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [isPromptModalVisible, setIsPromptModalVisible] = useState(false);
    const [isErasModalVisible, setIsErasModalVisible] = useState(false);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

    const setActiveTab = useCallback((tab: Tab) => {
        _setActiveTab(tab);
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    const setToastMessage = useCallback((message: string | null, type: ToastType = 'error') => {
        if (message) {
            setToast({ message, type });
        } else {
            setToast(null);
        }
    }, []);

    const reset = useCallback(() => {
        setActiveTab('stats');
        setCompletedTabs(new Set());
    }, [setActiveTab]);

    return {
        activeTab, setActiveTab,
        completedTabs, setCompletedTabs,
        toast,
        setToastMessage,
        isPromptModalVisible, setIsPromptModalVisible,
        // Backstory prompt modal not used in CoC app
        isErasModalVisible, setIsErasModalVisible,
        isSettingsModalVisible, setIsSettingsModalVisible,
        reset,
    };
};

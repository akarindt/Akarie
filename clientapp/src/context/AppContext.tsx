import { createContext, ReactNode, useEffect, useState } from 'react';
import { AppContextProps } from '@interface/appContext';
import store from 'store2';

export const AppContext = createContext<AppContextProps>({
    theme: 'dark',
    setTheme: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'dark' | 'light'>(store('theme') ?? 'dark');

    useEffect(() => {
        store('theme', theme);

        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return <AppContext.Provider value={{ theme, setTheme }}>{children}</AppContext.Provider>;
};

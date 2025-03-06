import { Dispatch, SetStateAction } from 'react';

export interface AppContextProps {
    theme: 'dark' | 'light';
    setTheme: Dispatch<SetStateAction<'dark' | 'light'>>;
}

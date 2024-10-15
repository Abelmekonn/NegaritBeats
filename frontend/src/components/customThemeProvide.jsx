// src/components/CustomThemeProvider.js
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from '@emotion/react';

// Define your themes
const themes = {
    light: {
        colors: {
            primary: '#0070f3',
            secondary: '#ff4081',
        },
    },
    dark: {
        colors: {
            primary: '#333',
            secondary: '#666',
        },
    },
};

// Create a context for the theme
const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('light'); // Default theme

    const toggleTheme = () => {
        setThemeName((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            <ThemeProvider theme={themes[themeName]}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

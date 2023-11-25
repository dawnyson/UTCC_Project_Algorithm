import React, { createContext, useContext, useState } from 'react';
import { ConfigProvider, App, theme } from 'antd';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

const isTimeForDarkMode = () => {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
};

export function ThemeProvider({ children }) {
    //true == dark mode
    const [themeColor, setThemeColor] = useState(isTimeForDarkMode());

    const value = {
        themeColor,
        setThemeColor
    };

    return (
        <ThemeContext.Provider value={value}>
            <ConfigProvider theme={{ algorithm: themeColor ? theme.darkAlgorithm : theme.defaultAlgorithm }} >
                <App>
                    {children}
                </App>
            </ConfigProvider>

        </ThemeContext.Provider >
    );
}
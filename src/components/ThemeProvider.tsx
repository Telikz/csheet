import type React from "react";
import { createContext, useContext } from "react";
import { useTheme, type UseThemeReturn } from "@/hooks/use-theme";

const ThemeContext = createContext<UseThemeReturn | undefined>(undefined);

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const themeUtils = useTheme();

	return (
		<ThemeContext.Provider value={themeUtils}>{children}</ThemeContext.Provider>
	);
};

export const useThemeContext = (): UseThemeReturn => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
};

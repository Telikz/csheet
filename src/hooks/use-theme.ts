import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "csheet-theme";

const AVAILABLE_THEMES = [
	"light",
	"dark",
	"cupcake",
	"bumblebee",
	"emerald",
	"corporate",
	"synthwave",
	"retro",
	"cyberpunk",
	"valentine",
	"halloween",
	"garden",
	"forest",
	"aqua",
	"lofi",
	"pastel",
	"fantasy",
	"wireframe",
	"black",
	"luxury",
	"dracula",
	"cmyk",
	"autumn",
	"business",
	"acid",
	"lemonade",
	"night",
	"coffee",
	"winter",
	"dim",
	"nord",
	"sunset",
] as const;

type Theme = (typeof AVAILABLE_THEMES)[number];

export interface UseThemeReturn {
	theme: string;
	setTheme: (theme: string) => void;
	availableThemes: readonly Theme[];
}

export const useTheme = (): UseThemeReturn => {
	const [theme, setThemeState] = useState<Theme>("dark");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
		const initialTheme = storedTheme || "dark";
		setThemeState(initialTheme);
		document.documentElement.setAttribute("data-theme", initialTheme);
		setMounted(true);
	}, []);

	const setTheme = (newTheme: string) => {
		if (!AVAILABLE_THEMES.includes(newTheme as Theme)) {
			console.warn(`Theme "${newTheme}" is not available`);
			return;
		}
		const theme = newTheme as Theme;
		setThemeState(theme);
		localStorage.setItem(THEME_STORAGE_KEY, theme);
		document.documentElement.setAttribute("data-theme", theme);
	};

	return {
		theme: mounted ? theme : "dark",
		setTheme,
		availableThemes: AVAILABLE_THEMES,
	};
};

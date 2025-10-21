import type React from "react";
import { useThemeContext } from "@/components/ThemeProvider";

const ThemeSwitcher: React.FC = () => {
	const { theme, setTheme, availableThemes } = useThemeContext();

	return (
		<div className="dropdown dropdown-end">
			<button
				className="btn btn-sm btn-primary gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105"
				type="button"
				aria-label="Change theme"
				title="Switch theme"
			>
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
					<title>Theme</title>
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
				</svg>
				<span className="text-xs font-bold capitalize hidden sm:inline">
					{theme}
				</span>
			</button>
			<ul className="dropdown-content menu p-3 shadow-xl bg-base-100 rounded-lg w-72 max-h-[600px] overflow-y-auto z-50 border-2 border-primary">
				<li className="menu-title">
					<span className="text-sm font-bold text-primary">Select Theme</span>
				</li>
				{availableThemes.map((t) => (
					<li key={t}>
						<button
							type="button"
							onClick={() => setTheme(t)}
							className={`rounded-md transition-all duration-200 ${
								theme === t
									? "bg-primary text-primary-content font-semibold shadow-md"
									: "hover:bg-base-200 hover:scale-105"
							}`}
						>
							<span className="capitalize flex-1 text-left">{t}</span>
							{theme === t && (
								<span className="badge badge-sm badge-primary">✓</span>
							)}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ThemeSwitcher;

import type React from "react";
import type { SheetData } from "@/data/sheet-data.tsx";

interface HeaderProps {
	userData: SheetData;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
	return (
		<header className="text-center space-y-6">
			<div>
				<h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
					{userData.username},{" "}
					<span className="text-slate-400">{userData.age}</span>
				</h1>
				<h2 className="mt-2 text-2xl font-semibold text-indigo-400">
					{userData.archetype}
				</h2>
			</div>

			<p className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed border-l-4 border-indigo-500 pl-4 italic">
				{userData.courseGoal}
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4">
				<div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
					<h3 className="text-lg font-semibold text-sky-400 mb-2">
						Where I Am Now
					</h3>
					<p className="text-slate-400">{userData.whereIAmNow}</p>
				</div>
				<div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
					<h3 className="text-lg font-semibold text-teal-400 mb-2">
						Where I Want To Be
					</h3>
					<p className="text-slate-400">{userData.whereIWantToBe}</p>
				</div>
			</div>
		</header>
	);
};

export default Header;

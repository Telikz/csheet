import type React from "react";
import type { SheetData } from "@/data/sheet-data.tsx";

interface HeaderProps {
	userData: SheetData;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
	return (
		<header className="text-center space-y-6">
			<div>
				<h1 className="text-7xl font-extrabold text-white tracking-tight">
					{userData.username}'s Character Sheet
				</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1800px] mx-auto pt-4">
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

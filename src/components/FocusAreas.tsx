import type React from "react";
import type { FocusArea } from "@/data/sheet-data.tsx";

interface FocusAreasProps {
	focusAreas: FocusArea[];
}

const FocusAreas: React.FC<FocusAreasProps> = ({ focusAreas }) => {
	if (!focusAreas || focusAreas.length === 0) return null;

	return (
		<div className="space-y-6 bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl">
			<h3 className="text-2xl font-bold text-white">Focus Areas</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{focusAreas.map((area) => (
					<div
						key={area.id}
						className="bg-slate-700/50 p-6 rounded-lg border border-slate-700 flex flex-col h-full shadow-lg"
					>
						<div className="flex items-start space-x-4">
							<span className="text-4xl">{area.icon}</span>
							<div>
								<h4 className="text-xl font-bold text-white">{area.name}</h4>
								<p className="text-sm text-indigo-400 italic">"{area.theme}"</p>
							</div>
						</div>
						<div className="mt-4 space-y-4 flex-grow">
							<div>
								<h5 className="font-semibold text-sky-400 mb-1">Purpose</h5>
								<p className="text-slate-400 text-sm">{area.purpose}</p>
							</div>
							<div>
								<h5 className="font-semibold text-sky-400 mb-1">
									Core Challenge
								</h5>
								<p className="text-slate-400 text-sm">{area.coreChallenge}</p>
							</div>
							<div>
								<h5 className="font-semibold text-sky-400 mb-1">
									Key Practices
								</h5>
								<ul className="list-none space-y-1 text-sm text-slate-400">
									{area.keyPractices?.map((practice) => (
										<li key={practice} className="flex items-start">
											<svg
												className="w-4 h-4 mr-2 mt-1 text-teal-400 flex-shrink-0"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<title>Practice</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
												></path>
											</svg>
											<span>{practice}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="mt-6 pt-4 border-t border-slate-700">
							<p className="text-sm text-teal-400 flex items-start">
								<span className="font-semibold mr-2">Growth:</span>
								<span>{area.growthIndicator}</span>
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FocusAreas;

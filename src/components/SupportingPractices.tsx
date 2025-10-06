import type React from "react";
import type { SupportingPractice } from "@/data/sheet-data.tsx";

interface SupportingPracticesProps {
	practices: SupportingPractice[];
}

const SupportingPractices: React.FC<SupportingPracticesProps> = ({
	practices,
}) => {
	return (
		<div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl">
			<h3 className="text-2xl font-bold text-white mb-6">
				Supporting Practices
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
				{practices.map((practice) => (
					<div
						key={practice.id}
						className="bg-slate-700/50 p-4 rounded-lg text-center flex flex-col items-center"
					>
						<span className="text-4xl mb-3">{practice.icon}</span>
						<h4 className="font-semibold text-white">{practice.name}</h4>
						<p className="text-sm text-indigo-300 mb-2">{practice.frequency}</p>
						<p className="text-xs text-slate-400 flex-grow">
							{practice.purpose}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SupportingPractices;

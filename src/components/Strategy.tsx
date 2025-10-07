import type React from "react";
import type { Strategy } from "@/data/sheet-data.tsx";

interface StrategyProps {
	strategy: Strategy;
}

const GoalList: React.FC<{
	title: string;
	goals?: (string | React.ReactNode)[];
}> = ({ title, goals }) => (
	<div>
		<h4 className="text-lg font-semibold text-sky-400 mb-2">{title}</h4>
		<ul className="space-y-2">
			{goals?.map((goal) => (
				<li key={goal?.toString()} className="flex items-start text-slate-400">
					<svg
						className="w-5 h-5 mr-2 text-indigo-400 flex-shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<title>Goal</title>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>{goal}</span>
				</li>
			))}
		</ul>
	</div>
);

const StrategyComponent: React.FC<StrategyProps> = ({ strategy }) => {
	return (
		<div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl">
			<div className="flex items-center space-x-4 mb-6">
				<span className="text-5xl">{strategy.icon}</span>
				<div>
					<h3 className="text-3xl font-bold text-white">{strategy.name}</h3>
					<p className="text-lg text-indigo-400 font-medium tracking-wide">
						{strategy.theme}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-8">
				<GoalList title="Daily Goals" goals={strategy.dailyGoals} />
				<GoalList title="This Month's Goals" goals={strategy.monthlyGoals} />
				<GoalList title="Weekly Goals" goals={strategy.weeklyGoals} />
				<GoalList title="This Year's Goals" goals={strategy.yearlyGoals} />
			</div>
		</div>
	);
};

export default StrategyComponent;

import { useState } from "react";
import {
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import type { CoreAttribute } from "@/data/sheet-data.tsx";

interface CoreAttributesChartProps {
	attributes: CoreAttribute[];
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: { value: string | number }[];
	label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-slate-700 text-white p-2 rounded-md border border-slate-600 shadow-lg">
				<p className="font-bold">{`${label} : ${payload[0].value}`}</p>
			</div>
		);
	}
	return null;
};

const CoreAttributesChart: React.FC<CoreAttributesChartProps> = ({
	attributes,
}) => {
	const [hoveredAttribute, setHoveredAttribute] = useState<string | null>(null);

	const chartData = attributes.map((attr) => ({
		subject: attr.name,
		level: attr.level,
		fullMark: 10,
	}));

	return (
		<div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl">
			<h3 className="text-2xl font-bold text-white mb-6">Core Attributes</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
				<div className="h-80 md:h-96">
					<ResponsiveContainer width="100%" height="100%">
						<RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
							<PolarGrid stroke="#475569" />
							<PolarAngleAxis
								dataKey="subject"
								tick={{ fill: "#cbd5e1", fontSize: 14 }}
							/>
							<Radar
								name="Level"
								dataKey="level"
								stroke="#818cf8"
								fill="#4f46e5"
								fillOpacity={0.6}
							/>
							<Tooltip content={<CustomTooltip />} />
						</RadarChart>
					</ResponsiveContainer>
				</div>
				<div className="space-y-4">
					{attributes.map((attr) => (
						<button
							key={attr.id}
							type={"button"}
							className={`p-4 w-full rounded-lg transition-all duration-300 ${hoveredAttribute === attr.name ? "bg-slate-700/80" : "bg-slate-700/40"}`}
							onMouseEnter={() => setHoveredAttribute(attr.name ?? "")}
							onMouseLeave={() => setHoveredAttribute(null)}
						>
							<div className="flex justify-between items-center">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">{attr.icon}</span>
									<h4 className="text-lg font-semibold text-white">
										{attr.name}
									</h4>
								</div>
								<div className="text-xl font-bold text-indigo-300">
									{attr.level}
									<span className="text-sm text-slate-400">/10</span>
								</div>
							</div>
							<p className="text-sm text-slate-400 mt-2 pl-9">{attr.summary}</p>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default CoreAttributesChart;

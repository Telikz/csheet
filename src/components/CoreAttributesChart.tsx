import { useMemo, useState } from "react";
import {
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import EditModal from "@/components/EditModal.tsx";
import { useThemeContext } from "@/components/ThemeProvider";
import type { CoreAttribute } from "@/data/sheet-data.tsx";

interface CoreAttributesChartProps {
	attributes: CoreAttribute[];
	sheetId: number;
	onAddAttribute: () => void;
	onRemoveAttribute: (index: number) => void;
	onUpdateAttribute: (index: number, attribute: Partial<CoreAttribute>) => void;
	isUpdating?: boolean;
	isEditMode?: boolean;
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: { value: string | number }[];
	label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-base-300 text-base-content p-2 rounded-md border border-base-300 shadow-lg">
				<p className="font-bold">{`${label} : ${payload[0].value}`}</p>
			</div>
		);
	}
	return null;
};

const CoreAttributesChart: React.FC<CoreAttributesChartProps> = ({
	attributes,
	onAddAttribute,
	onRemoveAttribute,
	onUpdateAttribute,
	isUpdating = false,
	isEditMode = true,
}) => {
	const { theme } = useThemeContext();
	const [hoveredAttribute, setHoveredAttribute] = useState<string | null>(null);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		level: 0,
		icon: "",
		summary: "",
	});

	const chartColors = useMemo(() => {
		const isDark =
			theme === "dark" ||
			theme === "dracula" ||
			theme === "nord" ||
			theme === "business" ||
			theme === "night" ||
			theme === "sunset" ||
			theme === "luxury";

		return {
			grid: isDark ? "#64748b" : "#cbd5e1",
			axis: isDark ? "#e2e8f0" : "#334155",
			stroke: isDark ? "#818cf8" : "#6366f1",
			fill: isDark ? "#4f46e5" : "#4338ca",
		};
	}, [theme]);

	const openEdit = (index: number) => {
		const attr = attributes[index];
		setFormData({
			name: attr.name || "",
			level: attr.level || 0,
			icon: attr.icon || "",
			summary: attr.summary || "",
		});
		setEditingIndex(index);
	};

	const handleSave = () => {
		if (editingIndex !== null) {
			onUpdateAttribute(editingIndex, {
				name: formData.name,
				level: formData.level,
				icon: formData.icon,
				summary: formData.summary,
			});
			setEditingIndex(null);
		}
	};

	if (attributes.length === 0) {
		return (
			<div className="card">
				<div className="section-header mb-8">
					<span className="section-icon">💪</span>
					<h3 className="section-title">Core Attributes</h3>
				</div>
				<div className="text-center py-12 space-y-4">
					<p className="text-base-content/70">
						No core attributes yet. Add your first attribute to get started!
					</p>
					<button type="button" onClick={onAddAttribute} className="btn-add">
						<span>✨</span> Add Attribute
					</button>
				</div>
			</div>
		);
	}

	const chartData = attributes.map((attr) => ({
		subject: attr.name,
		level: attr.level,
		fullMark: 10,
	}));

	return (
		<>
			<div className="card">
				<div className="section-header mb-2">
					<span className="section-icon">💪</span>
					<h3 className="section-title">Core Attributes</h3>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
					<div className="h-96">
						<ResponsiveContainer width="100%" height="100%">
							<RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
								<PolarGrid stroke={chartColors.grid} />
								<PolarAngleAxis
									dataKey="subject"
									tick={{ fill: chartColors.axis, fontSize: 14 }}
								/>
								<Radar
									name="Level"
									dataKey="level"
									stroke={chartColors.stroke}
									fill={chartColors.fill}
									fillOpacity={0.6}
								/>
								<Tooltip content={<CustomTooltip />} />
							</RadarChart>
						</ResponsiveContainer>
					</div>
					<div className="space-y-4">
						{attributes.map((attr, index) => (
							<button
								type="button"
								key={attr.id}
								className={`p-4 w-full rounded-lg transition-all duration-300 group text-left ${hoveredAttribute === attr.name ? "bg-base-300/80" : "bg-base-300/40"}`}
								onMouseEnter={() => setHoveredAttribute(attr.name ?? "")}
								onMouseLeave={() => setHoveredAttribute(null)}
								onClick={() => isEditMode && openEdit(index)}
								disabled={!isEditMode}
							>
								<div className="flex justify-between items-start">
									<div className="flex-1">
										<div className="flex justify-between items-center">
											<div className="flex items-center space-x-3">
												<span className="text-2xl">{attr.icon}</span>
												<h4 className="text-lg font-semibold text-base-content">
													{attr.name}
												</h4>
											</div>
											<div className="text-xl font-bold text-secondary300">
												{attr.level}
												<span className="text-sm text-base-content/70">
													/10
												</span>
											</div>
										</div>
										<p className="text-sm text-base-content/70 mt-2">
											{attr.summary}
										</p>
									</div>
									{isEditMode && (
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												onRemoveAttribute(index);
											}}
											className="absolute right-5 text-error hover:text-error/80 transition-colors opacity-0 group-hover:opacity-100"
											title="Delete attribute"
										>
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<title>Delete</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
									)}
								</div>
							</button>
						))}
						{isEditMode && (
							<div className="flex justify-center">
								<button
									type="button"
									onClick={onAddAttribute}
									className="btn-add"
								>
									<span>➕</span> Add Another
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			<EditModal
				isOpen={editingIndex !== null}
				title={`Edit ${editingIndex !== null ? attributes[editingIndex]?.name : "Attribute"}`}
				fields={[
					{
						name: "name",
						label: "Attribute Name",
						value: formData.name,
						onChange: (value) =>
							setFormData({ ...formData, name: String(value) }),
						placeholder: "e.g., Strength, Intelligence",
					},
					{
						name: "icon",
						label: "Icon (Emoji)",
						value: formData.icon,
						onChange: (value) =>
							setFormData({ ...formData, icon: String(value) }),
						placeholder: "e.g., 💪, 🧠",
					},
					{
						name: "level",
						label: "Level (0-10)",
						type: "number",
						value: formData.level,
						onChange: (value) =>
							setFormData({
								...formData,
								level: Math.min(10, Math.max(0, parseInt(String(value), 10))),
							}),
						placeholder: "0-10",
					},
					{
						name: "summary",
						label: "Summary",
						type: "textarea",
						value: formData.summary,
						onChange: (value) =>
							setFormData({ ...formData, summary: String(value) }),
						placeholder: "Brief description of this attribute...",
					},
				]}
				onSave={handleSave}
				onCancel={() => setEditingIndex(null)}
				isLoading={isUpdating}
			/>
		</>
	);
};

export default CoreAttributesChart;

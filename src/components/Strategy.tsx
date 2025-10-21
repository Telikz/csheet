import type React from "react";
import { useState } from "react";
import EditModal from "@/components/EditModal.tsx";
import type { Strategy } from "@/data/sheet-data.tsx";

interface StrategyProps {
	strategy: Strategy;
	onUpdateStrategy: (strategy: Partial<Strategy>) => void;
	isUpdating?: boolean;
	isEditMode?: boolean;
}

const GoalList: React.FC<{
	title: string;
	goals?: (string | React.ReactNode)[];
}> = ({ title, goals }) => (
	<div>
		<h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
		<ul className="space-y-2">
			{goals?.map((goal) => (
				<li
					key={goal?.toString()}
					className="flex items-start text-base-content/70"
				>
					<svg
						className="w-5 h-5 mr-2 text-success flex-shrink-0 mt-0.5"
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

const StrategyComponent: React.FC<StrategyProps> = ({
	strategy,
	onUpdateStrategy,
	isUpdating = false,
	isEditMode = true,
}) => {
	const [editingField, setEditingField] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		icon: "",
		theme: "",
		dailyGoals: "",
		weeklyGoals: "",
		monthlyGoals: "",
		yearlyGoals: "",
	});

	const openEdit = (field: string) => {
		setFormData({
			name: strategy.name || "",
			icon: strategy.icon || "",
			theme: strategy.theme || "",
			dailyGoals: strategy.dailyGoals?.join("\n") || "",
			weeklyGoals: strategy.weeklyGoals?.join("\n") || "",
			monthlyGoals: strategy.monthlyGoals?.join("\n") || "",
			yearlyGoals: strategy.yearlyGoals?.join("\n") || "",
		});
		setEditingField(field);
	};

	const handleSave = (field: string) => {
		if (field === "info") {
			onUpdateStrategy({
				name: formData.name,
				icon: formData.icon,
				theme: formData.theme,
			});
		} else if (field === "daily") {
			onUpdateStrategy({
				dailyGoals: formData.dailyGoals.split("\n").filter((g) => g.trim()),
			});
		} else if (field === "weekly") {
			onUpdateStrategy({
				weeklyGoals: formData.weeklyGoals.split("\n").filter((g) => g.trim()),
			});
		} else if (field === "monthly") {
			onUpdateStrategy({
				monthlyGoals: formData.monthlyGoals.split("\n").filter((g) => g.trim()),
			});
		} else if (field === "yearly") {
			onUpdateStrategy({
				yearlyGoals: formData.yearlyGoals.split("\n").filter((g) => g.trim()),
			});
		}
		setEditingField(null);
	};

	return (
		<>
			<div className="card">
				<button
					type="button"
					onClick={() => isEditMode && openEdit("info")}
					disabled={!isEditMode}
					className="section-header group"
				>
					<span className="section-icon">{strategy.icon || "🎯"}</span>
					<div className="text-left flex-1 min-w-0">
						<h3 className="section-title">{strategy.name || "My Strategy"}</h3>
						<p className="text-sm sm:text-base text-secondary font-medium tracking-wide truncate">
							{strategy.theme || "Define your theme"}
						</p>
						<p className="text-xs text-base-content/40 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
							Click to edit
						</p>
					</div>
				</button>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
					<button
						type="button"
						onClick={() => isEditMode && openEdit("daily")}
						disabled={!isEditMode}
						className="text-left hover:bg-slate-700/30 p-3 rounded transition-colors duration-300"
					>
						<GoalList title="Daily Goals" goals={strategy.dailyGoals} />
					</button>
					<button
						type="button"
						onClick={() => isEditMode && openEdit("monthly")}
						disabled={!isEditMode}
						className="text-left hover:bg-slate-700/30 p-3 rounded transition-colors duration-300"
					>
						<GoalList
							title="This Month's Goals"
							goals={strategy.monthlyGoals}
						/>
					</button>
					<button
						type="button"
						onClick={() => isEditMode && openEdit("weekly")}
						disabled={!isEditMode}
						className="text-left hover:bg-slate-700/30 p-3 rounded transition-colors duration-300"
					>
						<GoalList title="Weekly Goals" goals={strategy.weeklyGoals} />
					</button>
					<button
						type="button"
						onClick={() => isEditMode && openEdit("yearly")}
						disabled={!isEditMode}
						className="text-left hover:bg-slate-700/30 p-3 rounded transition-colors duration-300"
					>
						<GoalList title="This Year's Goals" goals={strategy.yearlyGoals} />
					</button>
				</div>
			</div>

			<EditModal
				isOpen={editingField === "info"}
				title="Edit Strategy Info"
				fields={[
					{
						name: "name",
						label: "Strategy Name",
						value: formData.name,
						onChange: (value) =>
							setFormData({ ...formData, name: String(value) }),
						placeholder: "e.g., 2024 Growth Plan",
					},
					{
						name: "icon",
						label: "Icon (Emoji)",
						value: formData.icon,
						onChange: (value) =>
							setFormData({ ...formData, icon: String(value) }),
						placeholder: "e.g., 🎯, 🚀",
					},
					{
						name: "theme",
						label: "Theme",
						value: formData.theme,
						onChange: (value) =>
							setFormData({ ...formData, theme: String(value) }),
						placeholder: "e.g., Excellence, Innovation",
					},
				]}
				onSave={() => handleSave("info")}
				onCancel={() => setEditingField(null)}
				isLoading={isUpdating}
			/>

			<EditModal
				isOpen={editingField === "daily"}
				title="Edit Daily Goals"
				fields={[
					{
						name: "dailyGoals",
						label: "Daily Goals (one per line)",
						type: "textarea",
						value: formData.dailyGoals,
						onChange: (value) =>
							setFormData({ ...formData, dailyGoals: String(value) }),
						placeholder: "Goal 1\nGoal 2\nGoal 3",
					},
				]}
				onSave={() => handleSave("daily")}
				onCancel={() => setEditingField(null)}
				isLoading={isUpdating}
			/>

			<EditModal
				isOpen={editingField === "weekly"}
				title="Edit Weekly Goals"
				fields={[
					{
						name: "weeklyGoals",
						label: "Weekly Goals (one per line)",
						type: "textarea",
						value: formData.weeklyGoals,
						onChange: (value) =>
							setFormData({ ...formData, weeklyGoals: String(value) }),
						placeholder: "Goal 1\nGoal 2\nGoal 3",
					},
				]}
				onSave={() => handleSave("weekly")}
				onCancel={() => setEditingField(null)}
				isLoading={isUpdating}
			/>

			<EditModal
				isOpen={editingField === "monthly"}
				title="Edit Monthly Goals"
				fields={[
					{
						name: "monthlyGoals",
						label: "Monthly Goals (one per line)",
						type: "textarea",
						value: formData.monthlyGoals,
						onChange: (value) =>
							setFormData({ ...formData, monthlyGoals: String(value) }),
						placeholder: "Goal 1\nGoal 2\nGoal 3",
					},
				]}
				onSave={() => handleSave("monthly")}
				onCancel={() => setEditingField(null)}
				isLoading={isUpdating}
			/>

			<EditModal
				isOpen={editingField === "yearly"}
				title="Edit Yearly Goals"
				fields={[
					{
						name: "yearlyGoals",
						label: "Yearly Goals (one per line)",
						type: "textarea",
						value: formData.yearlyGoals,
						onChange: (value) =>
							setFormData({ ...formData, yearlyGoals: String(value) }),
						placeholder: "Goal 1\nGoal 2\nGoal 3",
					},
				]}
				onSave={() => handleSave("yearly")}
				onCancel={() => setEditingField(null)}
				isLoading={isUpdating}
			/>
		</>
	);
};

export default StrategyComponent;

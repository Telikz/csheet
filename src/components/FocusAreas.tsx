import type React from "react";
import { useState } from "react";
import EditModal from "@/components/EditModal.tsx";
import type { FocusArea } from "@/data/sheet-data.tsx";

interface FocusAreasProps {
	focusAreas: FocusArea[];
	onAddArea: () => void;
	onRemoveArea: (index: number) => void;
	onUpdateArea: (index: number, area: Partial<FocusArea>) => void;
	isUpdating?: boolean;
	isEditMode?: boolean;
}

const FocusAreas: React.FC<FocusAreasProps> = ({
	focusAreas,
	onAddArea,
	onRemoveArea,
	onUpdateArea,
	isUpdating = false,
	isEditMode = true,
}) => {
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		icon: "",
		purpose: "",
		coreChallenge: "",
		growthIndicator: "",
		keyPractices: "",
	});

	const openEdit = (index: number) => {
		const area = focusAreas[index];
		setFormData({
			name: area.name || "",
			icon: area.icon || "",
			purpose: area.purpose || "",
			coreChallenge: area.coreChallenge || "",
			growthIndicator: area.growthIndicator || "",
			keyPractices: area.keyPractices?.join("\n") || "",
		});
		setEditingIndex(index);
	};

	const handleSave = () => {
		if (editingIndex !== null) {
			onUpdateArea(editingIndex, {
				name: formData.name,
				icon: formData.icon,
				purpose: formData.purpose,
				coreChallenge: formData.coreChallenge,
				growthIndicator: formData.growthIndicator,
				keyPractices: formData.keyPractices.split("\n").filter((p) => p.trim()),
			});
			setEditingIndex(null);
		}
	};
	if (!focusAreas || focusAreas.length === 0) {
		return (
			<div className="space-y-6 card">
				<div className="section-header">
					<span className="section-icon">🎯</span>
					<h3 className="section-title">Focus Areas</h3>
				</div>
				<div className="text-center py-12 space-y-4">
					<p className="text-base-content/70">
						No focus areas yet. Add your first focus area to get started!
					</p>
					<button
						type="button"
						onClick={onAddArea}
						className="btn-add"
					>
						<span>✨</span> Add Focus Area
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-6 card">
				<div className="section-header">
					<span className="section-icon">🎯</span>
					<h3 className="section-title">Focus Areas</h3>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{focusAreas.map((area, index) => (
						<div
							key={area.id}
							className="bg-base-300 p-6 rounded-lg border border-base-300 flex flex-col h-full shadow-lg group relative"
						>
							{isEditMode && (
								<button
									type="button"
									onClick={() => onRemoveArea(index)}
									className="absolute top-4 right-4 text-error hover:text-error/80 transition-colors opacity-0 group-hover:opacity-100"
									title="Delete focus area"
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
							<button
								type="button"
								onClick={() => isEditMode && openEdit(index)}
								disabled={!isEditMode}
								className="text-left flex-1 hover:opacity-80 transition-opacity"
							>
								<div className="flex items-start space-x-4">
									<span className="text-4xl">{area.icon}</span>
									<div>
										<h4 className="text-3xl font-bold text-base-content">
											{area.name}
										</h4>
									</div>
								</div>
							</button>
							<div className="mt-4 space-y-4 flex-grow">
								<div>
									<h5 className="font-semibold text-primary mb-1">Purpose</h5>
									<p className="text-base-content/70 text-sm">{area.purpose}</p>
								</div>
								<div>
									<h5 className="font-semibold text-primary mb-1">
										Core Challenge
									</h5>
									<p className="text-base-content/70 text-sm">{area.coreChallenge}</p>
								</div>
								<div>
									<h5 className="font-semibold text-primary mb-1">
										Key Practices
									</h5>
									<ul className="list-none space-y-1 text-sm text-base-content/70">
										{area.keyPractices?.map((practice) => (
											<li key={practice} className="flex items-start">
												<svg
													className="w-4 h-4 mr-2 mt-1 text-success flex-shrink-0"
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
							<div className="mt-6 pt-4 border-t border-base-300">
								<p className="text-sm text-success flex items-start">
									<span className="font-semibold mr-2">Growth Indicators:</span>
									<span>{area.growthIndicator}</span>
								</p>
							</div>
						</div>
					))}
					{isEditMode && (
						<div className="col-span-1 md:col-span-2 flex justify-center">
							<button
								type="button"
								onClick={onAddArea}
								className="btn-add-block"
							>
								<span>➕</span> Add Another
							</button>
						</div>
					)}
				</div>
			</div>

			<EditModal
				isOpen={editingIndex !== null}
				title={`Edit ${editingIndex !== null ? focusAreas[editingIndex]?.name : "Focus Area"}`}
				fields={[
					{
						name: "name",
						label: "Area Name",
						value: formData.name,
						onChange: (value) =>
							setFormData({ ...formData, name: String(value) }),
						placeholder: "e.g., Leadership, Creativity",
					},
					{
						name: "icon",
						label: "Icon (Emoji)",
						value: formData.icon,
						onChange: (value) =>
							setFormData({ ...formData, icon: String(value) }),
						placeholder: "e.g., 👑, 🎨",
					},
					{
						name: "purpose",
						label: "Purpose",
						type: "textarea",
						value: formData.purpose,
						onChange: (value) =>
							setFormData({ ...formData, purpose: String(value) }),
						placeholder: "Why is this area important?",
					},
					{
						name: "coreChallenge",
						label: "Core Challenge",
						type: "textarea",
						value: formData.coreChallenge,
						onChange: (value) =>
							setFormData({ ...formData, coreChallenge: String(value) }),
						placeholder: "What's the main challenge in this area?",
					},
					{
						name: "keyPractices",
						label: "Key Practices (one per line)",
						type: "textarea",
						value: formData.keyPractices,
						onChange: (value) =>
							setFormData({ ...formData, keyPractices: String(value) }),
						placeholder: "Practice 1\nPractice 2\nPractice 3",
					},
					{
						name: "growthIndicator",
						label: "Growth Indicator",
						value: formData.growthIndicator,
						onChange: (value) =>
							setFormData({ ...formData, growthIndicator: String(value) }),
						placeholder: "How will you know you're growing?",
					},
				]}
				onSave={handleSave}
				onCancel={() => setEditingIndex(null)}
				isLoading={isUpdating}
			/>
		</>
	);
};

export default FocusAreas;

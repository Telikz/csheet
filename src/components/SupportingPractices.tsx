import type React from "react";
import { useState } from "react";
import EditModal from "@/components/EditModal.tsx";
import type { SupportingPractice } from "@/data/sheet-data.tsx";

interface SupportingPracticesProps {
	practices: SupportingPractice[];
	onAddPractice: () => void;
	onRemovePractice: (index: number) => void;
	onUpdatePractice: (
		index: number,
		practice: Partial<SupportingPractice>,
	) => void;
	isUpdating?: boolean;
	isEditMode?: boolean;
}

const SupportingPractices: React.FC<SupportingPracticesProps> = ({
	practices,
	onAddPractice,
	onRemovePractice,
	onUpdatePractice,
	isUpdating = false,
	isEditMode = true,
}) => {
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		icon: "",
		purpose: "",
		frequency: "",
	});

	const openEdit = (index: number) => {
		const practice = practices[index];
		setFormData({
			name: practice.name || "",
			icon: practice.icon || "",
			purpose: practice.purpose || "",
			frequency: practice.frequency || "",
		});
		setEditingIndex(index);
	};

	const handleSave = () => {
		if (editingIndex !== null) {
			onUpdatePractice(editingIndex, {
				name: formData.name,
				icon: formData.icon,
				purpose: formData.purpose,
				frequency: formData.frequency,
			});
			setEditingIndex(null);
		}
	};

	if (!practices || practices.length === 0) {
		return (
			<div className="card">
				<div className="section-header">
					<span className="section-icon">🔄</span>
					<h3 className="section-title">Supporting Practices</h3>
				</div>
				<div className="text-center py-12 space-y-4">
					<p className="text-base-content/70">
						No supporting practices yet. Add your first practice to get started!
					</p>
					<button type="button" onClick={onAddPractice} className="btn-add">
						<span>✨</span> Add Practice
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="card">
				<div className="section-header">
					<span className="section-icon">🔄</span>
					<h3 className="section-title">Supporting Practices</h3>
				</div>
				<div className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
						{practices.map((practice, index) => (
							<div
								key={practice.id}
								className="bg-base-300/40 p-4 rounded-lg text-center flex flex-col items-center hover:bg-base-300/80 transition-colors duration-300 group relative"
							>
								{isEditMode && (
									<button
										type="button"
										onClick={() => onRemovePractice(index)}
										className="absolute top-1 right-1 text-error hover:text-error/80 transition-colors opacity-0 group-hover:opacity-100"
										title="Delete practice"
									>
										<svg
											className="w-4 h-4"
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
									className="text-center w-full hover:opacity-80 transition-opacity"
								>
									<span className="text-4xl mb-3 block">{practice.icon}</span>
									<h4 className="font-semibold text-base-content">
										{practice.name}
									</h4>
									<p className="text-sm text-secondary300 mb-2">
										{practice.frequency}
									</p>
									<p className="text-xs text-base-content/70 flex-grow">
										{practice.purpose}
									</p>
								</button>
							</div>
						))}
					</div>
					{isEditMode && (
						<div className="flex justify-center">
							<button type="button" onClick={onAddPractice} className="btn-add">
								<span>➕</span> Add Another
							</button>
						</div>
					)}
				</div>
			</div>

			<EditModal
				isOpen={editingIndex !== null}
				title={`Edit ${editingIndex !== null ? practices[editingIndex]?.name : "Practice"}`}
				fields={[
					{
						name: "name",
						label: "Practice Name",
						value: formData.name,
						onChange: (value) =>
							setFormData({ ...formData, name: String(value) }),
						placeholder: "e.g., Meditation, Exercise",
					},
					{
						name: "icon",
						label: "Icon (Emoji)",
						value: formData.icon,
						onChange: (value) =>
							setFormData({ ...formData, icon: String(value) }),
						placeholder: "e.g., 🧘, 🏃",
					},
					{
						name: "frequency",
						label: "Frequency",
						value: formData.frequency,
						onChange: (value) =>
							setFormData({ ...formData, frequency: String(value) }),
						placeholder: "e.g., Daily, Weekly",
					},
					{
						name: "purpose",
						label: "Purpose",
						type: "textarea",
						value: formData.purpose,
						onChange: (value) =>
							setFormData({ ...formData, purpose: String(value) }),
						placeholder: "Why do this practice?",
					},
				]}
				onSave={handleSave}
				onCancel={() => setEditingIndex(null)}
				isLoading={isUpdating}
			/>
		</>
	);
};

export default SupportingPractices;

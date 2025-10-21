import type React from "react";
import { useState } from "react";
import EditModal from "@/components/EditModal.tsx";
import type { SheetData } from "@/data/sheet-data.tsx";

interface HeaderProps {
	userData: SheetData;
	onUpdate: (updates: Partial<SheetData>) => void;
	isUpdating?: boolean;
	isEditMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({
	userData,
	onUpdate,
	isUpdating = false,
	isEditMode = true,
}) => {
	const [editingField, setEditingField] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		username: userData.username || "",
		whereIAmNow: userData.whereIAmNow || "",
		whereIWantToBe: userData.whereIWantToBe || "",
	});

	const handleSave = () => {
		onUpdate({
			username: formData.username,
			whereIAmNow: formData.whereIAmNow,
			whereIWantToBe: formData.whereIWantToBe,
		});
		setEditingField(null);
	};

	return (
		<>
			<header className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<button
						type="button"
						onClick={() => isEditMode && setEditingField("now")}
						disabled={!isEditMode}
						className="card-header-lg group"
					>
						<div className="flex items-center gap-2 mb-2">
							<span className="text-xl">📍</span>
							<h3 className="text-lg font-semibold text-primary">
								Where I Am Now
							</h3>
						</div>
						<p className="text-base-content/70 leading-relaxed">
							{userData.whereIAmNow || "Click to add..."}
						</p>
					</button>

					<button
						type="button"
						onClick={() => isEditMode && setEditingField("want")}
						disabled={!isEditMode}
						className="card-header-lg group"
					>
						<div className="flex items-center gap-2 mb-2">
							<span className="text-xl">🎯</span>
							<h3 className="text-lg font-semibold text-primary">
								Where I Want To Be
							</h3>
						</div>
						<p className="text-base-content/70 leading-relaxed">
							{userData.whereIWantToBe || "Click to add..."}
						</p>
					</button>
				</div>
			</header>

			<EditModal
				isOpen={editingField === "info"}
				title="Edit Basic Info"
				fields={[
					{
						name: "username",
						label: "Username",
						value: formData.username,
						onChange: (value) =>
							setFormData({ ...formData, username: String(value) }),
						placeholder: "Enter your name",
					},
				]}
				onSave={handleSave}
				onCancel={() => setEditingField(null)}
				isLoading={isUpdating}
			/>

			<EditModal
				isOpen={editingField === "now"}
				title="Where I Am Now"
				fields={[
					{
						name: "whereIAmNow",
						label: "Current Situation",
						type: "textarea",
						value: formData.whereIAmNow,
						onChange: (value) =>
							setFormData({ ...formData, whereIAmNow: String(value) }),
						placeholder: "Describe your current situation...",
					},
				]}
				onSave={handleSave}
				onCancel={() => setEditingField(null)}
				isLoading={isUpdating}
			/>

			<EditModal
				isOpen={editingField === "want"}
				title="Where I Want To Be"
				fields={[
					{
						name: "whereIWantToBe",
						label: "Desired Situation",
						type: "textarea",
						value: formData.whereIWantToBe,
						onChange: (value) =>
							setFormData({ ...formData, whereIWantToBe: String(value) }),
						placeholder: "Describe where you want to be...",
					},
				]}
				onSave={handleSave}
				onCancel={() => setEditingField(null)}
				isLoading={isUpdating}
			/>
		</>
	);
};

export default Header;

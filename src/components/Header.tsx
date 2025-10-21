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
		age: userData.age?.toString() || "",
		archetype: userData.archetype || "",
		courseGoal: userData.courseGoal || "",
		whereIAmNow: userData.whereIAmNow || "",
		whereIWantToBe: userData.whereIWantToBe || "",
	});

	const handleSave = () => {
		onUpdate({
			username: formData.username,
			age: formData.age ? parseInt(formData.age, 10) : undefined,
			archetype: formData.archetype,
			courseGoal: formData.courseGoal,
			whereIAmNow: formData.whereIAmNow,
			whereIWantToBe: formData.whereIWantToBe,
		});
		setEditingField(null);
	};

	return (
		<>
			<header className="space-y-6">
				<button
					type="button"
					onClick={() => isEditMode && setEditingField("info")}
					disabled={!isEditMode}
					className="w-full group text-left"
				>
					<div className="space-y-2">
						<h2 className="text-6xl text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-primary/90 to-secondary group-hover:from-primary/100 group-hover:to-secondary transition-all duration-300">
							{`${userData.username}'s Character sheet` || "Your Character"}
						</h2>
					</div>
				</button>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<button
						type="button"
						onClick={() => isEditMode && setEditingField("info")}
						disabled={!isEditMode}
						className="card-header group"
					>
						<div className="flex items-start gap-2">
							<span className="text-lg">👤</span>
							<div className="flex-1 min-w-0">
								<h4 className="text-xs font-semibold text-primary mb-1">Age</h4>
								<p className="text-base-content/70 truncate">
									{userData.age || "Not set"}
								</p>
							</div>
						</div>
					</button>

					<button
						type="button"
						onClick={() => isEditMode && setEditingField("info")}
						disabled={!isEditMode}
						className="card-header group"
					>
						<div className="flex items-start gap-2">
							<span className="text-lg">🎭</span>
							<div className="flex-1 min-w-0">
								<h4 className="text-xs font-semibold text-primary mb-1">
									Archetype
								</h4>
								<p className="text-base-content/70 truncate">
									{userData.archetype || "Not set"}
								</p>
							</div>
						</div>
					</button>

					<button
						type="button"
						onClick={() => isEditMode && setEditingField("info")}
						disabled={!isEditMode}
						className="card-header group col-span-1 sm:col-span-2 lg:col-span-2"
					>
						<div className="flex items-start gap-2">
							<span className="text-lg">🎯</span>
							<div className="flex-1 min-w-0">
								<h4 className="text-xs font-semibold text-primary mb-1">
									Course Goal
								</h4>
								<p className="text-base-content/70">
									{userData.courseGoal || "Not set"}
								</p>
							</div>
						</div>
					</button>
				</div>

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
					{
						name: "age",
						label: "Age",
						type: "number",
						value: formData.age,
						onChange: (value) =>
							setFormData({ ...formData, age: String(value) }),
						placeholder: "Enter your age",
					},
					{
						name: "archetype",
						label: "Archetype",
						value: formData.archetype,
						onChange: (value) =>
							setFormData({ ...formData, archetype: String(value) }),
						placeholder: "e.g., Leader, Creator, Sage",
					},
					{
						name: "courseGoal",
						label: "Course Goal",
						value: formData.courseGoal,
						onChange: (value) =>
							setFormData({ ...formData, courseGoal: String(value) }),
						placeholder: "What's your main goal?",
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

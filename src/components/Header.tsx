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
						<h2 className="text-6xl text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 group-hover:from-sky-300 group-hover:to-cyan-200 transition-all duration-300">
							{userData.username + "'s Character sheet" || "Your Character"}
						</h2>
					</div>
				</button>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<button
						type="button"
						onClick={() => isEditMode && setEditingField("info")}
						disabled={!isEditMode}
						className="group bg-gradient-to-br from-slate-800/60 to-slate-800/40 p-4 rounded-lg border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-gradient-to-br hover:from-slate-800/80 hover:to-slate-800/60 transition-all duration-300 text-left overflow-hidden"
					>
						<div className="flex items-start gap-2">
							<span className="text-lg">👤</span>
							<div className="flex-1 min-w-0">
								<h4 className="text-xs font-semibold text-indigo-400 mb-1">
									Age
								</h4>
								<p className="text-slate-300 truncate">
									{userData.age || "Not set"}
								</p>
							</div>
						</div>
					</button>

					<button
						type="button"
						onClick={() => isEditMode && setEditingField("info")}
						disabled={!isEditMode}
						className="group bg-gradient-to-br from-slate-800/60 to-slate-800/40 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-slate-800/80 hover:to-slate-800/60 transition-all duration-300 text-left overflow-hidden"
					>
						<div className="flex items-start gap-2">
							<span className="text-lg">🎭</span>
							<div className="flex-1 min-w-0">
								<h4 className="text-xs font-semibold text-purple-400 mb-1">
									Archetype
								</h4>
								<p className="text-slate-300 truncate">
									{userData.archetype || "Not set"}
								</p>
							</div>
						</div>
					</button>

					<button
						type="button"
						onClick={() => isEditMode && setEditingField("info")}
						disabled={!isEditMode}
						className="group bg-gradient-to-br from-slate-800/60 to-slate-800/40 p-4 rounded-lg border border-amber-500/20 hover:border-amber-500/50 hover:bg-gradient-to-br hover:from-slate-800/80 hover:to-slate-800/60 transition-all duration-300 text-left overflow-hidden col-span-1 sm:col-span-2 lg:col-span-2"
					>
						<div className="flex items-start gap-2">
							<span className="text-lg">🎯</span>
							<div className="flex-1 min-w-0">
								<h4 className="text-xs font-semibold text-amber-400 mb-1">
									Course Goal
								</h4>
								<p className="text-slate-300 truncate">
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
						className="group relative bg-gradient-to-br from-slate-800/60 to-slate-800/40 p-6 rounded-xl border border-sky-500/20 hover:border-sky-500/50 hover:bg-gradient-to-br hover:from-slate-800/80 hover:to-slate-800/60 transition-all duration-300 text-left overflow-hidden"
					>
						<div className="absolute top-0 right-0 w-20 h-20 bg-sky-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
						<div className="relative z-10">
							<div className="flex items-center gap-2 mb-2">
								<span className="text-xl">📍</span>
								<h3 className="text-lg font-semibold text-sky-400">
									Where I Am Now
								</h3>
							</div>
							<p className="text-slate-300 leading-relaxed">
								{userData.whereIAmNow || "Click to add..."}
							</p>
						</div>
					</button>

					<button
						type="button"
						onClick={() => isEditMode && setEditingField("want")}
						disabled={!isEditMode}
						className="group relative bg-gradient-to-br from-slate-800/60 to-slate-800/40 p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-gradient-to-br hover:from-slate-800/80 hover:to-slate-800/60 transition-all duration-300 text-left overflow-hidden"
					>
						<div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
						<div className="relative z-10">
							<div className="flex items-center gap-2 mb-2">
								<span className="text-xl">🎯</span>
								<h3 className="text-lg font-semibold text-emerald-400">
									Where I Want To Be
								</h3>
							</div>
							<p className="text-slate-300 leading-relaxed">
								{userData.whereIWantToBe || "Click to add..."}
							</p>
						</div>
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

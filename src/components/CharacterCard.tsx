import type React from "react";
import { useState } from "react";
import EditModal from "@/components/EditModal.tsx";
import type { SheetData } from "@/data/sheet-data.tsx";

interface CharacterCardProps {
	userData: SheetData;
	onUpdate: (updates: Partial<SheetData>) => void;
	isEditMode?: boolean;
	isUpdating?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
	userData,
	onUpdate,
	isEditMode = true,
	isUpdating = false,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		username: userData.username || "",
	});

	const characterName = userData.username || "Unnamed Character";

	const handleSave = () => {
		onUpdate({
			username: formData.username,
		});
		setIsModalOpen(false);
	};

	return (
		<>
			<button
				type="button"
				onClick={() => isEditMode && setIsModalOpen(true)}
				disabled={!isEditMode}
				className={`card group w-full transition-all duration-300 ${
					isEditMode
						? "cursor-pointer hover:shadow-xl hover:border-base-300/60"
						: ""
				}`}
			>
				<div className="text-center space-y-3">
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary/90 to-secondary group-hover:from-primary/100 group-hover:to-secondary transition-all duration-300 line-clamp-2">
						{characterName}'s
					</h1>
					<p className="text-sm sm:text-base text-base-content/50 font-medium">
						Character Sheet
					</p>
				</div>
			</button>

			<EditModal
				isOpen={isModalOpen}
				title="Edit Basic Info"
				fields={[
					{
						name: "username",
						label: "Character Name",
						value: formData.username,
						onChange: (value) =>
							setFormData({ ...formData, username: String(value) }),
						placeholder: "Enter your character name",
					},
				]}
				onSave={handleSave}
				onCancel={() => setIsModalOpen(false)}
				isLoading={isUpdating}
			/>
		</>
	);
};

export default CharacterCard;

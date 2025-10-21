import type React from "react";
import { useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard.tsx";
import CoreAttributesChart from "@/components/CoreAttributesChart.tsx";
import FocusAreas from "@/components/FocusAreas.tsx";
import Header from "@/components/Header.tsx";
import Onboarding from "@/components/Onboarding.tsx";
import SheetManagerModal from "@/components/SheetManagerModal.tsx";
import StrategyComponent from "@/components/Strategy.tsx";
import SupportingPractices from "@/components/SupportingPractices.tsx";
import ThemeSwitcher from "@/components/ThemeSwitcher.tsx";
import type { SheetData } from "@/data/sheet-data.tsx";
import { useSheet } from "@/hooks/use-sheet.ts";

const Sheet: React.FC = () => {
	const {
		sheets,
		isLoading,
		error,
		addSheet,
		deleteSheet,
		updateHeader,
		addCoreAttribute,
		removeCoreAttribute,
		updateCoreAttribute,
		addFocusArea,
		removeFocusArea,
		updateFocusArea,
		addSupportingPractice,
		removeSupportingPractice,
		updateSupportingPractice,
		updateStrategyObject,
		uploadData,
		isUpdating,
	} = useSheet();
	const [selectedSheetId, setSelectedSheetId] = useState<number | null>(null);
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [showSheetManager, setShowSheetManager] = useState(false);
	const [isEditMode, setIsEditMode] = useState(true);

	useEffect(() => {
		if (sheets && sheets.length > 0 && selectedSheetId === null) {
			setSelectedSheetId(sheets[0].id);
		}
		if (
			selectedSheetId !== null &&
			sheets &&
			!sheets.some((s) => s.id === selectedSheetId)
		) {
			setSelectedSheetId(sheets[0]?.id ?? null);
		}
	}, [sheets, selectedSheetId]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const currentSheet = sheets?.find((s) => s.id === selectedSheetId);

	if (!currentSheet || showOnboarding) {
		return (
			<Onboarding
				sheets={sheets as SheetData[]}
				selectedSheetId={selectedSheetId}
				setSelectedSheetId={(id) => {
					setSelectedSheetId(id);
					setShowOnboarding(false);
				}}
				addSheet={addSheet}
				deleteSheet={deleteSheet}
				uploadData={uploadData}
			/>
		);
	}

	return (
		<div className="bg-base-100 text-base-content min-h-screen font-sans antialiased">
			<div className="sticky top-0 z-40 bg-base-200 backdrop-blur-sm border-b border-base-300 shadow-lg">
				<div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="text-2xl">🎮</div>
						<div>
							<h1 className="text-xl font-bold">
								{currentSheet?.username || "Character Sheet"}
							</h1>
							<p className="text-xs text-base-content/60">
								ID: {currentSheet?.id}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<ThemeSwitcher />
						<button
							type="button"
							onClick={() => setShowSheetManager(true)}
							className="inline-flex items-center gap-2 btn btn-ghost"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Manage Sheets</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
							<span>Manage</span>
						</button>
					</div>
				</div>
			</div>

			<main className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
				<CharacterCard
					userData={currentSheet}
					onUpdate={(updates) =>
						updateHeader({ sheetId: currentSheet.id, updates })
					}
					isEditMode={isEditMode}
					isUpdating={isUpdating}
				/>

				<Header
					userData={currentSheet}
					onUpdate={(updates) =>
						updateHeader({ sheetId: currentSheet.id, updates })
					}
					isUpdating={isUpdating}
					isEditMode={isEditMode}
				/>

				<CoreAttributesChart
					attributes={currentSheet.coreAttributes ?? []}
					sheetId={currentSheet.id}
					onAddAttribute={() =>
						addCoreAttribute({
							sheetId: currentSheet.id,
							name: "New Attribute",
						})
					}
					onRemoveAttribute={(index) =>
						removeCoreAttribute({ sheetId: currentSheet.id, index })
					}
					onUpdateAttribute={(index, attribute) =>
						updateCoreAttribute({ sheetId: currentSheet.id, index, attribute })
					}
					isUpdating={isUpdating}
					isEditMode={isEditMode}
				/>

				<FocusAreas
					focusAreas={currentSheet.focusAreas ?? []}
					onAddArea={() =>
						addFocusArea({ sheetId: currentSheet.id, name: "New Focus Area" })
					}
					onRemoveArea={(index) =>
						removeFocusArea({ sheetId: currentSheet.id, index })
					}
					onUpdateArea={(index, area) =>
						updateFocusArea({ sheetId: currentSheet.id, index, area })
					}
					isUpdating={isUpdating}
					isEditMode={isEditMode}
				/>

				<SupportingPractices
					practices={currentSheet.supportingPractices ?? []}
					onAddPractice={() =>
						addSupportingPractice({
							sheetId: currentSheet.id,
							name: "New Practice",
						})
					}
					onRemovePractice={(index) =>
						removeSupportingPractice({ sheetId: currentSheet.id, index })
					}
					onUpdatePractice={(index, practice) =>
						updateSupportingPractice({
							sheetId: currentSheet.id,
							index,
							practice,
						})
					}
					isUpdating={isUpdating}
					isEditMode={isEditMode}
				/>
				{currentSheet.strategy ? (
					<StrategyComponent
						strategy={currentSheet.strategy}
						onUpdateStrategy={(strategy) =>
							updateStrategyObject({ sheetId: currentSheet.id, strategy })
						}
						isUpdating={isUpdating}
						isEditMode={isEditMode}
					/>
				) : (
					<div className="card space-y-6">
						<div className="section-header">
							<span className="section-icon">🎯</span>
							<h3 className="section-title">Strategy</h3>
						</div>
						<p className="text-base-content/60 text-center">
							No strategy yet. Create one to set your goals!
						</p>
						<div className="flex justify-center">
							<button
								type="button"
								onClick={() =>
									isEditMode &&
									updateStrategyObject({
										sheetId: currentSheet.id,
										strategy: { name: "My Strategy", theme: "Growth" },
									})
								}
								disabled={!isEditMode}
								className="btn-add"
							>
								<span>✨</span> Create Strategy
							</button>
						</div>
					</div>
				)}
			</main>

			<SheetManagerModal
				isOpen={showSheetManager}
				sheets={sheets as SheetData[]}
				selectedSheetId={selectedSheetId}
				isEditMode={isEditMode}
				onSelectSheet={(id) => {
					setSelectedSheetId(id);
					setShowSheetManager(false);
				}}
				onAddSheet={(useTemplate) => {
					addSheet({
						username: "New Character",
						useTemplate,
					});
				}}
				onDeleteSheet={(id) => {
					deleteSheet(id);
				}}
				onUploadSheet={(file) => {
					uploadData(file);
				}}
				onToggleEditMode={() => setIsEditMode(!isEditMode)}
				onClose={() => setShowSheetManager(false)}
			/>
		</div>
	);
};

export default Sheet;

import type React from "react";
import { useId } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher.tsx";
import type { SheetData } from "@/data/sheet-data.tsx";

interface OnboardingProps {
	sheets: SheetData[];
	selectedSheetId: number | null;
	setSelectedSheetId: (id: number) => void;
	addSheet: (data: Partial<SheetData> & { useTemplate?: boolean }) => void;
	deleteSheet: (id: number) => void;
	uploadData: (file: File) => Promise<unknown>;
}

const Onboarding: React.FC<OnboardingProps> = ({
	sheets,
	selectedSheetId,
	setSelectedSheetId,
	addSheet,
	deleteSheet,
	uploadData,
}) => {
	const selectId = useId();
	const currentSheet = sheets.find((s) => s.id === selectedSheetId);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			uploadData(e.target.files[0]);
		}
	};

	return (
		<div className="bg-base-100 text-base-content min-h-screen">
			<div className="sticky top-0 z-40 bg-base-200 backdrop-blur-sm border-b border-base-300 shadow-lg">
				<div className=" p-4 flex items-center justify-end">
					<ThemeSwitcher />
				</div>
			</div>
			<div className="max-w-6xl mx-auto p-6 sm:p-8 w-full">
				{sheets.length === 0 && (
					<div className="space-y-12">
						<header className="text-center space-y-4 py-12">
							<div className="text-6xl mb-4">🎮</div>
							<h1 className="heading-xl mb-4">
								Your Real-Life Character Sheet
							</h1>
							<p className="text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
								Track your skills, habits, goals, and personal stats. Build the
								hero version of yourself with data-driven insights.
							</p>
						</header>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<button
								type="button"
								onClick={() =>
									addSheet({ username: "New Character", useTemplate: false })
								}
								className="card group hover:shadow-2xl transition-all duration-300"
							>
								<div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
									➕
								</div>
								<h3 className="text-2xl font-bold mb-3 text-primary">
									Start Empty
								</h3>
								<p className="text-base-content/70 mb-6 leading-relaxed">
									Create a new blank character sheet and build it from scratch
									at your own pace.
								</p>
								<div className="font-semibold inline-flex items-center gap-2 text-primary">
									Create Sheet
									<span className="group-hover:translate-x-1 transition-transform">
										→
									</span>
								</div>
							</button>

							<button
								type="button"
								onClick={() =>
									addSheet({ username: "New Character", useTemplate: true })
								}
								className="card group hover:shadow-2xl transition-all duration-300"
							>
								<div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
									✨
								</div>
								<h3 className="text-2xl font-bold mb-3 text-primary">
									Use Template
								</h3>
								<p className="text-base-content/70 mb-6 leading-relaxed">
									Start with a pre-filled template that includes example
									attributes, goals, and practices.
								</p>
								<div className="font-semibold inline-flex items-center gap-2 text-primary">
									Create From Template
									<span className="group-hover:translate-x-1 transition-transform">
										→
									</span>
								</div>
							</button>

							<label className="card group hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col">
								<div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 w-full text-center">
									📂
								</div>
								<h3 className="text-2xl text-center font-bold mb-3 text-primary">
									Import Progress
								</h3>
								<p className="text-base-content/70 mb-6 leading-relaxed">
									Already have a character sheet? Upload your saved data and
									continue your journey.
								</p>
								<div className="font-semibold inline-flex text-center gap-2 text-primary">
									Load Your Data
									<span className="group-hover:translate-x-1 transition-transform">
										→
									</span>
								</div>
								<input
									type="file"
									className="hidden"
									onChange={handleFileChange}
									accept=".json"
								/>
							</label>
						</div>
					</div>
				)}

				{sheets.length > 0 && (
					<div className="card">
						<div className="section-header">
							<span className="section-icon">📋</span>
							<h2 className="section-title">Your Sheets</h2>
						</div>

						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-base-300 rounded-lg">
								<label
									htmlFor={selectId}
									className="text-base-content font-semibold whitespace-nowrap"
								>
									Active Sheet:
								</label>
								<select
									id={selectId}
									value={selectedSheetId ?? ""}
									onChange={(e) => setSelectedSheetId(Number(e.target.value))}
									className="select select-bordered flex-1 max-w-xs"
								>
									{sheets.map((sheet) => (
										<option key={sheet.id} value={sheet.id}>
											{sheet.username || `Sheet #${sheet.id}`}
										</option>
									))}
								</select>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
								<button
									type="button"
									onClick={() =>
										addSheet({
											username: `Sheet ${sheets.length + 1}`,
											useTemplate: false,
										})
									}
									className="btn btn-lg btn-primary gap-2"
								>
									<span>➕</span> Empty
								</button>
								<button
									type="button"
									onClick={() =>
										addSheet({
											username: `Sheet ${sheets.length + 1}`,
											useTemplate: true,
										})
									}
									className="btn btn-lg btn-info gap-2"
								>
									<span>✨</span> Template
								</button>
								<label className="btn btn-lg btn-success gap-2 cursor-pointer">
									<span>📂</span> Upload
									<input
										type="file"
										className="hidden"
										onChange={handleFileChange}
										accept=".json"
									/>
								</label>
								<button
									type="button"
									onClick={() => {
										if (
											currentSheet &&
											window.confirm(
												`Are you sure you want to delete sheet "${
													currentSheet.username || currentSheet.id
												}"?`,
											)
										) {
											deleteSheet(currentSheet.id);
										}
									}}
									disabled={sheets.length === 1}
									className="btn btn-lg btn-error gap-2 disabled:opacity-50"
								>
									<span>🗑️</span> Delete
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Onboarding;

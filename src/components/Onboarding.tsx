import type React from "react";
import { useId } from "react";
import type { SheetData } from "@/data/sheet-data.tsx";

interface OnboardingProps {
	sheets: SheetData[];
	selectedSheetId: number | null;
	setSelectedSheetId: (id: number) => void;
	addSheet: (data: Partial<SheetData>) => void;
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
		<div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 min-h-screen flex items-center justify-center font-sans antialiased">
			<div className="max-w-5xl mx-auto p-6 sm:p-8 space-y-8 w-full">
				{sheets.length === 0 && (
					<header className="text-center space-y-4 mb-12">
						<div className="text-5xl mb-2">🎮</div>
						<h1 className="heading-xl mb-4">Your Real-Life Character Sheet</h1>
						<p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
							Track your skills, habits, goals, and personal stats. Build the
							hero version of yourself with data-driven insights.
						</p>
					</header>
				)}

				{sheets.length > 0 ? (
					<div className="card">
						<div className="section-header mb-8">
							<div className="section-icon">📋</div>
							<h2 className="section-title">Your Sheets</h2>
						</div>
						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
								<label
									htmlFor={selectId}
									className="text-slate-300 font-semibold whitespace-nowrap"
								>
									Active Sheet:
								</label>
								<select
									id={selectId}
									value={selectedSheetId ?? ""}
									onChange={(e) => setSelectedSheetId(Number(e.target.value))}
									className="select-field"
								>
									{sheets.map((sheet) => (
										<option key={sheet.id} value={sheet.id}>
											{sheet.username || `Sheet #${sheet.id}`}
										</option>
									))}
								</select>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<button
									type="button"
									onClick={() =>
										addSheet({ username: `Sheet ${sheets.length + 1}` })
									}
									className="btn-primary btn-icon justify-center"
								>
									<span>✨</span> Create New
								</button>
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
									className="btn-danger btn-icon justify-center disabled:opacity-50"
								>
									<span>🗑️</span> Delete
								</button>
								<label className="btn-success btn-icon justify-center cursor-pointer">
									<span>⬆️</span> Upload
									<input
										type="file"
										className="hidden"
										onChange={handleFileChange}
										accept=".json"
									/>
								</label>
							</div>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<button
							type="button"
							onClick={() => addSheet({ username: "New Character" })}
							className="group bg-gradient-to-br from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 p-8 sm:p-10 rounded-2xl shadow-2xl hover:shadow-sky-500/30 transition-all duration-300 border border-sky-500/20 text-left"
						>
							<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
								🚀
							</div>
							<h3 className="heading-md mb-3">Start Your Journey</h3>
							<p className="text-sky-100 mb-6 leading-relaxed">
								Create a new character sheet and begin mapping your personal
								stats, habits, and goals.
							</p>
							<div className="text-sky-200 font-semibold inline-flex items-center gap-2">
								Create New Sheet
								<span className="group-hover:translate-x-1 transition-transform">
									→
								</span>
							</div>
						</button>

						<label className="group bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 p-8 sm:p-10 rounded-2xl shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 border border-emerald-500/20 text-left cursor-pointer">
							<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
								📂
							</div>
							<h3 className="heading-md mb-3">Import Progress</h3>
							<p className="text-emerald-100 mb-6 leading-relaxed">
								Already have a character sheet? Upload your saved data and
								continue your journey.
							</p>
							<div className="text-emerald-200 font-semibold inline-flex items-center gap-2">
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
				)}
			</div>
		</div>
	);
};

export default Onboarding;

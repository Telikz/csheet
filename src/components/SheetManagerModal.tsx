import type React from "react";
import { useRef } from "react";
import type { SheetData } from "@/data/sheet-data.tsx";

interface SheetManagerModalProps {
	isOpen: boolean;
	sheets: SheetData[];
	selectedSheetId: number | null;
	isEditMode: boolean;
	onSelectSheet: (id: number) => void;
	onAddSheet: () => void;
	onDeleteSheet: (id: number) => void;
	onUploadSheet: (file: File) => void;
	onToggleEditMode: () => void;
	onClose: () => void;
}

const SheetManagerModal: React.FC<SheetManagerModalProps> = ({
	isOpen,
	sheets,
	selectedSheetId,
	isEditMode,
	onSelectSheet,
	onAddSheet,
	onDeleteSheet,
	onUploadSheet,
	onToggleEditMode,
	onClose,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	if (!isOpen) return null;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onUploadSheet(file);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	const handleExportSheet = (sheet: SheetData) => {
		const dataStr = JSON.stringify(sheet, null, 2);
		const dataBlob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(dataBlob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${sheet.username || "sheet"}-${sheet.id}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6 sm:p-8 max-w-2xl w-full mx-4 shadow-2xl">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl sm:text-3xl font-bold text-white">
						Manage Sheets
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-slate-400 hover:text-white transition-colors"
						title="Close"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Close</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div className="space-y-2 max-h-96 overflow-y-auto mb-6">
					{sheets.length === 0 ? (
						<p className="text-slate-400 text-center py-8">
							No sheets yet. Create one to get started!
						</p>
					) : (
						sheets.map((sheet) => (
							<div
								key={sheet.id}
								className={`p-4 rounded-lg border transition-all duration-300 flex items-center justify-between w-full ${
									selectedSheetId === sheet.id
										? "bg-sky-600/20 border-sky-500/50"
										: "bg-slate-700/30 border-slate-700/50"
								}`}
							>
								<button
									type="button"
									onClick={() => onSelectSheet(sheet.id)}
									className="flex-1 text-left hover:opacity-80 transition-opacity min-w-0"
								>
									<h3 className="font-semibold text-white truncate">
										{sheet.username || "Unnamed Sheet"}
									</h3>
									<p className="text-sm text-slate-400">
										ID: {sheet.id} • {sheet.coreAttributes?.length ?? 0}{" "}
										attributes
									</p>
								</button>
								<button
									type="button"
									onClick={() => {
										handleExportSheet(sheet);
									}}
									className="ml-2 p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 rounded transition-colors"
									title="Export sheet"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<title>Export</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 19V5m0 0l-7 7m7-7l7 7"
										/>
									</svg>
								</button>
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										onDeleteSheet(sheet.id);
									}}
									className="ml-2 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
									title="Delete sheet"
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
							</div>
						))
					)}
				</div>

				<div className="space-y-3 mb-4">
					<button
						type="button"
						onClick={onToggleEditMode}
						className={`w-full py-3 px-4 rounded-lg transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2 ${
							isEditMode
								? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white hover:shadow-lg hover:shadow-purple-500/50"
								: "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white hover:shadow-lg hover:shadow-orange-500/50"
						}`}
					>
						<span>{isEditMode ? "🔓" : "🔒"}</span>
						{isEditMode ? "Disable" : "Enable"} Edit Mode
					</button>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<button
						type="button"
						onClick={onAddSheet}
						className="flex-1 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/50 inline-flex items-center justify-center gap-2"
					>
						<span>➕</span> New Sheet
					</button>
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 inline-flex items-center justify-center gap-2"
					>
						<span>📤</span> Upload Sheet
					</button>
					<button
						type="button"
						onClick={onClose}
						className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
					>
						Close
					</button>
				</div>

				<input
					ref={fileInputRef}
					type="file"
					accept=".json"
					onChange={handleFileChange}
					className="hidden"
				/>
			</div>
		</div>
	);
};

export default SheetManagerModal;

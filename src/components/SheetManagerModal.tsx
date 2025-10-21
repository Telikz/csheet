import type React from "react";
import { useRef } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher.tsx";
import type { SheetData } from "@/data/sheet-data.tsx";

interface SheetManagerModalProps {
	isOpen: boolean;
	sheets: SheetData[];
	selectedSheetId: number | null;
	isEditMode: boolean;
	onSelectSheet: (id: number) => void;
	onAddSheet: (useTemplate?: boolean) => void;
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
			<div className="modal-content">
				<div className="flex items-center justify-between p-6 sm:p-8 border-b border-base-300 flex-shrink-0">
					<h2 className="text-2xl sm:text-3xl font-bold">Manage Sheets</h2>
					<div className="flex items-center gap-3">
						<ThemeSwitcher />
						<button
							type="button"
							onClick={onClose}
							className="btn btn-sm btn-ghost"
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
				</div>

				<div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-2">
					{sheets.length === 0 ? (
						<p className="text-base-content/60 text-center py-8">
							No sheets yet. Create one to get started!
						</p>
					) : (
						sheets.map((sheet) => (
							<div
								key={sheet.id}
								className={`p-4 rounded-lg border transition-all duration-300 flex items-center justify-between w-full ${
									selectedSheetId === sheet.id
										? "bg-primary/20 border-primary/50"
										: "bg-base-300 border-base-300"
								}`}
							>
								<button
									type="button"
									onClick={() => onSelectSheet(sheet.id)}
									className="flex-1 text-left hover:opacity-80 transition-opacity min-w-0"
								>
									<h3 className="font-semibold truncate">
										{sheet.username || "Unnamed Sheet"}
									</h3>
									<p className="text-sm text-base-content/60">
										ID: {sheet.id} • {sheet.coreAttributes?.length ?? 0}{" "}
										attributes
									</p>
								</button>
								<button
									type="button"
									onClick={() => {
										handleExportSheet(sheet);
									}}
									className="ml-2 btn btn-sm btn-ghost text-warning"
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
									className="ml-2 btn btn-sm btn-ghost text-error"
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

				<div className="p-6 sm:p-8 border-t border-base-300 space-y-3 flex-shrink-0">
					<button
						type="button"
						onClick={onToggleEditMode}
						className={`w-full btn btn-lg gap-2 font-semibold ${
							isEditMode ? "btn-secondary" : "btn-warning"
						}`}
					>
						<span>{isEditMode ? "🔓" : "🔒"}</span>
						{isEditMode ? "Disable" : "Enable"} Edit Mode
					</button>

					<div className="flex flex-col gap-3">
						<div className="flex flex-col sm:flex-row gap-3">
							<button
								type="button"
								onClick={() => onAddSheet(false)}
								className="flex-1 btn btn-lg btn-primary gap-2"
							>
								<span>➕</span> Empty Sheet
							</button>
							<button
								type="button"
								onClick={() => onAddSheet(true)}
								className="flex-1 btn btn-lg btn-info gap-2"
							>
								<span>✨</span> From Template
							</button>
						</div>
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="w-full btn btn-lg btn-success gap-2"
						>
							<span>📤</span> Upload Sheet
						</button>
						<button
							type="button"
							onClick={onClose}
							className="w-full btn btn-lg btn-neutral"
						>
							Close
						</button>
					</div>
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

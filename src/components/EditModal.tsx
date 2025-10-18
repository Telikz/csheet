import type React from "react";
import { useId } from "react";

interface EditModalProps {
	isOpen: boolean;
	title: string;
	fields: {
		name: string;
		label: string;
		type?: "text" | "textarea" | "number";
		value: string | number;
		onChange: (value: string | number) => void;
		placeholder?: string;
	}[];
	onSave: () => void;
	onCancel: () => void;
	isLoading?: boolean;
}

const EditModal: React.FC<EditModalProps> = ({
	isOpen,
	title,
	fields,
	onSave,
	onCancel,
	isLoading = false,
}) => {
	const modalId = useId();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden">
			<div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 max-w-xl w-full shadow-2xl flex flex-col max-h-[90vh]">
				<div className="p-6 sm:p-8 border-b border-slate-700/50">
					<h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
						{title}
					</h2>
				</div>

				<div className="flex-1 overflow-y-auto p-6 sm:p-8">
					<div className="space-y-4">
						{fields.map((field) => {
							const fieldId = `${modalId}-${field.name}`;
							const Component =
								field.type === "textarea" ? "textarea" : "input";

							return (
								<div key={field.name}>
									<label
										htmlFor={fieldId}
										className="block text-sm font-medium text-slate-300 mb-2"
									>
										{field.label}
									</label>
									{Component === "textarea" ? (
										<textarea
											id={fieldId}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											placeholder={field.placeholder}
											className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none h-24"
										/>
									) : (
										<input
											id={fieldId}
											type={field.type || "text"}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											placeholder={field.placeholder}
											className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
										/>
									)}
								</div>
							);
						})}
					</div>
				</div>

				<div className="flex gap-3 p-6 sm:p-8 border-t border-slate-700/50">
					<button
						type="button"
						onClick={onSave}
						disabled={isLoading}
						className="flex-1 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/50 disabled:shadow-none"
					>
						{isLoading ? "Saving..." : "Save"}
					</button>
					<button
						type="button"
						onClick={onCancel}
						disabled={isLoading}
						className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditModal;

import type React from "react";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

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

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="modal-content bg-base-200 max-w-xl flex flex-col max-h-[90vh]">
				<div className="p-6 sm:p-8 border-b border-base-300">
					<h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
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
										className="block text-sm font-medium text-base-content/70 mb-2"
									>
										{field.label}
									</label>
									{Component === "textarea" ? (
										<textarea
											id={fieldId}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											placeholder={field.placeholder}
											className="input-field bg-base-300 border-base-300 focus:border-primary focus:ring-primary resize-none h-24"
										/>
									) : (
										<input
											id={fieldId}
											type={field.type || "text"}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											placeholder={field.placeholder}
											className="input-field bg-base-300 border-base-300 focus:border-primary focus:ring-primary"
										/>
									)}
								</div>
							);
						})}
					</div>
				</div>

				<div className="flex gap-3 p-6 sm:p-8 border-t border-base-300">
					<button
						type="button"
						onClick={onSave}
						disabled={isLoading}
						className="flex-1 btn btn-lg btn-primary"
					>
						{isLoading ? "Saving..." : "Save"}
					</button>
					<button
						type="button"
						onClick={onCancel}
						disabled={isLoading}
						className="flex-1 btn btn-lg btn-neutral"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>,
		document.body,
	);
};

export default EditModal;

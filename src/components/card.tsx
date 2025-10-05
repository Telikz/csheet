import { type KeyboardEvent, useState } from "react";

export type CardProps = {
	title: string;
	desc: string;
	descLong: string;
};

export default function Card({ title, desc, descLong }: CardProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			toggleModal();
		}
	};

	return (
		<>
			<button
				className="card"
				onClick={toggleModal}
				onKeyDown={handleKeyDown}
				type="button"
			>
				<h3>{title}</h3>
				<p>{desc}</p>
			</button>

			{isOpen && (
				<button className="modal-backdrop" onClick={toggleModal} type="button">
					<div aria-modal="true" className="modal-content" role="dialog">
						<button
							className="close-button"
							onClick={toggleModal}
							type="button"
						>
							&times;
						</button>
						<h2>{title}</h2>
						<p>{descLong}</p>
					</div>
				</button>
			)}
		</>
	);
}

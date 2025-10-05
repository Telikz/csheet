import { useState } from "react";
import type { Skill, Strategy } from "@/data/sheet-data.tsx";

export default function Card({
	name,
	level,
	icon,
	summary,
	descriptionLong,
}: Skill | Strategy) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button className="card" onClick={toggleModal} type="button">
				<p className="card-icon">{icon}</p>
				<p className="card-level">{level} / 10</p>
				<h3>{name}</h3>
				<p>{summary}</p>
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
						<h2>{name}</h2>
						<p>{descriptionLong}</p>
					</div>
				</button>
			)}
		</>
	);
}

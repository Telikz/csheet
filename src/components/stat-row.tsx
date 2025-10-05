import { type KeyboardEvent, useState } from "react";

const MAX_LEVEL = 10;
const HUNDRED = 100;

export type StatProps = {
	icon: string;
	name: string;
	level: number;
	desc: string;
};

export default function StatRow({ icon, name, level, desc }: StatProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			toggleModal();
		}
	};

	const percent = (level / MAX_LEVEL) * HUNDRED;
	return (
		<>
			<tr
				className="cursor-pointer hover:bg-white/10"
				onClick={toggleModal}
				onKeyDown={handleKeyDown}
				tabIndex={0}
			>
				<td>
					{icon} {name}
				</td>
				<td>
					{level}/{MAX_LEVEL}
				</td>
				<td>
					<div className="bar">
						<div className="bar-fill" style={{ width: `${percent}%` }} />
					</div>
				</td>

				<td>{desc}</td>
			</tr>

			{isOpen && (
				<button className="modal-backdrop" onClick={toggleModal} type="button">
					<div className="modal-content">
						<button
							className="close-button"
							onClick={toggleModal}
							type="button"
						>
							&times;
						</button>
						<h2>
							{icon} {name}
						</h2>
						<p>{desc}</p>
					</div>
				</button>
			)}
		</>
	);
}

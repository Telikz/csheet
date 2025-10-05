import type { Skill, Strategy } from "@/data/sheet-data.tsx";
import Card from "./card.tsx";

export type GridProps = {
	title: string;
	data: (Skill | Strategy)[];
};

export default function Grid({ title, data }: GridProps) {
	return (
		<>
			<h2>{title}</h2>
			<div className="grid">
				{data.map((s) => {
					return (
						<Card
							id={s.id}
							key={s.id}
							level={s.level}
							icon={s.icon}
							summary={s.summary ?? ""}
							descriptionLong={s.descriptionLong ?? ""}
							name={s.name ?? ""}
						/>
					);
				})}
			</div>
		</>
	);
}

import Card, { type CardProps } from "./card.tsx";

export type GridProps = {
	title: string;
	data: CardProps[];
};

export default function Grid({ title, data }: GridProps) {
	return (
		<>
			<h2>{title}</h2>
			<div className="grid">
				{data.map((s) => (
					<Card
						desc={s.desc}
						descLong={s.descLong}
						key={s.title}
						title={s.title}
					/>
				))}
			</div>
		</>
	);
}

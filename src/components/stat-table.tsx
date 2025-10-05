import type { Attribute } from "@/data/sheet-data.tsx";
import StatRow from "./stat-row.tsx";

type StatTableProps = {
	title: string;
	data: Attribute[];
};

export default function StatTable({ title, data }: StatTableProps) {
	return (
		<>
			<h2>{title}</h2>
			<table className="stat-table">
				<thead>
					<tr>
						<th>Attribute</th>
						<th>Level</th>
						<th>Visualization</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{data.map((s, _idx) => (
						<StatRow
							id={s.id}
							key={s.id}
							icon={s.icon ?? ""}
							name={s.name ?? ""}
							level={s.level ?? 0}
							summary={s.summary ?? ""}
							descriptionLong={s.descriptionLong ?? ""}
						/>
					))}
				</tbody>
			</table>
		</>
	);
}

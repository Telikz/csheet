import StatRow, { type StatProps } from "./stat-row.tsx";

type StatTableProps = {
	title: string;
	data: StatProps[];
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
						<StatRow key={s.name} {...s} />
					))}
				</tbody>
			</table>
		</>
	);
}

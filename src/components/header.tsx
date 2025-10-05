import type { SheetData } from "@/data/sheet-data.tsx";

const Header = ({ data }: { data: SheetData }) => (
	<header>
		<h1>{data.username}</h1>
		<p className="subtitle">
			Age: {data.age} · Archetype: <strong>{data.archetype}</strong>
		</p>
	</header>
);

export default Header;

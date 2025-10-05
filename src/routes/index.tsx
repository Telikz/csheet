import { createFileRoute } from "@tanstack/react-router";
import FocusAreas from "@/components/focus-area.tsx";
import Grid from "@/components/grid.tsx";
import StatsTable from "@/components/stat-table.tsx";
import { paths, skills, stats } from "@/constants.ts";
import Header from "../components/header.tsx";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="sheet flex-1">
			<Header />
			<StatsTable data={stats} title={"🎲 Core Stats"} />
			<Grid data={skills} title={"Skills and Traits"} />
			<FocusAreas />
			<Grid data={paths} title={"🗺️ Strategy & Growth<"} />
		</div>
	);
}

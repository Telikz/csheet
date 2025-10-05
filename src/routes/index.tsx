import { createFileRoute } from "@tanstack/react-router";
import Grid from "@/components/grid.tsx";
import StatsTable from "@/components/stat-table.tsx";
import { useSheet } from "@/hooks/use-sheet.ts";
import Header from "../components/header.tsx";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { data, isLoading, error, createNewSheet, uploadData } = useSheet();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!data) {
		return (
			<div className="sheet flex-1 flex flex-col items-center justify-center">
				<h1 className="text-2xl mb-4">No data available</h1>
				<div className="flex gap-4">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							createNewSheet(1);
						}}
						type="button"
					>
						Create New Sheet
					</button>
					<label className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
						Upload Sheet
						<input
							type="file"
							className="hidden"
							onChange={(e) => {
								if (e.target.files) {
									uploadData(e.target.files[0]);
								}
							}}
						/>
					</label>
				</div>
			</div>
		);
	}

	return (
		<div className="sheet flex-1">
			<Header data={data} />
			<StatsTable data={data.attributes} title={"Attributes"} />
			<Grid data={data.skills} title={"Skills and Traits"} />
			<Grid data={data.strategies} title={"Strategies for Growth"} />
		</div>
	);
}

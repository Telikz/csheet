import { createFileRoute } from "@tanstack/react-router";
import Onboarding from "@/components/Onboarding.tsx";
import Sheet from "@/components/Sheet.tsx";
import { useSheet } from "@/hooks/use-sheet.ts";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { data, isLoading, error, createNewSheet, uploadData } = useSheet();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	if (!data)
		return (
			<Onboarding createNewSheet={createNewSheet} uploadData={uploadData} />
		);

	return <Sheet />;
}

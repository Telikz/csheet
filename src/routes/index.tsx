import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet.tsx";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return <Sheet />;
}

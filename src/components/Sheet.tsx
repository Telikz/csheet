import type React from "react";
import CoreAttributesChart from "@/components/CoreAttributesChart.tsx";
import FocusAreas from "@/components/FocusAreas.tsx";
import Header from "@/components/Header.tsx";
import StrategyComponent from "@/components/Strategy.tsx";
import SupportingPractices from "@/components/SupportingPractices.tsx";
import { useSheet } from "@/hooks/use-sheet.ts";

const Sheet: React.FC = () => {
	const { data: userData, isLoading, error } = useSheet();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!userData) {
		return <div>No sheet data available.</div>;
	}

	return (
		<div className="bg-slate-900 text-slate-300 min-h-screen font-sans antialiased">
			<main className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
				<Header userData={userData} />

				<CoreAttributesChart attributes={userData.coreAttributes ?? []} />

				<FocusAreas focusAreas={userData.focusAreas ?? []} />

				<SupportingPractices practices={userData.supportingPractices ?? []} />
				{userData.strategy && (
					<StrategyComponent strategy={userData.strategy} />
				)}
			</main>
		</div>
	);
};

export default Sheet;

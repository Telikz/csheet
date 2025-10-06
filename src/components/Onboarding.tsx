import type React from "react";

interface OnboardingProps {
	createNewSheet: (id: number) => void;
	uploadData: (file: File) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({
	createNewSheet,
	uploadData,
}) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			uploadData(e.target.files[0]);
		}
	};

	return (
		<div className="bg-slate-900 text-slate-300 min-h-screen flex items-center justify-center font-sans antialiased">
			<div className="max-w-4xl mx-auto p-8 space-y-8 text-center">
				<header>
					<h1 className="text-4xl font-bold text-white mb-4">
						Welcome to Your Real-Life Character Sheet
					</h1>
					<p className="text-lg text-slate-400">
						This isn’t about an imaginary hero — it’s about you. Build your
						real-life character: track your skills, achievements, goals, and
						stats.
					</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-slate-800 p-8 rounded-lg shadow-lg">
						<h3 className="text-2xl font-bold text-white mb-4">
							Start a New Chapter
						</h3>
						<p className="text-slate-400 mb-6">
							Create a new sheet and begin mapping your personal stats — habits,
							health, mindset, and goals. Every journey starts somewhere.
						</p>
						<button
							className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
							type="button"
							onClick={() => createNewSheet(1)}
						>
							Create New Sheet
						</button>
					</div>

					<div className="bg-slate-800 p-8 rounded-lg shadow-lg">
						<h3 className="text-2xl font-bold text-white mb-4">
							Load Your Progress
						</h3>
						<p className="text-slate-400 mb-6">
							Already started your real-life character journey? Upload your saved
							data and pick up right where you left off.
						</p>
						<label className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 cursor-pointer">
							Upload Data
							<input
								type="file"
								className="hidden"
								onChange={handleFileChange}
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
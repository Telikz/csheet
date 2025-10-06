import { z } from "zod";

// --- Utility Schemas for Re-use ---

// The schema for notes within attributes/practices (re-used from original)
const noteSchema = z.object({
	id: z.number(),
	note: z.string().optional(),
});

// --- New Schemas based on the provided JSON structure ---
export const coreAttributeSchema = z.object({
	id: z.number(),
	icon: z.string().optional(),
	name: z.string().optional(),
	level: z.number().min(0).max(10).optional(),
	summary: z.string().optional(),
	description: z.string().optional(),
	linkedFocusArea: z.string().optional(),
	notes: z.array(noteSchema).optional(),
});

export const focusAreaSchema = z.object({
	id: z.number(),
	name: z.string(),
	icon: z.string().optional(),
	theme: z.string().optional(),
	attributeLink: z.string().optional(),
	purpose: z.string().optional(),
	coreChallenge: z.string().optional(),
	keyPractices: z.array(z.string()).optional(),
	growthIndicator: z.string().optional(),
});

export const supportingPracticeSchema = z.object({
	id: z.number(),
	name: z.string(),
	icon: z.string().optional(),
	purpose: z.string().optional(),
	frequency: z.string().optional(),
	notes: z.array(noteSchema).optional(),
});

export const strategySchema = z.object({
	name: z.string().optional(),
	icon: z.string().optional(),
	theme: z.string().optional(),
	yearlyGoals: z.array(z.string()).optional(),
	quarterlyGoals: z
		.object({
			Q1: z.string().optional(),
			Q2: z.string().optional(),
			Q3: z.string().optional(),
			Q4: z.string().optional(),
		})
		.optional(),
	monthlyGoals: z.array(z.string()).optional(),
	weeklyGoals: z.array(z.string()).optional(),
	dailyGoals: z.array(z.string()).optional(),
});

// --- Main Schema ---

export const sheetDataSchema = z.object({
	id: z.number(),
	age: z.number().optional(),
	username: z.string().optional(),
	archetype: z.string().optional(),
	courseGoal: z.string().optional(),
	whereIAmNow: z.string().optional(),
	whereIWantToBe: z.string().optional(),

	// Renamed from 'attributes'
	coreAttributes: z.array(coreAttributeSchema).optional(),

	// Replaced 'skills' and 'strategies' arrays with new structures
	focusAreas: z.array(focusAreaSchema).optional(),
	supportingPractices: z.array(supportingPracticeSchema).optional(),
	strategy: strategySchema.optional(), // Now a single object
});

// --- Type Definitions ---

export type SheetData = z.infer<typeof sheetDataSchema>;
export type CoreAttribute = z.infer<typeof coreAttributeSchema>;
export type FocusArea = z.infer<typeof focusAreaSchema>;
export type SupportingPractice = z.infer<typeof supportingPracticeSchema>;
export type Strategy = z.infer<typeof strategySchema>;

// --- Storage Logic (Unchanged, but now using the new Schema) ---

const STORAGE_KEY = "sheet-data";

export const sheetDataStorage = {
	get(): SheetData | null {
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			if (!data) return null;

			const parsedData = JSON.parse(data);
			return sheetDataSchema.parse(parsedData);
		} catch (_error) {
			// console.error("Error retrieving sheet data:", error);
			return null;
		}
	},

	set(data: SheetData): void {
		try {
			// Validation ensures the data written conforms to the new schema
			const validatedData = sheetDataSchema.parse(data);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(validatedData));
		} catch (_error) {
			// console.error("Error saving sheet data:", error);
			throw new Error("Invalid sheet data format");
		}
	},

	clear(): void {
		localStorage.removeItem(STORAGE_KEY);
	},

	download(filename: string = "sheet-data.json"): void {
		const data = this.get();
		if (!data) {
			throw new Error("No sheet data to download");
		}

		const jsonString = JSON.stringify(data, null, 2);
		const blob = new Blob([jsonString], { type: "application/json" });
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	},

	upload(file: File): Promise<SheetData> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (event) => {
				try {
					if (!event.target?.result) {
						throw new Error("Failed to read file");
					}

					const jsonData = JSON.parse(event.target.result as string);
					// Validation using the new schema
					const validatedData = sheetDataSchema.parse(jsonData);

					this.set(validatedData);
					resolve(validatedData);
				} catch (_error) {
					// console.error("Error processing uploaded file:", error);
					reject(new Error("Invalid JSON file format"));
				}
			};

			reader.onerror = () => {
				reject(new Error("Error reading file"));
			};

			reader.readAsText(file);
		});
	},
};

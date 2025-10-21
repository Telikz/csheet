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
	username: z.string().optional(),
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

export const createDefaultSheet = (
	username: string = "New Character",
): SheetData => ({
	id: 0,
	username,
	whereIAmNow: undefined,
	whereIWantToBe: undefined,
	strategy: {
		name: "My Strategy",
		icon: "🎯",
		theme: undefined,
		dailyGoals: [],
		weeklyGoals: [],
		monthlyGoals: [],
		yearlyGoals: [],
	},
	coreAttributes: [
		{
			id: 1,
			name: "Strength",
			icon: "💪",
			level: 5,
			summary: "Click to edit",
		},
		{
			id: 2,
			name: "Intelligence",
			icon: "🧠",
			level: 5,
			summary: "Click to edit",
		},
		{
			id: 3,
			name: "Wisdom",
			icon: "🦉",
			level: 5,
			summary: "Click to edit",
		},
		{
			id: 4,
			name: "Charisma",
			icon: "✨",
			level: 5,
			summary: "Click to edit",
		},
		{
			id: 5,
			name: "Dexterity",
			icon: "🎯",
			level: 5,
			summary: "Click to edit",
		},
		{
			id: 6,
			name: "Endurance",
			icon: "🏃",
			level: 5,
			summary: "Click to edit",
		},
		{
			id: 7,
			name: "Creativity",
			icon: "🎨",
			level: 5,
			summary: "Click to edit",
		},
		{
			id: 8,
			name: "Resilience",
			icon: "🛡️",
			level: 5,
			summary: "Click to edit",
		},
	],
	focusAreas: [
		{
			id: 1,
			name: "Career",
			icon: "💼",
			purpose: "Click to edit",
			coreChallenge: "Click to edit",
			keyPractices: [],
			growthIndicator: "Click to edit",
		},
		{
			id: 2,
			name: "Health",
			icon: "🏥",
			purpose: "Click to edit",
			coreChallenge: "Click to edit",
			keyPractices: [],
			growthIndicator: "Click to edit",
		},
		{
			id: 3,
			name: "Relationships",
			icon: "❤️",
			purpose: "Click to edit",
			coreChallenge: "Click to edit",
			keyPractices: [],
			growthIndicator: "Click to edit",
		},
		{
			id: 4,
			name: "Learning",
			icon: "📚",
			purpose: "Click to edit",
			coreChallenge: "Click to edit",
			keyPractices: [],
			growthIndicator: "Click to edit",
		},
		{
			id: 5,
			name: "Finance",
			icon: "💰",
			purpose: "Click to edit",
			coreChallenge: "Click to edit",
			keyPractices: [],
			growthIndicator: "Click to edit",
		},
		{
			id: 6,
			name: "Adventure",
			icon: "🌍",
			purpose: "Click to edit",
			coreChallenge: "Click to edit",
			keyPractices: [],
			growthIndicator: "Click to edit",
		},
		{
			id: 7,
			name: "Spirituality",
			icon: "🧘",
			purpose: "Click to edit",
			coreChallenge: "Click to edit",
			keyPractices: [],
			growthIndicator: "Click to edit",
		},
		{
			id: 8,
			name: "Community",
			icon: "🤝",
			purpose: "Click to edit",
			coreChallenge: "Click to edit",
			keyPractices: [],
			growthIndicator: "Click to edit",
		},
	],
	supportingPractices: [
		{
			id: 1,
			name: "Meditation",
			icon: "🧘",
			frequency: "Click to edit",
			purpose: "Click to edit",
		},
		{
			id: 2,
			name: "Exercise",
			icon: "🏃",
			frequency: "Click to edit",
			purpose: "Click to edit",
		},
		{
			id: 3,
			name: "Reading",
			icon: "📖",
			frequency: "Click to edit",
			purpose: "Click to edit",
		},
		{
			id: 4,
			name: "Journaling",
			icon: "📝",
			frequency: "Click to edit",
			purpose: "Click to edit",
		},
		{
			id: 5,
			name: "Networking",
			icon: "👥",
			frequency: "Click to edit",
			purpose: "Click to edit",
		},
		{
			id: 6,
			name: "Cooking",
			icon: "🍳",
			frequency: "Click to edit",
			purpose: "Click to edit",
		},
		{
			id: 7,
			name: "Reflection",
			icon: "🪞",
			frequency: "Click to edit",
			purpose: "Click to edit",
		},
		{
			id: 8,
			name: "Music",
			icon: "🎵",
			frequency: "Click to edit",
			purpose: "Click to edit",
		},
	],
});

const SHEET_KEY_PREFIX = "csheet-";
const SHEET_IDS_KEY = "csheet-ids";

const getSheetKey = (id: number) => `${SHEET_KEY_PREFIX}${id}`;

// Helper to get all sheet IDs
const getSheetIds = (): number[] => {
	const ids = localStorage.getItem(SHEET_IDS_KEY);
	if (!ids) return [];
	try {
		return JSON.parse(ids) as number[];
	} catch {
		return [];
	}
};

// Helper to set all sheet IDs
const setSheetIds = (ids: number[]): void => {
	localStorage.setItem(SHEET_IDS_KEY, JSON.stringify(ids));
};

export const sheetDataStorage = {
	getAll(): SheetData[] {
		const ids = getSheetIds();
		const sheets: SheetData[] = [];

		for (const id of ids) {
			const sheet = this.get(id);
			if (sheet) {
				sheets.push(sheet);
			} else {
				// Clean up invalid ID if data is missing
				this.deleteId(id);
			}
		}

		return sheets;
	},

	get(id: number): SheetData | null {
		try {
			const data = localStorage.getItem(getSheetKey(id));
			if (!data) return null;

			const parsedData = JSON.parse(data);
			return sheetDataSchema.parse(parsedData);
		} catch (_error) {
			// console.error(`Error retrieving sheet data for ID ${id}:`, error);
			this.deleteId(id); // Clean up invalid data/key
			return null;
		}
	},

	set(data: SheetData): void {
		try {
			const validatedData = sheetDataSchema.parse(data);
			const key = getSheetKey(validatedData.id);
			localStorage.setItem(key, JSON.stringify(validatedData));

			// Ensure ID is tracked
			const ids = getSheetIds();
			if (!ids.includes(validatedData.id)) {
				setSheetIds([...ids, validatedData.id]);
			}
		} catch (_error) {
			// console.error("Error saving sheet data:", error);
			throw new Error("Invalid sheet data format");
		}
	},

	delete(id: number): void {
		localStorage.removeItem(getSheetKey(id));
		this.deleteId(id);
	},

	deleteId(id: number): void {
		const ids = getSheetIds();
		setSheetIds(ids.filter((i) => i !== id));
	},

	clearAll(): void {
		const ids = getSheetIds();
		for (const id of ids) {
			localStorage.removeItem(getSheetKey(id));
		}
		localStorage.removeItem(SHEET_IDS_KEY);
	},

	download(id: number, filename: string = `sheet-data-${id}.json`): void {
		const data = this.get(id);
		if (!data) {
			throw new Error(`No sheet data found for ID ${id} to download`);
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

					// Ensure the uploaded sheet has a unique ID if one is not present
					if (!validatedData.id) {
						validatedData.id = Math.floor(Math.random() * 1000000);
					}

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

import { z } from "zod";

export const sheetDataSchema = z.object({
	id: z.number(),
	age: z.number().optional(),
	username: z.string().optional(),
	archetype: z.string().optional(),
	attributes: z.array(
		z.object({
			id: z.number(),
			icon: z.string().optional(),
			name: z.string().optional(),
			level: z.number().min(0).max(10).optional(),
			summary: z.string().optional(),
			descriptionLong: z.string().optional(),
			descriptionShort: z.string().optional(),
			notes: z
				.array(
					z.object({
						id: z.number(),
						note: z.string().optional(),
					}),
				)
				.optional(),
		}),
	),
	skills: z.array(
		z.object({
			id: z.number(),
			name: z.string().optional(),
			icon: z.string().optional(),
			level: z.number().min(0).max(10).optional(),
			summary: z.string().optional(),
			descriptionLong: z.string().optional(),
			descriptionShort: z.string().optional(),
			notes: z
				.array(
					z.object({
						id: z.number(),
						note: z.string().optional(),
					}),
				)
				.optional(),
		}),
	),
	strategies: z.array(
		z.object({
			id: z.number(),
			name: z.string().optional(),
			icon: z.string().optional(),
			level: z.number().min(0).max(10).optional(),
			summary: z.string().optional(),
			descriptionLong: z.string().optional(),
			descriptionShort: z.string().optional(),
			notes: z
				.array(
					z.object({
						id: z.number(),
						note: z.string().optional(),
					}),
				)
				.optional(),
		}),
	),
});

export type SheetData = z.infer<typeof sheetDataSchema>;

// Fixed type definitions for the items within arrays
export type Attribute = z.infer<
	typeof sheetDataSchema.shape.attributes.element
>;
export type Skill = z.infer<typeof sheetDataSchema.shape.skills.element>;
export type Strategy = z.infer<typeof sheetDataSchema.shape.strategies.element>;

const STORAGE_KEY = "sheet-data";

export const sheetDataStorage = {
	get(): SheetData | null {
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			if (!data) return null;

			const parsedData = JSON.parse(data);
			return sheetDataSchema.parse(parsedData);
		} catch (error) {
			console.error("Error retrieving sheet data:", error);
			return null;
		}
	},

	set(data: SheetData): void {
		try {
			const validatedData = sheetDataSchema.parse(data);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(validatedData));
		} catch (error) {
			console.error("Error saving sheet data:", error);
			throw new Error("Invalid sheet data format");
		}
	},

	clear(): void {
		localStorage.removeItem(STORAGE_KEY);
	},

	// Fixed download method - removed duplicate parameter and fixed implementation
	download(filename: string = "sheet-data.json"): void {
		try {
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
		} catch (error) {
			console.error("Error downloading sheet data:", error);
			throw error;
		}
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
					const validatedData = sheetDataSchema.parse(jsonData);

					this.set(validatedData);
					resolve(validatedData);
				} catch (error) {
					console.error("Error processing uploaded file:", error);
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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	type CoreAttribute,
	type FocusArea,
	type SheetData,
	type Strategy,
	type SupportingPractice,
	sheetDataStorage,
} from "@/data/sheet-data.tsx";

const generateNumberId = () => Math.floor(Math.random() * 1000000);

const SHEET_DATA_QUERY_KEY = ["sheetData"];

export function useSheet() {
	const queryClient = useQueryClient();

	// 1. Query now fetches all sheets
	const {
		data: sheets,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: SHEET_DATA_QUERY_KEY,
		queryFn: () => sheetDataStorage.getAll(),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	// Helper to find and update a sheet in the collection, and update cache
	const updateSheetAndCache = async (
		sheetId: number,
		updateFn: (sheet: SheetData) => SheetData,
	): Promise<SheetData[]> => {
		const currentSheets =
			queryClient.getQueryData<SheetData[]>(SHEET_DATA_QUERY_KEY) || [];
		const sheetIndex = currentSheets.findIndex((s) => s.id === sheetId);

		if (sheetIndex === -1) {
			throw new Error(`Sheet with ID ${sheetId} not found`);
		}

		const sheetToUpdate = currentSheets[sheetIndex];
		const updatedSheet = updateFn(sheetToUpdate);

		// 1. Save the individual sheet to localStorage
		sheetDataStorage.set(updatedSheet);

		// 2. Update the collection in the cache
		const updatedSheets = [...currentSheets];
		updatedSheets[sheetIndex] = updatedSheet;
		return updatedSheets;
	};

	// --- Sheet Collection Mutations ---

	const addSheetMutation = useMutation({
		mutationFn: async (
			initialData: Partial<SheetData> = {},
		): Promise<SheetData[]> => {
			const newSheet: SheetData = {
				id: generateNumberId(),
				coreAttributes: [],
				focusAreas: [],
				supportingPractices: [],
				...initialData,
			};

			sheetDataStorage.set(newSheet);

			const currentSheets =
				queryClient.getQueryData<SheetData[]>(SHEET_DATA_QUERY_KEY) || [];
			return [...currentSheets, newSheet];
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const deleteSheetMutation = useMutation({
		mutationFn: async (sheetId: number): Promise<SheetData[]> => {
			sheetDataStorage.delete(sheetId);

			const currentSheets =
				queryClient.getQueryData<SheetData[]>(SHEET_DATA_QUERY_KEY) || [];
			return currentSheets.filter((s) => s.id !== sheetId);
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const updateSheetDataMutation = useMutation({
		mutationFn: async ({
			sheetId,
			newData,
		}: {
			sheetId: number;
			newData: Partial<SheetData>;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => ({
				...sheet,
				...newData,
			}));
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const clearAllDataMutation = useMutation({
		mutationFn: async (): Promise<SheetData[]> => {
			sheetDataStorage.clearAll();
			return [];
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const uploadDataMutation = useMutation({
		mutationFn: async (file: File): Promise<SheetData[]> => {
			const newSheet = await sheetDataStorage.upload(file);
			const currentSheets =
				queryClient.getQueryData<SheetData[]>(SHEET_DATA_QUERY_KEY) || [];

			// Replace existing sheet if ID matches, otherwise add new
			const existingIndex = currentSheets.findIndex(
				(s) => s.id === newSheet.id,
			);
			if (existingIndex !== -1) {
				const updatedSheets = [...currentSheets];
				updatedSheets[existingIndex] = newSheet;
				return updatedSheets;
			}

			return [...currentSheets, newSheet];
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const downloadData = (sheetId: number, filename?: string) => {
		sheetDataStorage.download(sheetId, filename);
	};

	// --- Item-Specific Mutations (now require sheetId) ---

	const addCoreAttributeMutation = useMutation({
		mutationFn: async ({
			sheetId,
			name = "",
		}: {
			sheetId: number;
			name?: string;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				const newAttribute: CoreAttribute = {
					id: generateNumberId(),
					name,
					level: 0,
				};
				return {
					...sheet,
					coreAttributes: [...(sheet.coreAttributes || []), newAttribute],
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const updateCoreAttributeMutation = useMutation({
		mutationFn: async ({
			sheetId,
			index,
			attribute,
		}: {
			sheetId: number;
			index: number;
			attribute: Partial<CoreAttribute>;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				if (!sheet.coreAttributes)
					throw new Error("No coreAttributes available");

				const updatedAttributes = [...sheet.coreAttributes];
				updatedAttributes[index] = {
					...updatedAttributes[index],
					...attribute,
				};

				return {
					...sheet,
					coreAttributes: updatedAttributes,
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const removeCoreAttributeMutation = useMutation({
		mutationFn: async ({
			sheetId,
			index,
		}: {
			sheetId: number;
			index: number;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				if (!sheet.coreAttributes)
					throw new Error("No coreAttributes available");

				const updatedAttributes = sheet.coreAttributes.filter(
					(_, i) => i !== index,
				);

				return {
					...sheet,
					coreAttributes: updatedAttributes,
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const addFocusAreaMutation = useMutation({
		mutationFn: async ({
			sheetId,
			name = "",
		}: {
			sheetId: number;
			name?: string;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				const newFocusArea: FocusArea = {
					id: generateNumberId(),
					name,
				};

				return {
					...sheet,
					focusAreas: [...(sheet.focusAreas || []), newFocusArea],
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const updateFocusAreaMutation = useMutation({
		mutationFn: async ({
			sheetId,
			index,
			area,
		}: {
			sheetId: number;
			index: number;
			area: Partial<FocusArea>;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				if (!sheet.focusAreas) throw new Error("No focus areas available");

				const updatedAreas = [...sheet.focusAreas];
				updatedAreas[index] = { ...updatedAreas[index], ...area };

				return {
					...sheet,
					focusAreas: updatedAreas,
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const removeFocusAreaMutation = useMutation({
		mutationFn: async ({
			sheetId,
			index,
		}: {
			sheetId: number;
			index: number;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				if (!sheet.focusAreas) throw new Error("No focus areas available");

				const updatedAreas = sheet.focusAreas.filter((_, i) => i !== index);

				return {
					...sheet,
					focusAreas: updatedAreas,
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const addSupportingPracticeMutation = useMutation({
		mutationFn: async ({
			sheetId,
			name = "",
		}: {
			sheetId: number;
			name?: string;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				const newPractice: SupportingPractice = {
					id: generateNumberId(),
					name,
				};

				return {
					...sheet,
					supportingPractices: [
						...(sheet.supportingPractices || []),
						newPractice,
					],
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const updateSupportingPracticeMutation = useMutation({
		mutationFn: async ({
			sheetId,
			index,
			practice,
		}: {
			sheetId: number;
			index: number;
			practice: Partial<SupportingPractice>;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				if (!sheet.supportingPractices)
					throw new Error("No supporting practices available");

				const updatedPractices = [...sheet.supportingPractices];
				updatedPractices[index] = {
					...updatedPractices[index],
					...practice,
				};

				return {
					...sheet,
					supportingPractices: updatedPractices,
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const removeSupportingPracticeMutation = useMutation({
		mutationFn: async ({
			sheetId,
			index,
		}: {
			sheetId: number;
			index: number;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				if (!sheet.supportingPractices)
					throw new Error("No supporting practices available");

				const updatedPractices = sheet.supportingPractices.filter(
					(_, i) => i !== index,
				);

				return {
					...sheet,
					supportingPractices: updatedPractices,
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const updateStrategyObjectMutation = useMutation({
		mutationFn: async ({
			sheetId,
			strategy,
		}: {
			sheetId: number;
			strategy: Partial<Strategy> | null;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => {
				const newStrategy = strategy
					? { ...sheet.strategy, ...strategy }
					: undefined;

				return {
					...sheet,
					strategy: newStrategy,
				};
			});
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	const updateHeaderMutation = useMutation({
		mutationFn: async ({
			sheetId,
			updates,
		}: {
			sheetId: number;
			updates: Partial<
				Pick<
					SheetData,
					| "username"
					| "age"
					| "archetype"
					| "courseGoal"
					| "whereIAmNow"
					| "whereIWantToBe"
				>
			>;
		}): Promise<SheetData[]> => {
			return updateSheetAndCache(sheetId, (sheet) => ({
				...sheet,
				...updates,
			}));
		},
		onSuccess: (updatedSheets) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedSheets);
		},
	});

	return {
		sheets, // Renamed data to sheets
		isLoading,
		error,
		refetch,

		// Sheet Collection Management
		addSheet: addSheetMutation.mutate,
		deleteSheet: deleteSheetMutation.mutate,
		updateSheetData: updateSheetDataMutation.mutate,
		clearAllData: clearAllDataMutation.mutate, // Renamed clearData to clearAllData
		downloadData,
		uploadData: uploadDataMutation.mutateAsync,

		// Header Mutations
		updateHeader: updateHeaderMutation.mutate,

		// Item-Specific Mutations (now require sheetId)
		addCoreAttribute: addCoreAttributeMutation.mutate,
		updateCoreAttribute: updateCoreAttributeMutation.mutate,
		removeCoreAttribute: removeCoreAttributeMutation.mutate,

		addFocusArea: addFocusAreaMutation.mutate,
		updateFocusArea: updateFocusAreaMutation.mutate,
		removeFocusArea: removeFocusAreaMutation.mutate,

		addSupportingPractice: addSupportingPracticeMutation.mutate,
		updateSupportingPractice: updateSupportingPracticeMutation.mutate,
		removeSupportingPractice: removeSupportingPracticeMutation.mutate,

		updateStrategyObject: updateStrategyObjectMutation.mutate,

		// Status Flags
		isCreating: addSheetMutation.isPending,
		isUpdating:
			updateSheetDataMutation.isPending || updateHeaderMutation.isPending,
		isClearing: clearAllDataMutation.isPending,
		isUploading: uploadDataMutation.isPending,
	};
}

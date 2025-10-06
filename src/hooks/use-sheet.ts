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

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: SHEET_DATA_QUERY_KEY,
		queryFn: () => sheetDataStorage.get(),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	const createNewSheetMutation = useMutation({
		mutationFn: async (id: number = 1): Promise<SheetData> => {
			const newSheet: SheetData = {
				id,
				coreAttributes: [],
				focusAreas: [],
				supportingPractices: [],
			};

			sheetDataStorage.set(newSheet);
			return newSheet;
		},
		onSuccess: (newSheet) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, newSheet);
		},
	});

	const updateDataMutation = useMutation({
		mutationFn: async (newData: SheetData): Promise<SheetData> => {
			sheetDataStorage.set(newData);
			return newData;
		},
		onSuccess: (newData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, newData);
		},
	});

	const clearDataMutation = useMutation({
		mutationFn: async (): Promise<null> => {
			sheetDataStorage.clear();
			return null;
		},
		onSuccess: () => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, null);
		},
	});

	const uploadDataMutation = useMutation({
		mutationFn: async (file: File): Promise<SheetData> => {
			return await sheetDataStorage.upload(file);
		},
		onSuccess: (newData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, newData);
		},
	});

	const downloadData = (filename?: string) => {
		if (!data) {
			throw new Error("No sheet data to download");
		}

		sheetDataStorage.download(filename);
	};

	const addCoreAttributeMutation = useMutation({
		mutationFn: async (name: string = ""): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData) throw new Error("No sheet data available");

			const newAttribute: CoreAttribute = {
				id: generateNumberId(),
				name,
				level: 0,
			};

			const updatedData: SheetData = {
				...currentData,
				coreAttributes: [...(currentData.coreAttributes || []), newAttribute],
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	const updateCoreAttributeMutation = useMutation({
		mutationFn: async ({
			index,
			attribute,
		}: {
			index: number;
			attribute: Partial<CoreAttribute>;
		}): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.coreAttributes)
				throw new Error("No coreAttributes available");

			const updatedAttributes = [...currentData.coreAttributes];
			updatedAttributes[index] = { ...updatedAttributes[index], ...attribute };

			const updatedData: SheetData = {
				...currentData,
				coreAttributes: updatedAttributes,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	const removeCoreAttributeMutation = useMutation({
		mutationFn: async (index: number): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.coreAttributes)
				throw new Error("No coreAttributes available");

			const updatedAttributes = currentData.coreAttributes.filter(
				(_, i) => i !== index,
			);

			const updatedData: SheetData = {
				...currentData,
				coreAttributes: updatedAttributes,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	const addFocusAreaMutation = useMutation({
		mutationFn: async (name: string = ""): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData) throw new Error("No sheet data available");

			const newFocusArea: FocusArea = {
				id: generateNumberId(),
				name,
			};

			const updatedData: SheetData = {
				...currentData,
				focusAreas: [...(currentData.focusAreas || []), newFocusArea],
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	const updateFocusAreaMutation = useMutation({
		mutationFn: async ({
			index,
			area,
		}: {
			index: number;
			area: Partial<FocusArea>;
		}): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.focusAreas)
				throw new Error("No focus areas available");

			const updatedAreas = [...currentData.focusAreas];
			updatedAreas[index] = { ...updatedAreas[index], ...area };

			const updatedData: SheetData = {
				...currentData,
				focusAreas: updatedAreas,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	const removeFocusAreaMutation = useMutation({
		mutationFn: async (index: number): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.focusAreas)
				throw new Error("No focus areas available");

			const updatedAreas = currentData.focusAreas.filter((_, i) => i !== index);

			const updatedData: SheetData = {
				...currentData,
				focusAreas: updatedAreas,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	const addSupportingPracticeMutation = useMutation({
		mutationFn: async (name: string = ""): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData) throw new Error("No sheet data available");

			const newPractice: SupportingPractice = {
				id: generateNumberId(),
				name,
			};

			const updatedData: SheetData = {
				...currentData,
				supportingPractices: [
					...(currentData.supportingPractices || []),
					newPractice,
				],
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	const updateSupportingPracticeMutation = useMutation({
		mutationFn: async ({
			index,
			practice,
		}: {
			index: number;
			practice: Partial<SupportingPractice>;
		}): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.supportingPractices)
				throw new Error("No supporting practices available");

			const updatedPractices = [...currentData.supportingPractices];
			updatedPractices[index] = { ...updatedPractices[index], ...practice };

			const updatedData: SheetData = {
				...currentData,
				supportingPractices: updatedPractices,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	const removeSupportingPracticeMutation = useMutation({
		mutationFn: async (index: number): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.supportingPractices)
				throw new Error("No supporting practices available");

			const updatedPractices = currentData.supportingPractices.filter(
				(_, i) => i !== index,
			);

			const updatedData: SheetData = {
				...currentData,
				supportingPractices: updatedPractices,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	const updateStrategyObjectMutation = useMutation({
		mutationFn: async (
			strategy: Partial<Strategy> | null,
		): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData) throw new Error("No sheet data available");

			const newStrategy = strategy
				? { ...currentData.strategy, ...strategy }
				: undefined;

			const updatedData: SheetData = {
				...currentData,
				strategy: newStrategy,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	return {
		data,
		isLoading,
		error,
		refetch,
		createNewSheet: createNewSheetMutation.mutate,
		updateData: updateDataMutation.mutate,
		clearData: clearDataMutation.mutate,
		downloadData,
		uploadData: uploadDataMutation.mutateAsync,

		// Renamed/Updated CoreAttribute Mutations
		addCoreAttribute: addCoreAttributeMutation.mutate,
		updateCoreAttribute: updateCoreAttributeMutation.mutate,
		removeCoreAttribute: removeCoreAttributeMutation.mutate,

		// New FocusArea Mutations
		addFocusArea: addFocusAreaMutation.mutate,
		updateFocusArea: updateFocusAreaMutation.mutate,
		removeFocusArea: removeFocusAreaMutation.mutate,

		// New SupportingPractice Mutations
		addSupportingPractice: addSupportingPracticeMutation.mutate,
		updateSupportingPractice: updateSupportingPracticeMutation.mutate,
		removeSupportingPractice: removeSupportingPracticeMutation.mutate,

		// New Strategy Object Mutation
		updateStrategyObject: updateStrategyObjectMutation.mutate,

		// Status Flags
		isCreating: createNewSheetMutation.isPending,
		isUpdating: updateDataMutation.isPending,
		isClearing: clearDataMutation.isPending,
		isUploading: uploadDataMutation.isPending,
	};
}

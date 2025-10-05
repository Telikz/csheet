// src/hooks/useSheetDataQuery.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	type Attribute,
	type SheetData,
	type Skill,
	type Strategy,
	sheetDataStorage,
} from "@/data/sheet-data.tsx";

// Helper functions for generating unique IDs
const generateStringId = () => Math.random().toString(36).substring(2, 9);
const generateNumberId = () => Math.floor(Math.random() * 1000000);

// Base query key
const SHEET_DATA_QUERY_KEY = ["sheetData"];

export function useSheetDataQuery() {
	const queryClient = useQueryClient();

	// Query for getting sheet data
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: SHEET_DATA_QUERY_KEY,
		queryFn: () => sheetDataStorage.get(),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	// Mutation for creating a new sheet
	const createNewSheetMutation = useMutation({
		mutationFn: async (id: number = 1): Promise<SheetData> => {
			const newSheet: SheetData = {
				id,
				attributes: [],
				skills: [],
				strategies: [],
			};

			sheetDataStorage.set(newSheet);
			return newSheet;
		},
		onSuccess: (newSheet) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, newSheet);
		},
	});

	// Mutation for updating sheet data
	const updateDataMutation = useMutation({
		mutationFn: async (newData: SheetData): Promise<SheetData> => {
			sheetDataStorage.set(newData);
			return newData;
		},
		onSuccess: (newData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, newData);
		},
	});

	// Mutation for clearing sheet data
	const clearDataMutation = useMutation({
		mutationFn: async (): Promise<null> => {
			sheetDataStorage.clear();
			return null;
		},
		onSuccess: () => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, null);
		},
	});

	// Mutation for uploading sheet data
	const uploadDataMutation = useMutation({
		mutationFn: async (file: File): Promise<SheetData> => {
			return await sheetDataStorage.upload(file);
		},
		onSuccess: (newData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, newData);
		},
	});

	// Function to download sheet data - Fixed to only pass filename
	const downloadData = (filename?: string) => {
		if (!data) {
			throw new Error("No sheet data to download");
		}

		sheetDataStorage.download(filename);
	};

	// Mutation for adding an attribute
	const addAttributeMutation = useMutation({
		mutationFn: async (name: string = ""): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData) throw new Error("No sheet data available");

			const newAttribute: Attribute = {
				id: generateStringId(),
				name,
				notes: [],
			};

			const updatedData: SheetData = {
				...currentData,
				attributes: [...(currentData.attributes || []), newAttribute],
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	// Mutation for updating an attribute
	const updateAttributeMutation = useMutation({
		mutationFn: async ({
			index,
			attribute,
		}: {
			index: number;
			attribute: Partial<Attribute>;
		}): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.attributes)
				throw new Error("No attributes available");

			const updatedAttributes = [...currentData.attributes];
			updatedAttributes[index] = { ...updatedAttributes[index], ...attribute };

			const updatedData: SheetData = {
				...currentData,
				attributes: updatedAttributes,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	// Mutation for removing an attribute
	const removeAttributeMutation = useMutation({
		mutationFn: async (index: number): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.attributes)
				throw new Error("No attributes available");

			const updatedAttributes = currentData.attributes.filter(
				(_, i) => i !== index,
			);

			const updatedData: SheetData = {
				...currentData,
				attributes: updatedAttributes,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	// Mutation for adding a skill
	const addSkillMutation = useMutation({
		mutationFn: async ({
			name = "",
			level = 0,
		}: {
			name?: string;
			level?: number;
		} = {}): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData) throw new Error("No sheet data available");

			const newSkill: Skill = {
				id: generateNumberId(),
				name,
				level,
				notes: [],
			};

			const updatedData: SheetData = {
				...currentData,
				skills: [...(currentData.skills || []), newSkill],
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	// Mutation for updating a skill
	const updateSkillMutation = useMutation({
		mutationFn: async ({
			index,
			skill,
		}: {
			index: number;
			skill: Partial<Skill>;
		}): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.skills)
				throw new Error("No skills available");

			const updatedSkills = [...currentData.skills];
			updatedSkills[index] = { ...updatedSkills[index], ...skill };

			const updatedData: SheetData = {
				...currentData,
				skills: updatedSkills,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	// Mutation for removing a skill
	const removeSkillMutation = useMutation({
		mutationFn: async (index: number): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.skills)
				throw new Error("No skills available");

			const updatedSkills = currentData.skills.filter((_, i) => i !== index);

			const updatedData: SheetData = {
				...currentData,
				skills: updatedSkills,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	// Mutation for adding a strategy - Fixed to use number ID
	const addStrategyMutation = useMutation({
		mutationFn: async (name: string = ""): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData) throw new Error("No sheet data available");

			const newStrategy: Strategy = {
				id: generateNumberId(), // Changed from generateStringId to generateNumberId
				name,
				notes: [],
			};

			const updatedData: SheetData = {
				...currentData,
				strategies: [...(currentData.strategies || []), newStrategy],
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	// Mutation for updating a strategy
	const updateStrategyMutation = useMutation({
		mutationFn: async ({
			index,
			strategy,
		}: {
			index: number;
			strategy: Partial<Strategy>;
		}): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.strategies)
				throw new Error("No strategies available");

			const updatedStrategies = [...currentData.strategies];
			updatedStrategies[index] = { ...updatedStrategies[index], ...strategy };

			const updatedData: SheetData = {
				...currentData,
				strategies: updatedStrategies,
			};

			sheetDataStorage.set(updatedData);
			return updatedData;
		},
		onSuccess: (updatedData) => {
			queryClient.setQueryData(SHEET_DATA_QUERY_KEY, updatedData);
		},
	});

	// Mutation for removing a strategy
	const removeStrategyMutation = useMutation({
		mutationFn: async (index: number): Promise<SheetData> => {
			const currentData =
				queryClient.getQueryData<SheetData>(SHEET_DATA_QUERY_KEY);
			if (!currentData || !currentData.strategies)
				throw new Error("No strategies available");

			const updatedStrategies = currentData.strategies.filter(
				(_, i) => i !== index,
			);

			const updatedData: SheetData = {
				...currentData,
				strategies: updatedStrategies,
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
		addAttribute: addAttributeMutation.mutate,
		updateAttribute: updateAttributeMutation.mutate,
		removeAttribute: removeAttributeMutation.mutate,
		addSkill: addSkillMutation.mutate,
		updateSkill: updateSkillMutation.mutate,
		removeSkill: removeSkillMutation.mutate,
		addStrategy: addStrategyMutation.mutate,
		updateStrategy: updateStrategyMutation.mutate,
		removeStrategy: removeStrategyMutation.mutate,
		isCreating: createNewSheetMutation.isPending,
		isUpdating: updateDataMutation.isPending,
		isClearing: clearDataMutation.isPending,
		isUploading: uploadDataMutation.isPending,
	};
}

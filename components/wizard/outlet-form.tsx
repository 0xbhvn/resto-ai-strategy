'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { RefObject } from 'react';

const outletFormSchema = z.object({
	name: z.string().min(2, 'Restaurant name must be at least 2 characters'),
	type: z.enum(['restaurant', 'cafe', 'cloud'], {
		required_error: 'Please select a restaurant type',
	}),
	location: z.string().min(3, 'Please enter a valid location'),
});

export type OutletFormValues = z.infer<typeof outletFormSchema>;

const defaultValues: Partial<OutletFormValues> = {
	name: '',
	type: 'restaurant',
	location: '',
};

interface OutletFormProps {
	onSubmit: (values: OutletFormValues) => void;
	formRef?: RefObject<HTMLFormElement | null>;
}

export function OutletForm({ onSubmit, formRef }: OutletFormProps) {
	const form = useForm<OutletFormValues>({
		resolver: zodResolver(outletFormSchema),
		defaultValues,
	});

	return (
		<Form {...form}>
			<form
				ref={formRef}
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Restaurant Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your restaurant name"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This will be the name that appears on your
								dashboard.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Restaurant Type</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="restaurant" />
										</FormControl>
										<FormLabel className="font-normal">
											Restaurant
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="cafe" />
										</FormControl>
										<FormLabel className="font-normal">
											Café-bistro
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="cloud" />
										</FormControl>
										<FormLabel className="font-normal">
											Cloud-kitchen
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel>City & Neighborhood</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g. Mumbai, Bandra"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This helps us provide relevant recommendations
								for your area.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}

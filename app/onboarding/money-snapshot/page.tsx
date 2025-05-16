'use client';

import { useRouter } from 'next/navigation';
import { WizardLayout } from '@/components/wizard/wizard-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Schema based on the Money Snapshot section (P0 questions #11, #15, #17, #18) from the master question bank
const moneySnapshotSchema = z.object({
	monthlySales: z
		.string()
		.min(1, 'Monthly sales are required')
		.refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 10000, {
			message: 'Monthly sales must be at least ₹10,000',
		}),
	avgTicket: z
		.string()
		.min(1, 'Average ticket size is required')
		.refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 50, {
			message: 'Average ticket size must be at least ₹50',
		}),
	foodCost: z
		.string()
		.min(1, 'Food cost percentage is required')
		.refine(
			(val) =>
				!Number.isNaN(Number(val)) &&
				Number(val) >= 10 &&
				Number(val) <= 90,
			{
				message: 'Food cost must be between 10-90%',
			}
		),
	laborCost: z
		.string()
		.min(1, 'Labor cost percentage is required')
		.refine(
			(val) =>
				!Number.isNaN(Number(val)) &&
				Number(val) >= 5 &&
				Number(val) <= 60,
			{
				message: 'Labor cost must be between 5-60%',
			}
		),
});

type MoneySnapshotFormValues = z.infer<typeof moneySnapshotSchema>;

export default function MoneySnapshotPage() {
	const router = useRouter();
	const currentStep = 3;
	const totalSteps = 4;

	const form = useForm<MoneySnapshotFormValues>({
		resolver: zodResolver(moneySnapshotSchema),
		defaultValues: {
			monthlySales: '',
			avgTicket: '',
			foodCost: '',
			laborCost: '',
		},
	});

	const onSubmit = (values: MoneySnapshotFormValues) => {
		console.log('Money snapshot values:', values);
		// In a real app, you would submit this data to your API
		router.push('/onboarding/wizard');
	};

	return (
		<WizardLayout
			title="Money Snapshot"
			description="Let's understand your restaurant's financial health to provide tailored strategies."
			currentStep={currentStep}
			totalSteps={totalSteps}
			onBack={() => router.push('/onboarding/integrations')}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<Card className="border-blue-100 bg-blue-50/30">
						<CardContent className="pt-4 pb-2">
							<p className="text-sm text-blue-600">
								These metrics help us calculate growth
								opportunities for your business. All information
								is encrypted and secure.
							</p>
						</CardContent>
					</Card>

					<FormField
						control={form.control}
						name="monthlySales"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Last Month&apos;s Gross Sales (₹)
								</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. 150000"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Your total revenue from the previous month
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="avgTicket"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Average Ticket Size (₹)</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. 380"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									The average amount customers spend per order
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="foodCost"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Food Cost Percentage (%)</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. 30"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Cost of ingredients as a percentage of sales
									(10-90%)
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="laborCost"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Labor Cost Percentage (%)</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. 25"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Staff wages as a percentage of sales (5-60%)
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="pt-4">
						<Button
							type="submit"
							className="w-full"
						>
							Continue
						</Button>
					</div>
				</form>
			</Form>
		</WizardLayout>
	);
}

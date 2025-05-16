'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const wizardSchema = z.object({
	cuisine: z.string(),
	years: z.string(),
	painPoint: z.string(),
	focusArea: z.enum(['profits', 'orders', 'customers']),
});

type WizardFormValues = z.infer<typeof wizardSchema>;

export default function WizardPage() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('identity');
	const formRef = useRef<HTMLFormElement>(null);
	const [isNavigating, setIsNavigating] = useState(false);

	const form = useForm<WizardFormValues>({
		resolver: zodResolver(wizardSchema),
		defaultValues: {
			cuisine: '',
			years: '',
			painPoint: '',
			focusArea: 'profits',
		},
	});

	// Force navigation to dashboard if the isNavigating state is true
	useEffect(() => {
		if (isNavigating) {
			// Store form data in localStorage before navigating
			const formData = form.getValues();
			localStorage.setItem('wizardFormData', JSON.stringify(formData));

			// Try both navigation methods
			router.push('/dashboard');

			// Fallback to direct navigation after a short delay
			const timer = setTimeout(() => {
				window.location.href = '/dashboard';
			}, 300);

			return () => clearTimeout(timer);
		}
	}, [isNavigating, router, form]);

	const handleSubmit = (values: WizardFormValues) => {
		console.log(values);
		setIsNavigating(true);
	};

	const nextTab = () => {
		if (activeTab === 'identity') {
			setActiveTab('goals');
		} else {
			form.handleSubmit(handleSubmit)();
		}
	};

	const previousTab = () => {
		if (activeTab === 'goals') {
			setActiveTab('identity');
		} else {
			router.push('/onboarding/money-snapshot');
		}
	};

	return (
		<>
			<CardHeader>
				<CardTitle className="text-2xl font-semibold">
					Essential Information
				</CardTitle>
				<p className="text-muted-foreground text-sm mt-1">
					We need a few key details to personalize your Nitify
					experience.
				</p>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form
						className="space-y-6"
						ref={formRef}
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className="w-full"
						>
							<TabsList className="grid grid-cols-2 mb-6">
								<TabsTrigger value="identity">
									Identity
								</TabsTrigger>
								<TabsTrigger value="goals">
									Goals & Pain
								</TabsTrigger>
							</TabsList>

							<TabsContent
								value="identity"
								className="space-y-4"
							>
								<div className="text-sm text-muted-foreground mb-4">
									Tell us about your restaurant&apos;s
									identity.
								</div>

								<FormField
									control={form.control}
									name="cuisine"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Primary Cuisine or Concept
											</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g. North Indian, Italian, Fast Food"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Your main cuisine style or
												restaurant concept
											</FormDescription>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="years"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Years in Operation
											</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g. 2"
													type="number"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												How long has your restaurant
												been operating?
											</FormDescription>
										</FormItem>
									)}
								/>
							</TabsContent>

							<TabsContent
								value="goals"
								className="space-y-4"
							>
								<div className="text-sm text-muted-foreground mb-4">
									What are your main goals and challenges?
								</div>

								<FormField
									control={form.control}
									name="painPoint"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Biggest Pain Point
											</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g. High food cost, low repeat customers"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												What&apos;s your biggest
												challenge right now?
											</FormDescription>
										</FormItem>
									)}
								/>

								<div className="pt-4">
									<FormField
										control={form.control}
										name="focusArea"
										render={({ field }) => (
											<FormItem className="space-y-3">
												<FormLabel className="mb-3 inline-block">
													Priority Focus Areas
												</FormLabel>
												<FormControl>
													<RadioGroup
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
														className="flex flex-col space-y-3"
													>
														<FormItem className="flex items-center space-x-3 space-y-0">
															<FormControl>
																<RadioGroupItem value="profits" />
															</FormControl>
															<FormLabel className="font-normal">
																Increase
																profitability
															</FormLabel>
														</FormItem>
														<FormItem className="flex items-center space-x-3 space-y-0">
															<FormControl>
																<RadioGroupItem value="orders" />
															</FormControl>
															<FormLabel className="font-normal">
																Get more orders
															</FormLabel>
														</FormItem>
														<FormItem className="flex items-center space-x-3 space-y-0">
															<FormControl>
																<RadioGroupItem value="customers" />
															</FormControl>
															<FormLabel className="font-normal">
																Improve customer
																retention
															</FormLabel>
														</FormItem>
													</RadioGroup>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</TabsContent>
						</Tabs>
					</form>
				</Form>
			</CardContent>

			<CardFooter className="flex justify-between">
				<Button
					variant="outline"
					onClick={previousTab}
					type="button"
				>
					Back
				</Button>
				{activeTab === 'goals' ? (
					<Button
						onClick={() => setIsNavigating(true)}
						type="button"
						disabled={isNavigating}
					>
						{isNavigating ? 'Navigating...' : 'Complete'}
					</Button>
				) : (
					<Button
						onClick={nextTab}
						type="button"
					>
						Next
					</Button>
				)}
			</CardFooter>
		</>
	);
}

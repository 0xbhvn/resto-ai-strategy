'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WizardLayout } from '@/components/wizard/wizard-layout';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const basicFormSchema = z.object({
	sales: z.string().min(1, 'Monthly sales are required'),
	avgTicket: z.string().min(1, 'Average ticket size is required'),
	foodCost: z.string().min(1, 'Food cost percentage is required'),
	laborCost: z.string().min(1, 'Labor cost percentage is required'),
	painPoint: z.string().optional(),
});

type BasicFormValues = z.infer<typeof basicFormSchema>;

export default function WizardPage() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const totalSteps = 3;
	const [activeTab, setActiveTab] = useState('identity');

	const form = useForm<BasicFormValues>({
		resolver: zodResolver(basicFormSchema),
		defaultValues: {
			sales: '',
			avgTicket: '',
			foodCost: '',
			laborCost: '',
			painPoint: '',
		},
	});

	const handleSubmit = (values: BasicFormValues) => {
		console.log(values);
		router.push('/dashboard');
	};

	const nextTab = () => {
		if (activeTab === 'identity') {
			setActiveTab('financials');
			setStep(2);
		} else if (activeTab === 'financials') {
			setActiveTab('goals');
			setStep(3);
		} else {
			form.handleSubmit(handleSubmit)();
		}
	};

	const previousTab = () => {
		if (activeTab === 'financials') {
			setActiveTab('identity');
			setStep(1);
		} else if (activeTab === 'goals') {
			setActiveTab('financials');
			setStep(2);
		}
	};

	return (
		<WizardLayout
			title="Essential Information"
			description="We need a few key details to personalize your Nitify experience."
			currentStep={step}
			totalSteps={totalSteps}
			onNext={nextTab}
			onBack={previousTab}
			isNextDisabled={false}
			nextLabel={activeTab === 'goals' ? 'Complete' : 'Next'}
		>
			<Form {...form}>
				<form className="space-y-6">
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						<TabsList className="grid grid-cols-3 mb-6">
							<TabsTrigger
								value="identity"
								onClick={() => setStep(1)}
							>
								Identity
							</TabsTrigger>
							<TabsTrigger
								value="financials"
								onClick={() => setStep(2)}
							>
								Financials
							</TabsTrigger>
							<TabsTrigger
								value="goals"
								onClick={() => setStep(3)}
							>
								Goals & Pain
							</TabsTrigger>
						</TabsList>

						<TabsContent
							value="identity"
							className="space-y-4"
						>
							<div className="text-sm text-muted-foreground mb-4">
								Tell us about your restaurant's identity.
							</div>

							<FormField
								control={form.control}
								name="avgTicket"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Average Ticket Size (₹)
										</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g. 380"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											The average amount spent per order
										</FormDescription>
									</FormItem>
								)}
							/>
						</TabsContent>

						<TabsContent
							value="financials"
							className="space-y-4"
						>
							<div className="text-sm text-muted-foreground mb-4">
								Tell us about your restaurant's financial
								metrics.
							</div>

							<FormField
								control={form.control}
								name="sales"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Last Month Sales (₹)
										</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g. 150000"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Your total revenue last month
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="foodCost"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Food Cost Percentage (%)
										</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g. 30"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Food cost as a percentage of sales
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="laborCost"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Labor Cost Percentage (%)
										</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g. 25"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Staff cost as a percentage of sales
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
											What's your biggest challenge right
											now?
										</FormDescription>
									</FormItem>
								)}
							/>

							<div className="pt-4">
								<FormLabel className="mb-3 inline-block">
									Priority Focus Areas
								</FormLabel>
								<RadioGroup
									defaultValue="profits"
									className="flex flex-col space-y-3"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="profits" />
										</FormControl>
										<FormLabel className="font-normal">
											Increase profitability
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
											Improve customer retention
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</div>
						</TabsContent>
					</Tabs>
				</form>
			</Form>
		</WizardLayout>
	);
}

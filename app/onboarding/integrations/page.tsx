'use client';

import { useRouter } from 'next/navigation';
import { WizardLayout } from '@/components/wizard/wizard-layout';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function IntegrationsPage() {
	const router = useRouter();
	const currentStep = 2;
	const totalSteps = 3;

	const handleContinue = () => {
		router.push('/onboarding/wizard');
	};

	return (
		<WizardLayout
			title="Connect Your Systems"
			description="Nitify works best when connected to your existing systems. This allows us to automatically pull in data and save you time."
			currentStep={currentStep}
			totalSteps={totalSteps}
			onNext={handleContinue}
			isNextDisabled={false}
			nextLabel="Continue"
		>
			<div className="space-y-4">
				<IntegrationCard
					title="POS System"
					description="Connect your Point of Sale system to import sales data, menu items, and more."
					icon="💻"
					integrations={['Petpooja', 'Posist']}
					primaryAction={{
						label: 'Connect Petpooja',
						onClick: () => console.log('Connect Petpooja clicked'),
					}}
					secondaryAction={{
						label: 'Connect Posist',
						onClick: () => console.log('Connect Posist clicked'),
					}}
				/>

				<IntegrationCard
					title="Delivery Platforms"
					description="Connect your delivery aggregators to track orders, commissions, and customer ratings."
					icon="🛵"
					integrations={['UrbanPiper', 'Swiggy', 'Zomato']}
					primaryAction={{
						label: 'Connect UrbanPiper',
						onClick: () =>
							console.log('Connect UrbanPiper clicked'),
					}}
					secondaryAction={{
						label: 'Connect Directly',
						onClick: () => console.log('Connect directly clicked'),
					}}
				/>

				<div className="text-center text-sm text-muted-foreground mt-6">
					You can always connect these systems later from your
					dashboard.
				</div>
			</div>
		</WizardLayout>
	);
}

interface Action {
	label: string;
	onClick: () => void;
}

interface IntegrationCardProps {
	title: string;
	description: string;
	icon: string;
	integrations: string[];
	primaryAction: Action;
	secondaryAction?: Action;
}

function IntegrationCard({
	title,
	description,
	icon,
	integrations,
	primaryAction,
	secondaryAction,
}: IntegrationCardProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center gap-4">
				<div className="text-3xl">{icon}</div>
				<div>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className="text-sm font-medium">
					Available integrations:
				</div>
				<div className="mt-1 text-sm text-muted-foreground">
					{integrations.join(', ')}
				</div>
			</CardContent>
			<Separator />
			<CardFooter className="flex gap-2 justify-end pt-4">
				{secondaryAction && (
					<Button
						variant="outline"
						onClick={secondaryAction.onClick}
					>
						{secondaryAction.label}
					</Button>
				)}
				<Button onClick={primaryAction.onClick}>
					{primaryAction.label}
				</Button>
			</CardFooter>
		</Card>
	);
}

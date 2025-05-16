'use client';

import { useRouter } from 'next/navigation';
import { WizardLayout } from '@/components/wizard/wizard-layout';
import { OutletForm } from '@/components/wizard/outlet-form';
import type { OutletFormValues } from '@/components/wizard/outlet-form';

export default function OnboardingPage() {
	const router = useRouter();
	const currentStep = 1;
	const totalSteps = 3; // We'll implement more steps later

	const handleOutletSubmit = (values: OutletFormValues) => {
		console.log('Outlet form values:', values);
		// In a real app, you would submit this data to your API
		// For now, just redirect to the next step
		router.push('/onboarding/integrations');
	};

	return (
		<WizardLayout
			title="Tell us about your restaurant"
			description="Let's start by gathering some basic information about your business."
			currentStep={currentStep}
			totalSteps={totalSteps}
			onNext={() => {
				// This would be called by the "Next" button in the form
				// Currently handled by the form submission itself
			}}
			isNextDisabled={true} // We'll let the form handle submission
			nextLabel="Continue"
		>
			<OutletForm onSubmit={handleOutletSubmit} />
		</WizardLayout>
	);
}

'use client';

import { useRouter } from 'next/navigation';
import { WizardLayout } from '@/components/wizard/wizard-layout';
import { OutletForm } from '@/components/wizard/outlet-form';
import type { OutletFormValues } from '@/components/wizard/outlet-form';
import { useRef } from 'react';

export default function OnboardingPage() {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const currentStep = 1;
	const totalSteps = 4; // Updated to reflect the added money-snapshot step

	const handleOutletSubmit = (values: OutletFormValues) => {
		console.log('Outlet form values:', values);
		// In a real app, you would submit this data to your API
		router.push('/onboarding/integrations');
	};

	return (
		<WizardLayout
			title="Tell us about your restaurant"
			description="Let's start by gathering some basic information about your business."
			currentStep={currentStep}
			totalSteps={totalSteps}
			onNext={() => {
				// Trigger the form submission when Next is clicked
				formRef.current?.requestSubmit();
			}}
			isNextDisabled={false} // Enable the Continue button
			nextLabel="Continue"
		>
			<OutletForm
				onSubmit={handleOutletSubmit}
				formRef={formRef}
			/>
		</WizardLayout>
	);
}

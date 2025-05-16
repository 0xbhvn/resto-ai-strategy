'use client';

import { useRouter } from 'next/navigation';
import { OutletForm } from '@/components/wizard/outlet-form';
import type { OutletFormValues } from '@/components/wizard/outlet-form';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';

export default function OnboardingPage() {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);

	const handleOutletSubmit = (values: OutletFormValues) => {
		console.log('Outlet form values:', values);
		// In a real app, you would submit this data to your API
		router.push('/onboarding/integrations');
	};

	return (
		<>
			<CardHeader>
				<CardTitle className="text-2xl font-semibold">
					Tell us about your restaurant
				</CardTitle>
				<p className="text-muted-foreground text-sm mt-1">
					Let&apos;s start by gathering some basic information about
					your business.
				</p>
			</CardHeader>

			<CardContent>
				<OutletForm
					onSubmit={handleOutletSubmit}
					formRef={formRef}
				/>
			</CardContent>

			<CardFooter className="flex justify-between">
				<div />
				<Button onClick={() => formRef.current?.requestSubmit()}>
					Continue
				</Button>
			</CardFooter>
		</>
	);
}

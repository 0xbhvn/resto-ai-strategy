'use client';

import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

export default function OnboardingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	// Determine current step based on the pathname
	let currentStep = 1;
	const totalSteps = 4;

	if (pathname.includes('/integrations')) {
		currentStep = 2;
	} else if (pathname.includes('/money-snapshot')) {
		currentStep = 3;
	} else if (pathname.includes('/wizard')) {
		currentStep = 4;
	}

	const progress = Math.round((currentStep / totalSteps) * 100);

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-[600px]">
				<div className="px-6 pt-6">
					<Progress
						value={progress}
						className="h-1"
					/>
					<div className="mt-2 text-xs text-muted-foreground">
						Step {currentStep} of {totalSteps}
					</div>
				</div>

				{children}
			</Card>
		</div>
	);
}

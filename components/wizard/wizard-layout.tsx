'use client';

import type React from 'react';
import { Progress } from '@/components/ui/progress';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WizardLayoutProps {
	children: React.ReactNode;
	title: string;
	description?: string;
	currentStep: number;
	totalSteps: number;
	onNext?: () => void;
	onBack?: () => void;
	isNextDisabled?: boolean;
	nextLabel?: string;
	showProgress?: boolean;
}

export function WizardLayout({
	children,
	title,
	description,
	currentStep,
	totalSteps,
	onNext,
	onBack,
	isNextDisabled = false,
	nextLabel = 'Next',
	showProgress = true,
}: WizardLayoutProps) {
	const progress = Math.round((currentStep / totalSteps) * 100);

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-[600px]">
				{showProgress && (
					<div className="px-6 pt-6">
						<Progress
							value={progress}
							className="h-1"
						/>
						<div className="mt-2 text-xs text-muted-foreground">
							Step {currentStep} of {totalSteps}
						</div>
					</div>
				)}

				<CardHeader>
					<CardTitle className="text-2xl font-semibold">
						{title}
					</CardTitle>
					{description && (
						<p className="text-muted-foreground text-sm mt-1">
							{description}
						</p>
					)}
				</CardHeader>

				<CardContent>{children}</CardContent>

				<CardFooter className="flex justify-between">
					{currentStep > 1 ? (
						<Button
							variant="outline"
							onClick={onBack}
							type="button"
						>
							Back
						</Button>
					) : (
						<div />
					)}
					<Button
						onClick={onNext}
						disabled={isNextDisabled}
						type="button"
					>
						{nextLabel}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

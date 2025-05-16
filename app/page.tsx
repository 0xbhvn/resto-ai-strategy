'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
	const router = useRouter();

	return (
		<div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center min-h-screen py-12 bg-background">
			<div className="text-center max-w-2xl">
				<h1 className="text-4xl font-bold mb-4">Welcome to Nitify</h1>
				<p className="text-xl text-muted-foreground mb-8">
					Your AI-first restaurant growth dashboard
				</p>
				<Button
					size="lg"
					onClick={() => router.push('/onboarding')}
				>
					Start Onboarding
				</Button>
			</div>
		</div>
	);
}

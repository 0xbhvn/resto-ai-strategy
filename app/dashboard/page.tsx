'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
	const router = useRouter();

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Welcome to Nitify</h1>
			<p className="text-muted-foreground mb-8">
				Your restaurant growth dashboard is ready. Explore the strategy
				rooms to get started.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<StrategyCard
					title="Boost Profits"
					description="Simple menu tweaks to keep ₹3–5 more from every ₹100 you sell."
					status="ready"
					onClick={() => console.log('Boost Profits clicked')}
				/>
				<StrategyCard
					title="Get More Orders"
					description="Quick extra orders via smarter apps, direct links, and light promos."
					status="ready"
					onClick={() => console.log('Get More Orders clicked')}
				/>
				<StrategyCard
					title="Keep Customers Coming Back"
					description="Lift repeat-guest rate by 8–12 pp in 30 days."
					status="needs-info"
					onClick={() =>
						console.log('Keep Customers Coming Back clicked')
					}
				/>
				<StrategyCard
					title="Track Your Cash"
					description="13-week cash calendar so you never get blindsided."
					status="locked"
					onClick={() => console.log('Track Your Cash clicked')}
				/>
				<StrategyCard
					title="Boost Brand Visibility"
					description="30-day awareness plan for +15% new walk-ins/app orders."
					status="locked"
					onClick={() =>
						console.log('Boost Brand Visibility clicked')
					}
				/>
			</div>

			<div className="mt-8">
				<Button onClick={() => router.push('/onboarding')}>
					Back to Onboarding
				</Button>
			</div>
		</div>
	);
}

interface StrategyCardProps {
	title: string;
	description: string;
	status: 'ready' | 'needs-info' | 'locked' | 'done';
	onClick: () => void;
}

function StrategyCard({
	title,
	description,
	status,
	onClick,
}: StrategyCardProps) {
	const statusLabels = {
		ready: 'Ready',
		'needs-info': 'Needs Info',
		locked: 'Locked',
		done: 'Done',
	};

	const statusColors = {
		ready: 'bg-green-100 text-green-800',
		'needs-info': 'bg-amber-100 text-amber-800',
		locked: 'bg-slate-100 text-slate-800',
		done: 'bg-blue-100 text-blue-800',
	};

	return (
		<Card
			className="hover:shadow-md transition-shadow cursor-pointer"
			onClick={onClick}
		>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>{title}</CardTitle>
					<span
						className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}
					>
						{statusLabels[status]}
					</span>
				</div>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				{status === 'ready' && (
					<Button className="w-full">Enter Room</Button>
				)}
				{status === 'needs-info' && (
					<Button
						variant="outline"
						className="w-full"
					>
						Provide Information
					</Button>
				)}
				{status === 'locked' && (
					<Button
						variant="secondary"
						className="w-full"
						disabled
					>
						Locked
					</Button>
				)}
				{status === 'done' && (
					<Button
						variant="outline"
						className="w-full"
					>
						View Results
					</Button>
				)}
			</CardContent>
		</Card>
	);
}

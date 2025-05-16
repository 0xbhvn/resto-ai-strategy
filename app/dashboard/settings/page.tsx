'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function SettingsPage() {
	return (
		<div className="container px-4 md:px-6 py-10">
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold">Settings</h1>
				<p className="text-muted-foreground">
					Manage your restaurant profile and update your information.
				</p>
			</div>

			<Tabs
				defaultValue="general"
				className="mt-8"
			>
				<TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="business">Business Info</TabsTrigger>
					<TabsTrigger value="financial">Financial</TabsTrigger>
				</TabsList>

				<TabsContent
					value="general"
					className="mt-6 space-y-6"
				>
					<Card>
						<CardHeader>
							<CardTitle>Restaurant Profile</CardTitle>
							<CardDescription>
								Update your restaurant&apos;s basic information.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Restaurant Name</Label>
								<Input
									id="name"
									placeholder="Enter your restaurant name"
									defaultValue="ABC Restaurant"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="location">
									City & Neighborhood
								</Label>
								<Input
									id="location"
									placeholder="e.g. Mumbai, Bandra"
									defaultValue="Mumbai, Bandra"
								/>
							</div>

							<div className="space-y-2">
								<Label>Restaurant Type</Label>
								<RadioGroup defaultValue="restaurant">
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="restaurant"
											id="restaurant"
										/>
										<Label
											htmlFor="restaurant"
											className="font-normal"
										>
											Restaurant
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="cafe"
											id="cafe"
										/>
										<Label
											htmlFor="cafe"
											className="font-normal"
										>
											Café-bistro
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="cloud"
											id="cloud"
										/>
										<Label
											htmlFor="cloud"
											className="font-normal"
										>
											Cloud-kitchen
										</Label>
									</div>
								</RadioGroup>
							</div>

							<Button>Save Changes</Button>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value="business"
					className="mt-6 space-y-6"
				>
					<Card>
						<CardHeader>
							<CardTitle>Business Details</CardTitle>
							<CardDescription>
								Update your business operation details.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="cuisine">Primary Cuisine</Label>
								<Input
									id="cuisine"
									placeholder="e.g. North Indian, Italian, Fast Food"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="years">
									Years in Operation
								</Label>
								<Input
									id="years"
									type="number"
									placeholder="e.g. 2"
								/>
							</div>

							<Button>Save Changes</Button>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value="financial"
					className="mt-6 space-y-6"
				>
					<Card>
						<CardHeader>
							<CardTitle>Financial Information</CardTitle>
							<CardDescription>
								Update your financial details. This information
								is secure and private.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="monthly-sales">
									Monthly Gross Sales (₹)
								</Label>
								<Input
									id="monthly-sales"
									placeholder="e.g. 150000"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="ticket-size">
									Average Ticket Size (₹)
								</Label>
								<Input
									id="ticket-size"
									placeholder="e.g. 380"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="food-cost">
									Food Cost Percentage (%)
								</Label>
								<Input
									id="food-cost"
									placeholder="e.g. 30"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="labor-cost">
									Labor Cost Percentage (%)
								</Label>
								<Input
									id="labor-cost"
									placeholder="e.g. 25"
								/>
							</div>

							<Button>Save Changes</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

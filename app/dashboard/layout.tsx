'use client';

import { HomeIcon, SettingsIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
	Sidebar,
	SidebarProvider,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from '@/components/ui/sidebar';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const navItems = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: <HomeIcon className="h-4 w-4" />,
		},
		{
			title: 'Settings',
			href: '/dashboard/settings',
			icon: <SettingsIcon className="h-4 w-4" />,
		},
	];

	return (
		<SidebarProvider>
			<div className="w-full flex min-h-screen flex-col md:flex-row">
				<Sidebar>
					<SidebarHeader>
						<div className="font-bold text-xl">Nitify</div>
					</SidebarHeader>
					<SidebarContent>
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										asChild
										tooltip={item.title}
										isActive={
											pathname === item.href ||
											(pathname.startsWith(item.href) &&
												item.href !== '/dashboard') ||
											(pathname === '/dashboard' &&
												item.href === '/dashboard')
										}
									>
										<a href={item.href}>
											{item.icon}
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarContent>
				</Sidebar>

				{/* Mobile header with title */}
				<header className="sticky top-0 z-40 border-b bg-background md:hidden">
					<div className="flex h-16 items-center px-4">
						<div className="font-bold text-xl">Nitify</div>
					</div>
				</header>

				{/* Main content */}
				<main className="flex-1">{children}</main>
			</div>
		</SidebarProvider>
	);
}

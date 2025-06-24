"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorOpen, Newspaper, Users, Briefcase, Info, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/admin/login');
    };

    const sections = [
        { title: 'Services', href: '/admin/services', icon: <Briefcase className="h-6 w-6" /> },
        { title: 'About Us', href: '/admin/about', icon: <Info className="h-6 w-6" /> },
        { title: 'Team', href: '/admin/team', icon: <Users className="h-6 w-6" /> },
        { title: 'Portfolio', href: '/admin/portfolio', icon: <Newspaper className="h-6 w-6" /> },
        { title: 'Contact Messages', href: '/admin/contact', icon: <MessageSquare className="h-6 w-6" /> },
    ];

    if (!isAuthenticated) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>; // Or a spinner
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <Button variant="outline" onClick={handleLogout}>
                        <DoorOpen className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sections.map((section) => (
                                <Card 
                                    key={section.title}
                                    className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                    onClick={() => router.push(section.href)}
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">{section.title}</CardTitle>
                                        {section.icon}
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-muted-foreground">Manage the {section.title.toLowerCase()} section.</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard; 
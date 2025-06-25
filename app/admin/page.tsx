"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorOpen, Newspaper, Users, Briefcase, Info, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { DarkModeToggle } from '@/components/theme-provider';

const AdminDashboard = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
            // Fetch profile
            axios.get('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => setProfile(res.data)).catch(() => {});
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
        { title: 'Testimonials', href: '/admin/testimonials', icon: <MessageSquare className="h-6 w-6" /> },
        { title: 'Contact Messages', href: '/admin/contact', icon: <MessageSquare className="h-6 w-6" /> },
        { title: 'Settings', href: '/admin/settings', icon: <Info className="h-6 w-6" /> },
    ];

    if (!isAuthenticated) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>; // Or a spinner
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
            <header className="bg-card shadow-sm border-b border-border">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300">
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                        <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
                        {/* Profile Avatar */}
                        <div className="relative group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 flex items-center justify-center overflow-hidden border-2 border-rose-200 shadow cursor-pointer transition-all duration-300 group-hover:scale-110" onClick={() => router.push('/admin/settings')} title="Profile Settings">
                                {profile?.profilePhoto ? (
                                    <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-rose-500 font-bold text-lg">
                                        {profile?.email ? profile.email[0].toUpperCase() : 'A'}
                                    </span>
                                )}
                            </div>
                            <span className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-xs text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Edit Profile</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <DarkModeToggle className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground" />
                        <Button variant="outline" onClick={handleLogout} className="transition-all duration-300 hover:scale-105 hover:bg-destructive hover:text-destructive-foreground">
                            <DoorOpen className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                            {sections.map((section, idx) => (
                                <Card 
                                    key={section.title}
                                    className="hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer bg-card text-card-foreground animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
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
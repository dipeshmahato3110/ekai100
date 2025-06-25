"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, PlusCircle, Moon, Sun } from 'lucide-react';
import { DarkModeToggle } from '@/components/theme-provider';

interface Service {
    _id: string;
    title: string;
    description: string;
    icon: string;
}

const ServicesPage = () => {
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState<Partial<Service> | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(() =>
      typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
    );

    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            router.push('/admin/login');
            return;
        }
        setToken(authToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        fetchServices();
    }, [router]);

    const fetchServices = async () => {
        try {
            const response = await api.get('/services');
            setServices(response.data);
        } catch (error: any) {
            console.error('Failed to fetch services', error);
            if (error.response?.status === 401) {
                alert('Authentication failed. Please log in again.');
                localStorage.removeItem('authToken');
                router.push('/admin/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (service: Service) => {
        setIsEditing(true);
        setCurrentService(service);
    };
    
    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await api.delete(`/services/${id}`);
                fetchServices(); // Refresh the list
            } catch (error: any) {
                console.error('Failed to delete service', error);
                if (error.response?.status === 401) {
                    alert('Authentication failed. Please log in again.');
                    localStorage.removeItem('authToken');
                    router.push('/admin/login');
                } else {
                    alert('Failed to delete service.');
                }
            }
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentService) {
            setCurrentService({ ...currentService, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentService || !token) {
            alert('Authentication token missing. Please log in again.');
            router.push('/admin/login');
            return;
        }

        try {
            // Ensure token is included in the request
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            if (isEditing && currentService._id) {
                // Update existing service
                await api.patch(`/services/${currentService._id}`, currentService, config);
            } else {
                // Create new service
                await api.post('/services', currentService, config);
            }
            resetForm();
            fetchServices();
        } catch (error: any) {
            console.error('Failed to save service', error);
            if (error.response?.status === 401) {
                alert('Authentication failed. Please log in again.');
                localStorage.removeItem('authToken');
                router.push('/admin/login');
            } else {
                const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
                alert(`Save Error: ${errorMessage}`);
            }
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentService(null);
    };
    
    const startNewService = () => {
        setIsEditing(false);
        setCurrentService({ title: '', description: '', icon: '' });
    };

    const toggleDarkMode = () => {
      if (typeof window !== 'undefined') {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
          html.classList.remove('dark');
          setIsDark(false);
        } else {
          html.classList.add('dark');
          setIsDark(true);
        }
      }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 min-h-screen bg-background text-foreground transition-colors duration-500 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 relative">
                <h1 className="text-3xl font-bold text-primary">Manage Services</h1>
                <Button onClick={() => router.push('/admin')} variant="outline" className="transition-all duration-300 hover:scale-105">Back to Dashboard</Button>
                <DarkModeToggle className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground shadow-md" />
            </div>

            {currentService ? (
                 <Card>
                    <CardHeader>
                        <CardTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" value={currentService.title || ''} onChange={handleFormChange} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" name="description" value={currentService.description || ''} onChange={handleFormChange} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <Input id="icon" name="icon" value={currentService.icon || ''} onChange={handleFormChange} placeholder="e.g., 'gem' or 'bx bx-layer'" />
                                    <p className="text-xs text-muted-foreground">Optional: Icon class name from your icon library.</p>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                                    <Button type="submit">{isEditing ? 'Update' : 'Create'}</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <div className="text-right">
                    <Button onClick={startNewService}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
                    </Button>
                </div>
            )}


            <Card className="mt-6 bg-card text-card-foreground shadow-xl animate-fade-in-up">
                <CardHeader>
                    <CardTitle>Existing Services</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Icon</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service._id}>
                                    <TableCell className="font-medium">{service.title}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell>{service.icon}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(service._id)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ServicesPage; 
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AboutContent {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
}

const AboutPage = () => {
    const router = useRouter();
    const [content, setContent] = useState<Partial<AboutContent>>({ title: '', description: '', imageUrl: '' });
    const [isLoading, setIsLoading] = useState(true);
    
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fetchAboutContent();
    }, [router]);

    const fetchAboutContent = async () => {
        try {
            const response = await api.get('/about');
            if (response.data && response.data.length > 0) {
                setContent(response.data[0]);
            }
        } catch (error) {
            console.error('Failed to fetch about content', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (content._id) {
                // Update existing content
                await api.patch(`/about/${content._id}`, content);
                alert('Content updated successfully!');
            } else {
                // Create new content
                const response = await api.post('/about', content);
                setContent(response.data);
                alert('Content created successfully!');
            }
        } catch (error) {
            console.error('Failed to save content', error);
            alert('Failed to save content.');
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage About Us</h1>
                <Button onClick={() => router.push('/admin')}>Back to Dashboard</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Edit About Us Content</CardTitle>
                    <CardDescription>Update the title, description, and image for your 'About Us' section.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" value={content.title || ''} onChange={handleFormChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" value={content.description || ''} onChange={handleFormChange} required rows={5} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input id="imageUrl" name="imageUrl" value={content.imageUrl || ''} onChange={handleFormChange} placeholder="https://example.com/image.jpg" />
                                <p className="text-xs text-muted-foreground">Optional: URL for the main image.</p>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AboutPage; 
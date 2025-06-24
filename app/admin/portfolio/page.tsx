"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, PlusCircle } from 'lucide-react';

interface PortfolioItem {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
}

const PortfolioPage = () => {
    const router = useRouter();
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<PortfolioItem> | null>(null);

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
        fetchItems();
    }, [router]);

    const fetchItems = async () => {
        try {
            const response = await api.get('/portfolio');
            setItems(response.data);
        } catch (error) {
            console.error('Failed to fetch portfolio items', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (item: PortfolioItem) => {
        setIsEditing(true);
        setCurrentItem(item);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/portfolio/${id}`);
                fetchItems();
            } catch (error) {
                console.error('Failed to delete item', error);
                alert('Failed to delete item.');
            }
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentItem) {
            setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentItem) return;

        try {
            if (isEditing && currentItem._id) {
                await api.patch(`/portfolio/${currentItem._id}`, currentItem);
            } else {
                await api.post('/portfolio', currentItem);
            }
            resetForm();
            fetchItems();
        } catch (error) {
            console.error('Failed to save item', error);
            alert('Failed to save item.');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentItem(null);
    };
    
    const startNewItem = () => {
        setIsEditing(false);
        setCurrentItem({ title: '', description: '', imageUrl: '', category: '' });
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Portfolio</h1>
                <Button onClick={() => router.push('/admin')}>Back to Dashboard</Button>
            </div>

            {currentItem ? (
                <Card>
                    <CardHeader><CardTitle>{isEditing ? 'Edit Portfolio Item' : 'Add New Item'}</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2"><Label htmlFor="title">Title</Label><Input id="title" name="title" value={currentItem.title || ''} onChange={handleFormChange} required /></div>
                                <div className="grid gap-2"><Label htmlFor="description">Description</Label><Textarea id="description" name="description" value={currentItem.description || ''} onChange={handleFormChange} required /></div>
                                <div className="grid gap-2"><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" name="imageUrl" value={currentItem.imageUrl || ''} onChange={handleFormChange} required /></div>
                                <div className="grid gap-2"><Label htmlFor="category">Category</Label><Input id="category" name="category" value={currentItem.category || ''} onChange={handleFormChange} /></div>
                                <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={resetForm}>Cancel</Button><Button type="submit">{isEditing ? 'Update' : 'Create'}</Button></div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <div className="text-right"><Button onClick={startNewItem}><PlusCircle className="mr-2 h-4 w-4" /> Add New Item</Button></div>
            )}

            <Card className="mt-6">
                <CardHeader><CardTitle>Portfolio Items</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Category</TableHead><TableHead>Image</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell><img src={item.imageUrl} alt={item.title} className="h-16 w-16 object-cover" /></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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

export default PortfolioPage; 
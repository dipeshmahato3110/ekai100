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

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    imageUrl: string;
    bio: string;
}

const TeamPage = () => {
    const router = useRouter();
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMember, setCurrentMember] = useState<Partial<TeamMember> | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    const fullApiUrl = 'http://localhost:5000';

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fetchTeamMembers();
    }, [router]);

    const fetchTeamMembers = async () => {
        try {
            const response = await api.get('/team');
            setTeamMembers(response.data);
        } catch (error) {
            console.error('Failed to fetch team members', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (member: TeamMember) => {
        setIsEditing(true);
        setCurrentMember(member);
        setSelectedFile(null);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            try {
                await api.delete(`/team/${id}`);
                fetchTeamMembers();
            } catch (error) {
                console.error('Failed to delete team member', error);
                alert('Failed to delete team member.');
            }
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentMember) {
            setCurrentMember({ ...currentMember, [e.target.name]: e.target.value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMember) return;

        setUploading(true);
        let imageUrl = currentMember.imageUrl || '';

        // Step 1: Upload image if a new one is selected
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            try {
                const token = localStorage.getItem('authToken');
                const uploadRes = await api.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                imageUrl = fullApiUrl + uploadRes.data.filePath; // Use the full URL
            } catch (error: any) {
                console.error('Image upload failed', error);
                const errorMessage = error.response?.data?.message || error.message || 'Image upload failed. Please try again.';
                alert(`Upload Error: ${errorMessage}`);
                setUploading(false);
                return;
            }
        }

        const finalMemberData = { ...currentMember, imageUrl };

        // Step 2: Create or Update the team member with the new data
        try {
            if (isEditing && finalMemberData._id) {
                await api.patch(`/team/${finalMemberData._id}`, finalMemberData);
            } else {
                await api.post('/team', finalMemberData);
            }
            resetForm();
            fetchTeamMembers();
        } catch (error: any) {
            console.error('Failed to save team member', error);
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
            alert(`Save Error: ${errorMessage}`);
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentMember(null);
        setSelectedFile(null);
    };

    const startNewMember = () => {
        setIsEditing(false);
        setCurrentMember({ name: '', role: '', imageUrl: '', bio: '' });
        setSelectedFile(null);
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Team</h1>
                <Button onClick={() => router.push('/admin')}>Back to Dashboard</Button>
            </div>

            {currentMember ? (
                <Card>
                    <CardHeader><CardTitle>{isEditing ? 'Edit Team Member' : 'Add New Member'}</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" value={currentMember.name || ''} onChange={handleFormChange} required /></div>
                                <div className="grid gap-2"><Label htmlFor="role">Role</Label><Input id="role" name="role" value={currentMember.role || ''} onChange={handleFormChange} required /></div>
                                <div className="grid gap-2">
                                    <Label htmlFor="image">Image</Label>
                                    {currentMember.imageUrl && !selectedFile && (
                                        <div className="mb-2">
                                            <p className="text-sm text-muted-foreground">Current Image:</p>
                                            <img src={currentMember.imageUrl} alt="Current" className="h-20 w-20 rounded-md object-cover" />
                                        </div>
                                    )}
                                    <Input id="image" name="image" type="file" onChange={handleFileChange} accept="image/*" />
                                </div>
                                <div className="grid gap-2"><Label htmlFor="bio">Bio</Label><Textarea id="bio" name="bio" value={currentMember.bio || ''} onChange={handleFormChange} /></div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                                    <Button type="submit" disabled={uploading}>{uploading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <div className="text-right"><Button onClick={startNewMember}><PlusCircle className="mr-2 h-4 w-4" /> Add New Member</Button></div>
            )}

            <Card className="mt-6">
                <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Image</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {teamMembers.map((member) => (
                                <TableRow key={member._id}>
                                    <TableCell className="font-medium">{member.name}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell><img src={member.imageUrl} alt={member.name} className="h-10 w-10 rounded-full object-cover" /></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}><Edit className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(member._id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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

export default TeamPage; 
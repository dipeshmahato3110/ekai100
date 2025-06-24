"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Trash2 } from 'lucide-react';

interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

const ContactMessagesPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
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
        fetchMessages();
    }, [router]);

    const fetchMessages = async () => {
        try {
            const response = await api.get('/contact');
            setMessages(response.data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await api.delete(`/contact/${id}`);
                fetchMessages(); // Refresh the list
            } catch (error) {
                console.error('Failed to delete message', error);
                alert('Failed to delete message.');
            }
        }
    };
    
    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Contact Messages</h1>
                <Button onClick={() => router.push('/admin')}>Back to Dashboard</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Inbox</CardTitle>
                    <CardDescription>Messages submitted through the contact form.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {messages.map((message) => (
                                <TableRow key={message._id}>
                                    <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{message.name} ({message.email})</TableCell>
                                    <TableCell>{message.subject}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(message._id)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Accordion type="single" collapsible className="w-full mt-4">
                        {messages.map((message, index) => (
                             <AccordionItem value={`item-${index}`} key={message._id}>
                                <AccordionTrigger>{message.subject} - from {message.name}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="mb-2"><strong>From:</strong> {message.name} &lt;{message.email}&gt;</p>
                                    <p className="mb-2"><strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}</p>
                                    <p className="text-base whitespace-pre-wrap">{message.message}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactMessagesPage; 
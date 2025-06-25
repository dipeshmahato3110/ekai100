"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  message: string;
  photo?: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

// Star Rating Component
function StarRating({ rating, onRatingChange, readonly = false }: { 
  rating: number, 
  onRatingChange?: (rating: number) => void,
  readonly?: boolean 
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          className={`transition-all duration-200 ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          }`}
          disabled={readonly}
        >
          <Star
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const fetchTestimonials = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:5000/api/testimonials/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTestimonials(res.data);
    } catch (err) {
      setError("Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleApprove = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `http://localhost:5000/api/testimonials/${id}`,
        { approved: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Testimonial approved!");
      fetchTestimonials();
    } catch (err) {
      setError("Failed to approve testimonial.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Testimonial deleted.");
      fetchTestimonials();
    } catch (err) {
      setError("Failed to delete testimonial.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `http://localhost:5000/api/testimonials/${editing._id}`,
        { 
          name: editing.name, 
          message: editing.message,
          rating: editing.rating
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Testimonial updated.");
      setEditing(null);
      fetchTestimonials();
    } catch (err) {
      setError("Failed to update testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-100 py-10 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-rose-200 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-rose-900">Manage Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <div className="text-red-500 mb-2 animate-fade-in bg-red-50 p-3 rounded-lg">{error}</div>}
            {success && <div className="text-green-600 mb-2 animate-fade-in bg-green-50 p-3 rounded-lg">{success}</div>}
            {loading && <div className="text-rose-400 mb-2 animate-pulse">Loading...</div>}
            
            {editing ? (
              <form onSubmit={handleEditSubmit} className="mb-6 space-y-4 animate-fade-in bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={editing.name}
                      onChange={e => setEditing({ ...editing, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <div className="mt-2">
                      <StarRating 
                        rating={editing.rating} 
                        onRatingChange={(rating) => setEditing({ ...editing, rating })} 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea
                    value={editing.message}
                    onChange={e => setEditing({ ...editing, message: e.target.value })}
                    required
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <Button type="submit" disabled={loading}>Save Changes</Button>
                  <Button type="button" variant="outline" onClick={() => setEditing(null)} disabled={loading}>Cancel</Button>
                </div>
              </form>
            ) : null}
            
            <div className="space-y-6">
              {testimonials.length === 0 && !loading && (
                <div className="text-gray-500 text-center py-8">No testimonials yet.</div>
              )}
              {testimonials.map((t) => (
                <Card key={t._id} className={`border ${t.approved ? 'border-green-200' : 'border-yellow-200'} animate-fade-in hover:shadow-lg transition-shadow duration-300`}> 
                  <CardContent className="py-6">
                    <div className="flex items-start gap-4 mb-4">
                      {t.photo ? (
                        <img 
                          src={`http://localhost:5000${t.photo}`} 
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-rose-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 flex items-center justify-center border-2 border-rose-200">
                          <span className="text-rose-600 font-bold text-lg">
                            {t.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-rose-700 text-lg">{t.name}</span>
                          <span className={`text-xs px-2 py-1 rounded ${t.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {t.approved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        <StarRating rating={t.rating || 5} readonly />
                        <span className="text-xs text-gray-400 ml-2">{new Date(t.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-gray-700 italic mb-4">"{t.message}"</div>
                    <div className="flex gap-2">
                      {!t.approved && (
                        <Button size="sm" onClick={() => handleApprove(t._id)} disabled={loading}>
                          Approve
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleEdit(t)} disabled={loading}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(t._id)} disabled={loading}>
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        <Button className="mt-8 w-full" variant="outline" onClick={() => router.push('/admin')}>Back to Dashboard</Button>
      </div>
    </div>
  );
} 
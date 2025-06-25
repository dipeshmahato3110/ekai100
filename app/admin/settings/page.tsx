"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { DarkModeToggle } from '@/components/theme-provider';

export default function AdminSettings() {
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Dark mode toggle handler
  const [isDark, setIsDark] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          router.push("/admin/login");
          return;
        }
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setEmail(res.data.email);
        setProfilePhoto(res.data.profilePhoto || "");
      } catch (err) {
        setError("Failed to load profile.");
      }
    };
    fetchProfile();
  }, [router]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
      setProfilePhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("profilePhoto", photoFile);
      const res = await axios.post("http://localhost:5000/api/auth/me/photo", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setSuccess("Profile photo updated!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload photo.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        "http://localhost:5000/api/auth/me",
        { email, password: password || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      setSuccess("Profile updated!");
      setPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-amber-100 dark:from-background dark:to-background animate-fade-in transition-colors duration-500">
      <Card className="w-full max-w-lg shadow-2xl border-rose-200 dark:border-border animate-scale-in relative">
        {/* Dark mode toggle button */}
        <DarkModeToggle className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground shadow-md" />
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle className="text-3xl font-serif text-rose-900 mb-2">Admin Settings</CardTitle>
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 flex items-center justify-center overflow-hidden border-4 border-rose-100 shadow-lg cursor-pointer transition-all duration-300 group-hover:scale-105" onClick={() => fileInputRef.current?.click()}>
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="text-rose-400" size={40} />
              )}
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handlePhotoChange} />
            </div>
            <Button size="sm" className="mt-2 w-full" onClick={handlePhotoUpload} disabled={loading || !photoFile}>
              {loading ? "Uploading..." : "Upload Photo"}
            </Button>
          </div>
        </CardHeader>
        <form onSubmit={handleProfileUpdate}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1" disabled={loading} />
            </div>
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Leave blank to keep current password" className="mt-1" disabled={loading} />
            </div>
            {error && <div className="text-red-500 text-center animate-fade-in">{error}</div>}
            {success && <div className="text-green-600 text-center animate-fade-in">{success}</div>}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => router.push('/admin')}>Back to Dashboard</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 
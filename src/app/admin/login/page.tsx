"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Container, Section } from "@/components/layout/LayoutUtils";
import { Button } from "@/components/ui/Button";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin/dashboard");
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-brand-bg">
            <Container className="max-w-md w-full">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-text mb-2">Quản trị viên</h1>
                        <p className="text-text/50">Đăng nhập để quản lý bài viết</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-text/60 mb-2 uppercase tracking-wider">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text/30" size={20} />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-brand-bg border border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                                    placeholder="admin@yoga.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text/60 mb-2 uppercase tracking-wider">Mật khẩu</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text/30" size={20} />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-brand-bg border border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-3 rounded-xl">{error}</p>
                        )}

                        <Button type="submit" size="lg" className="w-full" disabled={loading}>
                            {loading ? <Loader2 size={24} className="animate-spin" /> : "Đăng nhập"}
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}

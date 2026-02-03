"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Container, Section } from "@/components/layout/LayoutUtils";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, LogOut, FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function AdminDashboard() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/admin/login");
            } else {
                setUser(user);
                fetchPosts();
            }
        };
        checkUser();
    }, [router, supabase.auth]);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) setPosts(data || []);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const deletePost = async (id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
            const { error } = await supabase.from("posts").delete().eq("id", id);
            if (!error) fetchPosts();
        }
    };

    if (loading && !user) return null;

    return (
        <div className="pt-24 min-h-screen bg-brand-bg">
            <Section>
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl font-serif font-bold text-text mb-2 text-primary">Dashboard</h1>
                            <p className="text-text/50">Chào mừng trở lại, {user?.email}</p>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/admin/editor">
                                <Button className="space-x-2">
                                    <Plus size={20} />
                                    <span>Viết bài mới</span>
                                </Button>
                            </Link>
                            <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                                <LogOut size={20} className="mr-2" />
                                Đăng xuất
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/5 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-primary/5 border-b border-primary/10">
                                    <tr>
                                        <th className="px-8 py-5 text-sm font-bold text-text/60 uppercase tracking-widest">Bài viết</th>
                                        <th className="px-8 py-5 text-sm font-bold text-text/60 uppercase tracking-widest">Trạng thái</th>
                                        <th className="px-8 py-5 text-sm font-bold text-text/60 uppercase tracking-widest">Ngày tạo</th>
                                        <th className="px-8 py-5 text-sm font-bold text-text/60 uppercase tracking-widest text-right">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-primary/5">
                                    {posts.length > 0 ? (
                                        posts.map((post) => (
                                            <tr key={post.id} className="hover:bg-primary/5 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                            {post.cover_image ? (
                                                                <div className="w-full h-full bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${post.cover_image})` }} />
                                                            ) : (
                                                                <FileText size={24} />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-text group-hover:text-primary transition-colors">{post.title}</p>
                                                            <p className="text-sm text-text/40">/{post.slug}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {post.status === "published" ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                                                            <CheckCircle size={14} className="mr-1" /> Đã xuất bản
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
                                                            <Clock size={14} className="mr-1" /> Bản nháp
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6 text-text/50">
                                                    {format(new Date(post.created_at), 'dd/MM/yyyy', { locale: vi })}
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <Link href={`/admin/editor/${post.id}`}>
                                                            <Button variant="ghost" size="sm" className="p-2">
                                                                <Edit size={18} className="text-secondary" />
                                                            </Button>
                                                        </Link>
                                                        <Button variant="ghost" size="sm" className="p-2" onClick={() => deletePost(post.id)}>
                                                            <Trash2 size={18} className="text-red-400" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center text-text/30 italic">
                                                Chưa có bài viết nào. Hãy bắt đầu viết bài đầu tiên nhé!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}

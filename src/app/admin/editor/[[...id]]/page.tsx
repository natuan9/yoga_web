"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { Container } from "@/components/layout/LayoutUtils";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Save, Eye, Settings, Image as ImageIcon, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import Editor from "@/components/admin/Editor";
import PreviewModal from "@/components/admin/PreviewModal";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/storage";
import { useRef } from "react";

export default function EditorPage() {
    const params = useParams();
    const id = params.id?.[0];
    const router = useRouter();
    const supabase = createClient();
    const coverInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(!!id);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [isSlugModified, setIsSlugModified] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const [post, setPost] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        cover_image: "",
        status: "draft",
    });

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("id", id)
            .single();

        if (!error && data) {
            setPost(data);
            setIsSlugModified(true);
        }
        setInitialLoading(false);
    };

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd')
            .replace(/([^0-9a-z-\s])/g, '')
            .replace(/(\s+)/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        const updates: any = { title: newTitle };

        if (!isSlugModified) {
            updates.slug = generateSlug(newTitle);
        }

        setPost({ ...post, ...updates });
    };

    const handleSave = async (statusOverride?: string) => {
        setLoading(true);
        const postData = { ...post, status: statusOverride || post.status };

        // Final check for slug
        if (!postData.slug && postData.title) {
            postData.slug = generateSlug(postData.title);
        }

        let error;
        if (id) {
            const { error: updateError } = await supabase
                .from("posts")
                .update(postData)
                .eq("id", id);
            error = updateError;
        } else {
            const { error: insertError, data: insertData } = await supabase
                .from("posts")
                .insert([postData])
                .select();
            error = insertError;
            if (!error && insertData?.[0]) {
                router.push(`/admin/editor/${insertData[0].id}`);
            }
        }

        if (error) {
            alert("Lỗi khi lưu bài viết: " + error.message);
        } else {
            alert("Đã lưu thành công!");
        }
        setLoading(false);
    };

    const handleCoverUpload = async (file: File) => {
        setIsUploadingCover(true);
        try {
            const url = await uploadImage(file);
            setPost({ ...post, cover_image: url });
        } catch (error) {
            alert(error instanceof Error ? error.message : "Lỗi upload ảnh bìa");
        } finally {
            setIsUploadingCover(false);
            setIsDragOver(false);
        }
    };

    const onDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleCoverUpload(file);
        }
    };

    if (initialLoading) return (
        <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-primary/5 rounded-full transition-colors">
                            <ChevronLeft size={24} />
                        </Link>
                        <div className="h-8 w-px bg-primary/10" />
                        <span className="font-serif font-bold text-xl text-primary">Yoga Chân Thật</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" className="space-x-2" onClick={() => setShowSidebar(!showSidebar)}>
                            <Settings size={20} />
                            <span>Cấu hình</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="space-x-2"
                            onClick={() => setShowPreview(true)}
                        >
                            <Eye size={20} />
                            <span>Xem trước</span>
                        </Button>
                        <Button onClick={() => handleSave()} disabled={loading} className="space-x-2 min-w-[120px]">
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            <span>Lưu</span>
                        </Button>
                        {post.status === 'draft' && (
                            <Button onClick={() => handleSave('published')} disabled={loading} className="bg-secondary hover:bg-secondary/90">
                                Xuất bản
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="pt-20 flex">
                <main className={cn(
                    "flex-1 transition-all duration-300 ease-in-out px-6 md:px-20 lg:px-40 py-20",
                    showSidebar ? "mr-[400px]" : "mr-0"
                )}>
                    <input
                        type="text"
                        placeholder="Tiêu đề bài viết..."
                        className="w-full text-5xl md:text-6xl font-serif font-bold text-text outline-none mb-12 placeholder:text-text/10"
                        value={post.title}
                        onChange={handleTitleChange}
                    />

                    <Editor
                        content={post.content}
                        onChange={(html) => setPost({ ...post, content: html })}
                    />
                </main>

                {/* Sidebar */}
                <aside className={cn(
                    "fixed top-20 right-0 bottom-0 w-[400px] bg-brand-bg border-l border-primary/10 p-8 overflow-y-auto transition-transform duration-300 ease-in-out z-40",
                    showSidebar ? "translate-x-0" : "translate-x-full"
                )}>
                    <h3 className="text-xl font-serif font-bold mb-8 flex items-center">
                        <Settings size={24} className="mr-3 text-primary" />
                        Cấu hình bài viết
                    </h3>

                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-bold text-text/60 mb-3 uppercase tracking-wider">Ảnh bìa</label>
                            <input
                                type="file"
                                ref={coverInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleCoverUpload(file);
                                }}
                            />
                            <div
                                onClick={() => coverInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                onDragLeave={() => setIsDragOver(false)}
                                onDrop={onDrop}
                                className={cn(
                                    "aspect-[16/9] rounded-2xl bg-white border-2 border-dashed mb-4 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer transition-all",
                                    isDragOver ? "border-primary bg-primary/10 scale-[1.02]" : "border-primary/20 hover:bg-primary/5",
                                    isUploadingCover && "opacity-50 pointer-events-none"
                                )}
                            >
                                {isUploadingCover ? (
                                    <div className="flex flex-col items-center">
                                        <Loader2 size={32} className="animate-spin text-primary mb-2" />
                                        <span className="text-xs font-medium">Đang tải...</span>
                                    </div>
                                ) : post.cover_image ? (
                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${post.cover_image})` }} />
                                ) : (
                                    <>
                                        <Upload size={32} className="text-primary/10 mb-2" />
                                        <span className="text-xs text-text/40">Kéo thả hoặc click để tải ảnh</span>
                                    </>
                                )}
                            </div>
                            {post.cover_image && (
                                <input
                                    type="text"
                                    placeholder="Hoặc dán URL lệ đây..."
                                    className="w-full px-4 py-2 rounded-lg text-xs bg-white border border-primary/10"
                                    value={post.cover_image}
                                    onChange={(e) => setPost({ ...post, cover_image: e.target.value })}
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text/60 mb-2 uppercase tracking-wider">Slug</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-white border border-primary/10 focus:border-primary outline-none text-sm"
                                placeholder="bai-viet-yoga"
                                value={post.slug}
                                onChange={(e) => {
                                    setPost({ ...post, slug: e.target.value });
                                    setIsSlugModified(true);
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text/60 mb-2 uppercase tracking-wider">Mô tả ngắn (Excerpt)</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-white border border-primary/10 focus:border-primary outline-none text-sm resize-none"
                                placeholder="Viết đoạn mô tả ngắn cho SEO..."
                                value={post.excerpt}
                                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                            />
                        </div>

                        <div className="pt-8 border-t border-primary/10">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-bold text-text/60">Trạng thái:</span>
                                <span className={cn(
                                    "uppercase font-bold tracking-widest",
                                    post.status === 'published' ? "text-green-500" : "text-amber-500"
                                )}>
                                    {post.status === 'published' ? "Đã xuất bản" : "Bản nháp"}
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <PreviewModal
                    post={post}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </div>
    );
}

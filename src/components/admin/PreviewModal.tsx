"use client";

import { Container, Section } from "@/components/layout/LayoutUtils";
import { X } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface PreviewModalProps {
    post: {
        title: string;
        content: string;
        cover_image: string;
        excerpt: string;
    };
    onClose: () => void;
}

export default function PreviewModal({ post, onClose }: PreviewModalProps) {
    return (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="fixed top-6 right-6 z-[110] p-3 bg-brand-bg hover:bg-primary/10 rounded-full transition-colors shadow-lg border border-primary/10"
            >
                <X size={24} className="text-primary" />
            </button>

            {/* Hero Section (from Blog Detail Page) */}
            <Section variant="alt" className="pt-32 pb-16">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-secondary font-bold tracking-widest uppercase text-xs">Xem trước bài viết</span>
                            <div className="h-px w-12 bg-primary/20" />
                            <span className="text-text/40 text-sm italic">
                                {format(new Date(), "dd 'Tháng' MM, yyyy", { locale: vi })}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-text mb-8 leading-tight">
                            {post.title || "Tiêu đề bài viết"}
                        </h1>

                        <p className="text-xl text-text/60 leading-relaxed font-serif italic mb-12">
                            {post.excerpt || "Đoạn mô tả ngắn sẽ hiển thị ở đây..."}
                        </p>

                        {post.cover_image && (
                            <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-16 relative group">
                                <img
                                    src={post.cover_image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Content Rendering */}
                        <div
                            className="prose prose-lg prose-stone max-w-none
                prose-headings:font-serif prose-headings:text-text
                prose-p:text-text/80 prose-p:leading-relaxed
                prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
                prose-img:rounded-3xl"
                            dangerouslySetInnerHTML={{ __html: post.content || "<p>Nội dung đang được soạn thảo...</p>" }}
                        />
                    </div>
                </Container>
            </Section>
        </div>
    );
}

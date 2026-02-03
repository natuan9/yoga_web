import { Container, Section } from "@/components/layout/LayoutUtils";
import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Calendar, ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/Button";

export const revalidate = 60;

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const supabase = createClient();
    const { slug } = await params;

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <div className="pt-20">
            <article>
                {/* Hero Header */}
                <header className="relative py-24 md:py-32 bg-white overflow-hidden">
                    <Container className="relative z-10">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-primary font-medium mb-8 hover:-translate-x-1 transition-transform"
                        >
                            <ChevronLeft size={18} className="mr-1" /> Quay lại Blog
                        </Link>

                        <div className="flex items-center space-x-4 text-sm text-text/50 mb-6 uppercase tracking-[0.2em] font-semibold">
                            <Calendar size={16} />
                            <span>{format(new Date(post.created_at), 'dd MMMM, yyyy', { locale: vi })}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-text mb-8 leading-[1.15] max-w-4xl">
                            {post.title}
                        </h1>

                        <p className="text-xl text-text/60 max-w-2xl leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
                            {post.excerpt}
                        </p>
                    </Container>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right"></div>
                </header>

                {/* Cover Image */}
                {post.cover_image && (
                    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className="aspect-[21/9] rounded-[2rem] bg-cover bg-center shadow-2xl relative overflow-hidden"
                            style={{ backgroundImage: `url(${post.cover_image})` }}
                        >
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                        </div>
                    </div>
                )}

                {/* Content */}
                <Section className="bg-white">
                    <Container>
                        <div className="max-w-3xl mx-auto">
                            <div
                                className="prose prose-lg prose-stone max-w-none 
                  prose-headings:font-serif prose-headings:font-bold 
                  prose-p:leading-relaxed prose-p:text-text/80
                  prose-img:rounded-3xl prose-img:shadow-lg
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-6 prose-blockquote:rounded-2xl prose-blockquote:not-italic"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <div className="mt-20 pt-10 border-t border-primary/10 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="font-serif font-bold">Y</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-text">Yoga Chân Thật</p>
                                        <p className="text-sm text-text/50">Người chia sẻ bình yên</p>
                                    </div>
                                </div>

                                <Button variant="ghost" size="sm" className="space-x-2">
                                    <Share2 size={18} />
                                    <span>Chia sẻ</span>
                                </Button>
                            </div>
                        </div>
                    </Container>
                </Section>
            </article>

            {/* Recommended CTA */}
            <Section variant="primary">
                <Container className="text-center">
                    <h3 className="text-3xl font-serif font-bold mb-6">Bạn thấy bài viết này hữu ích?</h3>
                    <p className="text-lg text-text/70 mb-10 max-w-xl mx-auto">
                        Nhận ngay lộ trình tập luyện cơ bản tại nhà dành riêng cho người mới.
                    </p>
                    <Link href="/contact">
                        <Button size="lg">Đăng ký nhận lộ trình</Button>
                    </Link>
                </Container>
            </Section>
        </div>
    );
}

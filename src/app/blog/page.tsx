import { Container, Section } from "@/components/layout/LayoutUtils";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
    const supabase = createClient();

    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
    }

    return (
        <div className="pt-20">
            <Section className="bg-white pt-32 pb-16">
                <Container>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-text mb-6">Blog & Chia sẻ</h1>
                    <p className="text-xl text-text/70 max-w-2xl leading-relaxed">
                        Nơi chia sẻ kiến thức Yoga, lối sống tỉnh thức và những kinh nghiệm dành cho người mới bắt đầu.
                    </p>
                </Container>
            </Section>

            <Section>
                <Container>
                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {posts.map((post) => (
                                <article key={post.id} className="bg-white rounded-3xl overflow-hidden border border-primary/5 hover:border-primary/20 hover:shadow-xl transition-all group">
                                    <Link href={`/blog/${post.slug}`}>
                                        <div className="aspect-[16/10] overflow-hidden relative">
                                            {post.cover_image ? (
                                                <div
                                                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                                    style={{ backgroundImage: `url(${post.cover_image})` }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary/30">
                                                    <span className="font-serif italic">Yoga Chân Thật</span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>

                                    <div className="p-8">
                                        <div className="flex items-center space-x-4 text-xs text-text/50 mb-4 uppercase tracking-wider font-medium">
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={14} />
                                                <span>{format(new Date(post.created_at), 'dd MMMM, yyyy', { locale: vi })}</span>
                                            </div>
                                        </div>

                                        <Link href={`/blog/${post.slug}`}>
                                            <h2 className="text-2xl font-serif font-bold text-text mb-4 group-hover:text-primary transition-colors leading-tight">
                                                {post.title}
                                            </h2>
                                        </Link>

                                        <p className="text-text/60 line-clamp-3 mb-6 leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary font-bold hover:translate-x-1 transition-transform">
                                            Đọc tiếp <ArrowRight size={16} className="ml-2" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-primary/10">
                            <h3 className="text-2xl font-serif font-medium text-text/40 italic">Chưa có bài viết nào...</h3>
                            <p className="mt-4 text-text/40">Chúng mình sẽ sớm cập nhật nội dung nhé!</p>
                        </div>
                    )}
                </Container>
            </Section>
        </div>
    );
}

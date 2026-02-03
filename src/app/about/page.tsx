import { Container, Section } from "@/components/layout/LayoutUtils";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Award, BookOpen, Heart, User, Shield } from "lucide-react";

export default function About() {
    return (
        <div className="pt-20">
            {/* Header */}
            <Section className="bg-white pt-32 pb-16">
                <Container className="text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-text mb-6">Về "Yoga Chân Thật"</h1>
                    <p className="text-xl text-text/70 max-w-3xl mx-auto leading-relaxed">
                        Hành trình chia sẻ sự bình yên và an toàn đến với những người mới bắt đầu bước chân vào thế giới Yoga.
                    </p>
                </Container>
            </Section>

            {/* Story Section */}
            <Section variant="default">
                <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center space-x-2 text-primary mb-4">
                            <User size={20} />
                            <span className="font-medium tracking-wider uppercase text-sm">Câu chuyện của mình</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mb-8 leading-tight">
                            Tại sao lại là "Yoga cho người mới"?
                        </h2>
                        <div className="space-y-6 text-text/80 leading-relaxed text-lg">
                            <p>
                                Mình từng là một người mới, cũng từng cảm thấy lo lắng khi bước vào một lớp học Yoga đầy những người có thể uốn dẻo điêu luyện. Đó là lý do mình chọn hướng đi này.
                            </p>
                            <p>
                                Yoga với mình là sự kết nối, không phải là sự cạnh tranh. Mình muốn tạo ra một không gian nơi bạn cảm thấy an toàn để sai, an toàn để chậm lại và an toàn để là chính mình.
                            </p>
                            <p>
                                Với chứng chỉ <strong>RYT 200h</strong> (Registered Yoga Teacher), mình cam kết mang lại những kiến thức chuẩn xác, khoa học và dễ hiểu nhất cho bạn.
                            </p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-primary/10">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-text">RYT 200h Certified</p>
                                    <p className="text-sm text-text/50">Yoga Alliance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Philosophy */}
            <Section variant="alt">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mb-4">Triết lý giảng dạy</h2>
                        <div className="w-20 h-1 bg-primary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all">
                            <Heart className="text-primary mb-6" size={40} />
                            <h3 className="text-xl font-bold mb-4">Sự Thấu Cảm</h3>
                            <p className="text-text/70 leading-relaxed">
                                Mỗi cơ thể là duy nhất. Mình lắng nghe và điều chỉnh bài tập phù hợp với giới hạn và khả năng của bạn.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all">
                            <Shield className="text-secondary mb-6" size={40} />
                            <h3 className="text-xl font-bold mb-4">Sự An Toàn</h3>
                            <p className="text-text/70 leading-relaxed">
                                Ưu tiên hàng đầu là bảo vệ xương khớp và cột sống của bạn thông qua việc chỉnh sửa tư thế (alignment) chuẩn xác.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all">
                            <BookOpen className="text-accent mb-6" size={40} />
                            <h3 className="text-xl font-bold mb-4">Kiến Thức Nền Tảng</h3>
                            <p className="text-text/70 leading-relaxed">
                                Bạn sẽ không chỉ tập theo, mà còn hiểu tại sao chúng ta làm như vậy và lợi ích của nó đối với sức khỏe.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Call to action */}
            <Section>
                <Container className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mb-8">Bạn muốn tìm hiểu thêm về các lớp học?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg">Liên hệ tư vấn</Button>
                        </Link>
                        <Link href="/blog">
                            <Button variant="outline" size="lg">Đọc Blog của mình</Button>
                        </Link>
                    </div>
                </Container>
            </Section>
        </div>
    );
}

import { Container, Section } from "@/components/layout/LayoutUtils";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Heart, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
        <Container className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Khóa học mới dành cho tháng 2</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-text leading-[1.1] mb-8 max-w-5xl tracking-tight">
            Yoga cho người mới – <br className="hidden md:block" />
            <span className="text-primary italic">An toàn</span> từ nền tảng
          </h1>

          <p className="text-lg md:text-xl text-text/70 max-w-2xl mb-10 leading-relaxed">
            Hành trình tìm lại chính mình qua từng hơi thở chậm rãi. Tập trung vào sự an toàn, chuẩn xác và lắng nghe cơ thể.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto group">
                Bắt đầu hành trình
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Tìm hiểu thêm
              </Button>
            </Link>
          </div>
        </Container>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent blur-[120px] rounded-full"></div>
        </div>
      </Section>

      {/* Values Section */}
      <Section variant="alt">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">An toàn là trên hết</h3>
              <p className="text-text/70 leading-relaxed">
                Chúng tôi hướng dẫn chi tiết từng kỹ thuật, giúp bạn tập luyện mà không lo chấn thương.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Chân thực & Chậm rãi</h3>
              <p className="text-text/70 leading-relaxed">
                Không áp lực, không tư thế khó. Chỉ có bạn và hơi thở trong không gian bình yên nhất.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Lộ trình rõ ràng</h3>
              <p className="text-text/70 leading-relaxed">
                Từ con số 0 đến sự cân bằng. Lộ trình được thiết kế khoa học cho người chưa từng tập.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* About Teaser */}
      <Section>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            {/* Placeholder image */}
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
          </div>

          <div>
            <h4 className="text-primary font-medium tracking-widest uppercase mb-4 text-sm">Về tôi</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text mb-8 leading-tight">
              Người đồng hành cùng bạn trên thảm tập
            </h2>
            <p className="text-lg text-text/70 mb-6 leading-relaxed">
              Chào bạn, mình là huấn luyện viên Yoga RYT 200h. Mình tin rằng Yoga không phải là những tư thế nhào lộn khó khăn, mà là cách chúng ta đối xử với chính mình.
            </p>
            <p className="text-lg text-text/70 mb-10 leading-relaxed">
              Mình tập trung vào việc chia sẻ kiến thức Yoga nền tảng, giúp bạn hiểu rõ cơ thể và tâm trí một cách nhẹ nhàng nhất.
            </p>
            <Link href="/about">
              <Button variant="outline">Tìm hiểu thêm về mình</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="primary" className="mb-[-40px]">
        <Container className="text-center py-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-text mb-8">
            Bạn đã sẵn sàng để bắt đầu chưa?
          </h2>
          <p className="text-xl text-text/70 mb-10 max-w-2xl mx-auto">
            Gói tập thử 3 buổi dành riêng cho người mới bắt đầu đang chờ đón bạn.
          </p>
          <Link href="/contact">
            <Button size="lg" className="shadow-xl shadow-primary/20">Liên hệ ngay</Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}

import Link from "next/link";
import { Container } from "./LayoutUtils";

export function Footer() {
    return (
        <footer className="bg-white border-t border-primary/10 py-12 md:py-20">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-serif font-bold text-primary tracking-tight">
                            Yoga Chân Thật
                        </Link>
                        <p className="mt-6 text-text/70 max-w-sm leading-relaxed">
                            Dành cho những tâm hồn mới bắt đầu. Tập trung vào sự an toàn, chậm rãi và tìm lại sự chân thực trong từng hơi thở.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6">Liên kết</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-text/70 hover:text-primary transition-colors">Trang chủ</Link></li>
                            <li><Link href="/about" className="text-text/70 hover:text-primary transition-colors">Giới thiệu</Link></li>
                            <li><Link href="/blog" className="text-text/70 hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="text-text/70 hover:text-primary transition-colors">Liên hệ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6">Pháp lý</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-text/70 hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
                            <li><Link href="#" className="text-text/70 hover:text-primary transition-colors">Điều khoản sử dụng</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-primary/5 text-center text-text/50 text-sm">
                    <p>© {new Date().getFullYear()} Yoga Chân Thật. Mọi quyền được bảo lưu.</p>
                    <p className="mt-2">Thiết kế với sự trân trọng dành cho người mới.</p>
                </div>
            </Container>
        </footer>
    );
}

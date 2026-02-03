"use client";

import { Container, Section } from "@/components/layout/LayoutUtils";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const supabase = createClient();
        const { error } = await supabase
            .from('messages')
            .insert([formData]);

        if (error) {
            console.error('Error sending message:', error);
            setStatus("error");
        } else {
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <div className="pt-20">
            <Section className="bg-white pt-32 pb-16">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-text mb-6">Kết nối cùng mình</h1>
                        <p className="text-xl text-text/70 leading-relaxed">
                            Dù bạn có thắc mắc về kỹ thuật hay chỉ muốn gửi một lời chào, mình luôn sẵn lòng lắng nghe.
                        </p>
                    </div>
                </Container>
            </Section>

            <Section>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Info */}
                        <div>
                            <div className="space-y-12">
                                <div className="flex space-x-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Mail size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Email</h4>
                                        <p className="text-text/70">hello@yogachan-that.com</p>
                                        <p className="text-text/70">tuvan@yogachan-that.com</p>
                                    </div>
                                </div>

                                <div className="flex space-x-6">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Số điện thoại</h4>
                                        <p className="text-text/70">+84 9xx xxx xxx</p>
                                        <p className="text-text/70">Thứ 2 - Thứ 7 (8h00 - 18h00)</p>
                                    </div>
                                </div>

                                <div className="flex space-x-6">
                                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Văn phòng</h4>
                                        <p className="text-text/70">Quận 1, TP. Hồ Chí Minh</p>
                                        <p className="text-text/70">Dạy kèm tại nhà & Online</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-20 p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
                                <h5 className="font-bold mb-4">Luyện tập an toàn tại nhà</h5>
                                <p className="text-text/70 leading-relaxed">
                                    "Yoga không phải là để chạm vào ngón chân, mà là những gì bạn học được trên đường đi xuống."
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white z-10"
                                    >
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h3 className="text-3xl font-serif font-bold mb-4">Gửi tin nhắn thành công!</h3>
                                        <p className="text-text/70 mb-8">Cảm ơn bạn đã quan tâm. Mình sẽ phản hồi lại sớm nhất có thể.</p>
                                        <Button onClick={() => setStatus("idle")} variant="outline">Gửi tin nhắn khác</Button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-bold text-text/60 mb-2 uppercase tracking-wider">Họ và tên</label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-brand-bg border border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                                                placeholder="Nguyễn Văn A"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-bold text-text/60 mb-2 uppercase tracking-wider">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-brand-bg border border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                                                placeholder="example@gmail.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-bold text-text/60 mb-2 uppercase tracking-wider">Tin nhắn</label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={5}
                                                className="w-full px-6 py-4 rounded-2xl bg-brand-bg border border-transparent focus:border-primary focus:bg-white outline-none transition-all resize-none"
                                                placeholder="Bạn cần hỗ trợ điều gì?"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full group"
                                            disabled={status === "loading"}
                                        >
                                            {status === "loading" ? "Đang gửi..." : "Gửi tin nhắn"}
                                            <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </Button>

                                        {status === "error" && (
                                            <p className="text-red-500 text-sm text-center">Có lỗi xảy ra. Vui lòng thử lại sau.</p>
                                        )}
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}

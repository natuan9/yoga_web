"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Container } from "./LayoutUtils";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Liên hệ", href: "/contact" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
            )}
        >
            <Container className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-serif font-bold text-primary tracking-tight">
                    Yoga Chân Thật
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-text"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-primary text-white px-6 py-2 text-sm font-medium hover:bg-primary/90 transition-all active:scale-95"
                    >
                        Bắt đầu ngay
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-text p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </Container>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 top-[72px] bg-white z-40 md:hidden transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col p-8 space-y-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "text-xl font-medium",
                                pathname === item.href ? "text-primary" : "text-text"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="w-full inline-flex items-center justify-center rounded-full bg-primary text-white px-6 py-3 text-lg font-medium hover:bg-primary/90 transition-all active:scale-95"
                    >
                        Bắt đầu ngay
                    </Link>
                </div>
            </div>
        </nav>
    );
}

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Product', href: '#product' },
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <a href="/" className="flex items-center space-x-2 cursor-pointer">
                                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary flex items-center justify-center">
                                    <span className="text-white font-bold text-base sm:text-lg">P</span>
                                </div>
                                <span className="text-lg sm:text-xl font-bold">Pulse</span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                            <a href="/dashboard">
                                <Button variant="ghost" size="sm" className="text-sm">Login</Button>
                            </a>
                            <a href="/dashboard">
                                <Button size="sm" className="text-sm">Get Started</Button>
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu - Full screen overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Content */}
                    <div className="absolute top-14 left-0 right-0 bottom-0 bg-background border-t border-border overflow-y-auto">
                        <div className="px-4 py-6 space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent cursor-pointer transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="pt-4 space-y-2 border-t border-border mt-4">
                                <a href="/dashboard" className="block">
                                    <Button variant="outline" className="w-full text-sm">Login</Button>
                                </a>
                                <a href="/dashboard" className="block">
                                    <Button className="w-full text-sm">Get Started</Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

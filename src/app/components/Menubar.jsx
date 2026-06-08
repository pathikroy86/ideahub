"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Ideas", href: "/ideas" },
    { label: "Add Idea", href: "/addideas" },
    { label: "My Ideas", href: "/my-ideas" },
    { label: "My Interactions", href: "/my-interactions" },
];

export default function Menubar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
            <nav className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
                <Link
                    href="/"
                    className="flex shrink-0 items-center"
                    aria-label="IdeaVault home"
                    onClick={() => setIsOpen(false)}
                >
                    <Image
                        src="/assets/ideahub-logo.png"
                        alt="IdeaVault"
                        width={190}
                        height={83}
                        priority
                        className="h-12 w-auto object-contain sm:h-14"
                    />
                </Link>

                <div className="hidden items-center gap-8 lg:flex xl:gap-11">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative py-7 text-sm font-semibold transition-colors duration-200 ${isActive
                                    ? "text-[#3651d6]"
                                    : "text-slate-950 hover:text-[#3651d6] dark:text-slate-100 dark:hover:text-[#8b9cff]"
                                    }`}
                            >
                                {item.label}
                                {isActive ? (
                                    <span className="absolute inset-x-0 bottom-5 mx-auto h-1 w-full rounded-full bg-[#6f7cf6]" />
                                ) : null}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden items-center gap-6 lg:flex">
                    <ThemeToggle />
                    {user ? <div className="flex items-center gap-2">
                        <Avatar>
                            <Avatar.Image alt={user.name} src={user.image} />
                            <Avatar.Fallback>JD</Avatar.Fallback>
                        </Avatar>
                        <Link onClick={handleLogout}
                            href="/signin"
                            className="rounded-xl bg-[#4f46e5] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(79,70,229,0.24)] transition hover:bg-[#4338ca] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2"
                        >
                            Logout
                        </Link>
                    </div> : <div className="flex gap-4 items-center">
                        <Link
                            href="/signin"
                            className="text-sm font-semibold text-slate-950 transition-colors hover:text-[#3651d6] dark:text-slate-100 dark:hover:text-[#8b9cff]"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="rounded-xl bg-[#4f46e5] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(79,70,229,0.24)] transition hover:bg-[#4338ca] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2"
                        >
                            Register
                        </Link>
                    </div>}

                </div>

                <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-950 transition hover:border-[#6f7cf6] hover:text-[#3651d6] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2 dark:border-slate-700 dark:text-slate-100 lg:hidden"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((open) => !open)}
                >
                    <span className="sr-only">
                        {isOpen ? "Close navigation menu" : "Open navigation menu"}
                    </span>
                    <span className="relative h-5 w-5">
                        <span
                            className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "translate-y-2 rotate-45" : ""
                                }`}
                        />
                        <span
                            className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "-translate-y-1.5 -rotate-45" : ""
                                }`}
                        />
                    </span>
                </button>
            </nav>

            <div
                className={`overflow-hidden border-t border-slate-100 bg-white transition-[max-height,opacity] duration-300 dark:border-slate-800 dark:bg-slate-950 lg:hidden ${isOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${isActive
                                    ? "bg-[#eef0ff] text-[#3651d6] dark:bg-slate-800 dark:text-[#8b9cff]"
                                    : "text-slate-950 hover:bg-slate-50 hover:text-[#3651d6] dark:text-slate-100 dark:hover:bg-slate-900 dark:hover:text-[#8b9cff]"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 px-3 pt-4 dark:border-slate-800">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Dark mode
                        </span>
                        <ThemeToggle />
                    </div>

                    <div className="mt-3 grid gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-2">
                        {user ? <div className="flex items-center gap-2">
                            <Avatar>
                                <Avatar.Image alt={user.name} src={user.image} />
                                <Avatar.Fallback>JD</Avatar.Fallback>
                            </Avatar>
                            <Link onClick={handleLogout}
                                href="/signin"
                                className="rounded-xl bg-[#4f46e5] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(79,70,229,0.24)] transition hover:bg-[#4338ca] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2"
                            >
                                Logout
                            </Link>
                        </div> : <div className="flex flex-col gap-3">
                            <Link
                                href="/signin"
                                className="text-sm font-semibold text-slate-950 transition-colors hover:text-[#3651d6] dark:text-slate-100 dark:hover:text-[#8b9cff] w-full"
                            ><Button variant="ghost">Login</Button>
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-xl bg-[#4f46e5] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(79,70,229,0.24)] transition hover:bg-[#4338ca] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2"
                            >
                                Register
                            </Link>
                        </div>}
                    </div>
                </div>
            </div>
        </header>
    );
}


import { Button, Form, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Ideas", href: "/ideas" },
      { label: "Categories", href: "/categories" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guidelines", href: "/guidelines" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Support", href: "/support" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <path d="M14.25 8.65H12.1V7.25c0-.48.32-.6.55-.6h1.55V4.17L12.07 4.16c-2.37 0-2.91 1.77-2.91 2.9v1.59H7.25v2.55h1.91v7.2h2.94v-7.2h1.98l.27-2.55Z" />
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <path d="M13.65 10.33 18.35 5h-1.11l-4.09 4.63L9.9 5H6.15l4.93 7.04L6.15 17.6h1.12l4.27-4.84 3.41 4.84h3.75l-5.05-7.27Zm-1.51 1.72-.49-.69-3.98-5.53h1.79l3.2 4.46.49.69 4.18 5.82h-1.79l-3.4-4.75Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <path d="M7.28 8.82h2.58v8.3H7.28v-8.3Zm1.29-4.12a1.49 1.49 0 1 1 0 2.98 1.49 1.49 0 0 1 0-2.98Zm4 4.12h2.47v1.13h.03c.34-.65 1.19-1.33 2.44-1.33 2.61 0 3.09 1.72 3.09 3.95v4.55h-2.57v-4.04c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.05-1.55 2.13v4.11h-2.57v-8.3Z" />
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <path d="M12 4.35a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.38c-2.24.49-2.71-1.08-2.71-1.08-.37-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.81.06 1.24.84 1.24.84.72 1.23 1.89.88 2.35.67.07-.52.28-.88.51-1.08-1.79-.2-3.67-.9-3.67-3.98 0-.88.31-1.6.83-2.16-.08-.2-.36-1.03.08-2.13 0 0 .68-.22 2.2.82A7.56 7.56 0 0 1 12 8.16c.68 0 1.36.09 2 .27 1.52-1.04 2.19-.82 2.19-.82.44 1.1.16 1.93.08 2.13.52.56.83 1.28.83 2.16 0 3.09-1.88 3.77-3.68 3.97.29.25.55.74.55 1.49v2.2c0 .21.14.46.56.38A8 8 0 0 0 12 4.35Z" />
    ),
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-950 dark:border-slate-700 dark:bg-[#071426] dark:text-slate-300 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_3fr_1.5fr]">
          <section className="max-w-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="IdeaVault home"
            >
              <span className="relative inline-flex h-9 w-9 overflow-hidden rounded-full bg-white">
                <Image
                  src="/assets/ideahub-logo.png"
                  alt=""
                  width={82}
                  height={36}
                  className="absolute left-0 top-1/2 h-9 w-[82px] -translate-y-1/2 object-cover object-left"
                />
              </span>
              <span className="text-2xl font-black tracking-normal text-slate-950 dark:text-white">
                IdeaVault
              </span>
            </Link>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
              A platform to share ideas, get feedback, and build the future
              together.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  aria-label={social.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition hover:bg-[#4f46e5] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2 focus:ring-offset-transparent dark:bg-slate-700 dark:text-slate-200 dark:focus:ring-offset-[#071426]"
                  href={social.href}
                  key={social.label}
                  target="_blank"
                >
                  <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </Link>
              ))}
            </div>
          </section>

          <nav className="grid gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h2 className="text-base font-bold text-slate-950 dark:text-white">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <section>
            <h2 className="text-base font-bold text-slate-950 dark:text-white">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-500 dark:text-slate-300">
              Get updates on new ideas and features.
            </p>
            <Form className="mt-5 gap-4">
              <Input
                fullWidth
                aria-label="Email address"
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-[#6f7cf6] focus:ring-2 focus:ring-[#6f7cf6]/25 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                name="email"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                className="h-12 w-full rounded-md bg-[#4f46e5] px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(79,70,229,0.25)] transition hover:bg-[#4338ca] sm:w-auto"
                type="submit"
              >
                Subscribe
              </Button>
            </Form>
          </section>
        </div>

        <div className="mt-10 border-t border-slate-700/60 dark:border-slate-600/60 pt-6 text-center">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            © 2026 IdeaVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

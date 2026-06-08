"use client";
import Link from "next/link";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const GoogleIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path fill="#4285F4" d="M23.64 12.204c0-.777-.07-1.558-.203-2.332H12v4.422h6.432c-.278 1.492-1.09 2.756-2.327 3.61v2.998h3.76c2.2-2.028 3.467-5.01 3.467-8.698z" />
        <path fill="#34A853" d="M12 24c2.97 0 5.467-0.98 7.29-2.66l-3.76-2.998c-1.043.7-2.38 1.114-3.53 1.114-2.71 0-5-1.83-5.82-4.29H2.28v2.69C4.096 21.91 7.78 24 12 24z" />
        <path fill="#FBBC05" d="M6.18 14.166c-.23-.7-.36-1.45-.36-2.166s.13-1.466.36-2.166v-2.69H2.28c-.72 1.44-1.14 3.06-1.14 4.856s.42 3.416 1.14 4.856l3.9-2.69z" />
        <path fill="#EA4335" d="M12 4.78c1.62 0 3.08.56 4.23 1.66l3.17-3.17C17.457 1.16 14.97 0 12 0 7.78 0 4.096 2.09 2.28 5.84l3.9 2.69C7 6.61 9.29 4.78 12 4.78z" />
    </svg>
);

const SignupPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        console.log(user)
        const { data, error } = await authClient.signUp.email({
            name: user.name, // required
            email: user.email, // required
            password: user.password, // required
            image: user.imageurl,
        });
        if (error) {
            console.log(error)
        }
    }
    return (
        <main className="min-h-[calc(100vh-5rem)] bg-[#f7f8ff] dark:bg-slate-950 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#4f46e5]">Create account</p>
                    <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">Register to IdeaVault</h1>
                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Create your account to share ideas, collaborate with builders, and grow together.
                    </p>
                </div>

                <Button
                    type="button"
                    variant="secondary"
                    className="mb-5 flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600"
                >
                    <GoogleIcon />
                    Continue with Google
                </Button>

                <div className="relative py-4">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200 dark:bg-slate-700" />
                    <span className="relative mx-auto inline-flex bg-white px-3 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                        Or sign up with email
                    </span>
                </div>

                <Form className="space-y-5" onSubmit={onSubmit}>
                    <TextField isRequired name="name">
                        <Label>Full Name</Label>
                        <Input placeholder="John Doe" />
                        <Description>Please enter your full name.</Description>
                    </TextField>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField name="imageurl" type="url">
                        <Label>Profile image URL</Label>
                        <Input placeholder="https://example.com/avatar.jpg" />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>At least 8 characters, one uppercase letter, and one number.</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                        <Button
                            type="submit"
                            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#4f46e5] px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(79,70,229,0.25)] transition hover:bg-[#4338ca] sm:w-auto"
                        >
                            <Check />
                            Register
                        </Button>
                        <Button
                            type="reset"
                            variant="secondary"
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800 sm:w-auto"
                        >
                            Reset
                        </Button>
                    </div>
                </Form>

                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-[#4f46e5] hover:text-[#4338ca]">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};
export default SignupPage;
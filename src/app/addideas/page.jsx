"use client";

import { Button, Form, Input, ListBox, Select, TextArea } from "@heroui/react";
import toast from "react-hot-toast";

const categories = [
    { id: "startup", label: "Startup" },
    { id: "saas", label: "SaaS" },
    { id: "ai", label: "AI" },
    { id: "education", label: "Education" },
    { id: "health", label: "Health" },
    { id: "fintech", label: "Fintech" },
    { id: "community", label: "Community" },
];

const fieldStyles =
    "h-12 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-none outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#6f7cf6] focus:ring-2 focus:ring-[#6f7cf6]/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600";

const textAreaStyles =
    "min-h-28 resize-none rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-none outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#6f7cf6] focus:ring-2 focus:ring-[#6f7cf6]/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600";

const Field = ({ children, label }) => (
    <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-950 dark:text-slate-100">{label}</label>
        {children}
    </div>
);

const AddIdeasPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const ideas = Object.fromEntries(formData.entries());
        const res = await fetch('http://localhost:8008/ideas', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ideas)
        })
        const data = await res.json();
        if (data) {
            toast.success("Successfully Submitted!")
        }
    }
    return (
        <main className="min-h-[calc(100vh-5rem)] bg-[#f7f8ff] dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
            <section className="mx-auto w-full max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-black tracking-normal text-slate-950 dark:text-white sm:text-4xl">
                        Add New Idea
                    </h1>
                    <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-300 sm:text-base">
                        Share your startup idea with the community.
                    </p>
                </div>

                <Form onSubmit={onSubmit} className="rounded-xl border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-950 p-5 shadow-[0_18px_55px_rgba(42,53,121,0.08)] dark:shadow-none sm:p-7">
                    <div className="grid w-full gap-5">
                        <Field label="Full Name">
                            <Input
                                fullWidth
                                name="name"
                                placeholder="Enter your full name"
                                className={fieldStyles}
                                required
                            />
                        </Field>

                        <Field label="Idea Title">
                            <Input
                                fullWidth
                                name="title"
                                placeholder="Enter a catchy title for your idea"
                                className={fieldStyles}
                                required
                            />
                        </Field>

                        <Field label="Short Description">
                            <TextArea
                                fullWidth
                                name="shortDescription"
                                placeholder="Provide a short summary of your idea"
                                className={textAreaStyles}
                                required
                            />
                        </Field>

                        <Field label="Detailed Description">
                            <TextArea
                                fullWidth
                                name="detailedDescription"
                                placeholder="Explain your idea in detail"
                                className={`${textAreaStyles} min-h-44`}
                                required
                            />
                        </Field>

                        <div className="grid gap-5 md:grid-cols-2">
                            <Field label="Category">
                                <Select
                                    fullWidth
                                    name="category"
                                    placeholder="Select category"
                                    className="w-full"
                                >
                                    <Select.Trigger className={fieldStyles}>
                                        <Select.Value className="text-left text-sm text-slate-500 dark:text-slate-300">
                                            {({ selectedText }) => selectedText || "Select category"}
                                        </Select.Value>
                                        <Select.Indicator className="ml-auto h-4 w-4 text-slate-400 dark:text-slate-500" />
                                    </Select.Trigger>
                                    <Select.Popover className="rounded-lg border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-900 p-1 shadow-xl">
                                        <ListBox>
                                            {categories.map((category) => (
                                                <ListBox.Item
                                                    key={category.id}
                                                    id={category.id}
                                                    textValue={category.label}
                                                    className="rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-200 outline-none hover:bg-[#eef0ff] dark:hover:bg-slate-800 hover:text-[#3651d6] focus:bg-[#eef0ff] dark:focus:bg-slate-800 focus:text-[#3651d6]"
                                                >
                                                    {category.label}
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </Field>

                            <Field label="Tags (optional)">
                                <Input
                                    fullWidth
                                    name="tags"
                                    placeholder="e.g. AI, healthcare, education"
                                    className={fieldStyles}
                                />
                            </Field>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <Field label="Image URL">
                                <Input
                                    fullWidth
                                    name="imageUrl"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    className={fieldStyles}
                                />
                            </Field>

                            <Field label="Estimated Budget (optional)">
                                <Input
                                    fullWidth
                                    name="estimatedBudget"
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 50000"
                                    className={fieldStyles}
                                />
                            </Field>
                        </div>

                        <Field label="Target Audience">
                            <Input
                                fullWidth
                                name="targetAudience"
                                placeholder="Who is your target audience?"
                                className={fieldStyles}
                            />
                        </Field>

                        <Field label="Problem Statement">
                            <TextArea
                                fullWidth
                                name="problemStatement"
                                placeholder="What problem does your idea solve?"
                                className={`${textAreaStyles} min-h-32`}
                            />
                        </Field>

                        <Field label="Proposed Solution">
                            <TextArea
                                fullWidth
                                name="proposedSolution"
                                placeholder="How does your idea solve this problem?"
                                className={`${textAreaStyles} min-h-56`}
                            />
                        </Field>
                    </div>

                    <div className="mt-7 grid w-full gap-4 sm:grid-cols-2">
                        <Button
                            type="reset"
                            variant="secondary"
                            className="h-12 w-full rounded-md border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="h-12 w-full rounded-md bg-[#5b5cf4] text-sm font-bold text-white shadow-[0_12px_28px_rgba(79,70,229,0.24)] transition hover:bg-[#4849e7] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2"
                        >
                            Submit Idea
                        </Button>
                    </div>
                </Form>
            </section>
        </main>
    );
};

export default AddIdeasPage;

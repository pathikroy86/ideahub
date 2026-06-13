"use client";

import { getClientAuthHeaders } from "@/lib/client-token";
import { Button, Form, Input, Modal, TextArea, useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const fieldStyles =
    "h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#6f7cf6] focus:ring-2 focus:ring-[#6f7cf6]/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";

const textAreaStyles =
    "min-h-24 resize-none rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#6f7cf6] focus:ring-2 focus:ring-[#6f7cf6]/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";

const Field = ({ children, label }) => (
    <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-950 dark:text-slate-100">
            {label}
        </label>
        {children}
    </div>
);

const IdeaActions = ({ idea }) => {
    const router = useRouter();
    const editModal = useOverlayState();

    const handleEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedIdea = Object.fromEntries(formData.entries());
        const authHeaders = await getClientAuthHeaders();

        if (!authHeaders.authorization) {
            toast.error("Please login again.");
            return;
        }

        const res = await fetch(`http://localhost:8008/ideas/${idea._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                ...authHeaders,
            },
            body: JSON.stringify(updatedIdea),
        });

        const data = await res.json();

        if (res.ok && data) {
            toast.success("Idea updated.");
            editModal.close();
            router.refresh();
        } else {
            toast.error(data?.message || "Could not update idea.");
        }
    };

    const handleDelete = async () => {
        const shouldDelete = window.confirm("Are you sure you want to delete this idea?");

        if (!shouldDelete) {
            return;
        }

        const authHeaders = await getClientAuthHeaders();

        if (!authHeaders.authorization) {
            toast.error("Please login again.");
            return;
        }

        const res = await fetch(`http://localhost:8008/ideas/${idea._id}`, {
            method: "DELETE",
            headers: authHeaders,
        });

        const data = await res.json();

        if (res.ok && data) {
            toast.success("Idea deleted.");
            router.refresh();
        } else {
            toast.error(data?.message || "Could not delete idea.");
        }
    };

    return (
        <>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                    type="button"
                    onClick={editModal.open}
                    className="h-10 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-[#6f7cf6] hover:text-[#4f46e5] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                    Edit
                </Button>
                <Button
                    type="button"
                    onClick={handleDelete}
                    className="h-10 rounded-lg bg-red-500 text-sm font-bold text-white transition hover:bg-red-600"
                >
                    Delete
                </Button>
            </div>

            <Modal state={editModal}>
                <Modal.Backdrop className="fixed inset-0 z-[80] bg-slate-950/60 backdrop-blur-sm">
                    <Modal.Container
                        placement="center"
                        scroll="inside"
                        size="3xl"
                        className="fixed inset-x-4 top-6 z-[90] mx-auto max-h-[calc(100vh-3rem)] max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
                    >
                        <Modal.Dialog className="outline-none">
                            <Modal.Header className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 dark:border-slate-800">
                                <div>
                                    <Modal.Heading className="text-2xl font-black text-slate-950 dark:text-white">
                                        Edit Idea
                                    </Modal.Heading>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Update all information for this idea.
                                    </p>
                                </div>
                                <Modal.CloseTrigger className="rounded-full px-3 py-1 text-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                                    ×
                                </Modal.CloseTrigger>
                            </Modal.Header>

                            <Form onSubmit={handleEdit}>
                                <Modal.Body className="max-h-[65vh] overflow-y-auto p-5">
                                    <div className="grid gap-4">
                                        <Field label="Full Name">
                                            <Input name="name" defaultValue={idea.name || ""} className={fieldStyles} />
                                        </Field>

                                        <Field label="Idea Title">
                                            <Input name="title" defaultValue={idea.title || ""} className={fieldStyles} required />
                                        </Field>

                                        <Field label="Short Description">
                                            <TextArea name="shortDescription" defaultValue={idea.shortDescription || ""} className={textAreaStyles} required />
                                        </Field>

                                        <Field label="Detailed Description">
                                            <TextArea name="detailedDescription" defaultValue={idea.detailedDescription || ""} className={`${textAreaStyles} min-h-36`} />
                                        </Field>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <Field label="Category">
                                                <Input name="category" defaultValue={idea.category || ""} className={fieldStyles} />
                                            </Field>
                                            <Field label="Tags">
                                                <Input name="tags" defaultValue={idea.tags || ""} className={fieldStyles} />
                                            </Field>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <Field label="Image URL">
                                                <Input name="imageUrl" type="url" defaultValue={idea.imageUrl || ""} className={fieldStyles} />
                                            </Field>
                                            <Field label="Estimated Budget">
                                                <Input name="estimatedBudget" type="number" defaultValue={idea.estimatedBudget || ""} className={fieldStyles} />
                                            </Field>
                                        </div>

                                        <Field label="Target Audience">
                                            <Input name="targetAudience" defaultValue={idea.targetAudience || ""} className={fieldStyles} />
                                        </Field>

                                        <Field label="Problem Statement">
                                            <TextArea name="problemStatement" defaultValue={idea.problemStatement || ""} className={textAreaStyles} />
                                        </Field>

                                        <Field label="Proposed Solution">
                                            <TextArea name="proposedSolution" defaultValue={idea.proposedSolution || ""} className={textAreaStyles} />
                                        </Field>
                                    </div>
                                </Modal.Body>

                                <Modal.Footer className="grid gap-3 border-t border-slate-100 p-5 dark:border-slate-800 sm:grid-cols-2">
                                    <Button
                                        type="button"
                                        onClick={editModal.close}
                                        className="h-11 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="h-11 rounded-lg bg-[#4f46e5] text-sm font-bold text-white hover:bg-[#4338ca]"
                                    >
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
};

export default IdeaActions;

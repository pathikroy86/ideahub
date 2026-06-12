"use client";

import { getClientAuthHeaders } from "@/lib/client-token";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const IdeaActions = ({ idea }) => {
    const router = useRouter();

    const handleEdit = async () => {
        const newTitle = window.prompt("Edit idea title", idea.title);

        if (!newTitle) {
            return;
        }

        const newShortDescription = window.prompt(
            "Edit short description",
            idea.shortDescription
        );

        if (!newShortDescription) {
            return;
        }

        const authHeaders = await getClientAuthHeaders();

        if (!authHeaders.authorization) {
            toast.error("Please login again.");
            return;
        }

        const res = await fetch(`http://localhost:8008/ideas/${idea._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                ...authHeaders,
            },
            body: JSON.stringify({
                title: newTitle,
                shortDescription: newShortDescription,
            }),
        });

        const data = await res.json();

        if (res.ok && data) {
            toast.success("Idea updated.");
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
        <div className="mt-4 grid grid-cols-2 gap-3">
            <Button
                type="button"
                onClick={handleEdit}
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
    );
};

export default IdeaActions;

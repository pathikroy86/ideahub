"use client";

import { getClientAuthHeaders } from "@/lib/client-token";
import { Button, Form, TextArea } from "@heroui/react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const formatDate = (date) => {
    return new Date(date).toLocaleString();
};

const getInitials = (name) => {
    return name
        .split(" ")
        .map((part) => part[0]?.toUpperCase())
        .slice(0, 2)
        .join("");
};

const Comments = ({ comments = [], currentUserId, ideaId }) => {
    const [allComments, setAllComments] = useState(comments);
    const [commentText, setCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const commentCount = allComments.length;

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!commentText.trim()) {
            toast.error("Please write a comment.");
            return;
        }

        const authHeaders = await getClientAuthHeaders();

        if (!authHeaders.authorization) {
            toast.error("Please login again.");
            return;
        }

        const res = await fetch(`http://localhost:8008/ideas/${ideaId}/comments`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                ...authHeaders,
            },
            body: JSON.stringify({ text: commentText }),
        });

        const data = await res.json();

        if (res.ok) {
            const newComment = {
                _id: data.insertedId,
                ideaId,
                userId: currentUserId,
                userName: "You",
                text: commentText,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setAllComments([newComment, ...allComments]);
            setCommentText("");
            toast.success("Comment added.");
        } else {
            toast.error(data?.message || "Could not add comment.");
        }
    };

    const startEditComment = (comment) => {
        setEditingCommentId(comment._id);
        setEditingText(comment.text);
    };

    const cancelEditing = () => {
        setEditingCommentId(null);
        setEditingText("");
    };

    const handleSaveComment = async (comment) => {
        if (!editingText.trim()) {
            toast.error("Comment cannot be empty.");
            return;
        }

        const authHeaders = await getClientAuthHeaders();

        if (!authHeaders.authorization) {
            toast.error("Please login again.");
            return;
        }

        const res = await fetch(`http://localhost:8008/comments/${comment._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                ...authHeaders,
            },
            body: JSON.stringify({ text: editingText }),
        });

        const data = await res.json();

        if (res.ok) {
            setAllComments((current) =>
                current.map((item) =>
                    item._id === comment._id
                        ? { ...item, text: editingText, updatedAt: new Date().toISOString() }
                        : item
                )
            );
            cancelEditing();
            toast.success("Comment updated.");
        } else {
            toast.error(data?.message || "Could not update comment.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        const shouldDelete = window.confirm("Delete this comment?");

        if (!shouldDelete) {
            return;
        }

        const authHeaders = await getClientAuthHeaders();

        if (!authHeaders.authorization) {
            toast.error("Please login again.");
            return;
        }

        const res = await fetch(`http://localhost:8008/comments/${commentId}`, {
            method: "DELETE",
            headers: authHeaders,
        });

        const data = await res.json();

        if (res.ok) {
            setAllComments((current) => current.filter((comment) => comment._id !== commentId));
            toast.success("Comment deleted.");
        } else {
            toast.error(data?.message || "Could not delete comment.");
        }
    };

    const commentCountLabel = useMemo(() => {
        return `${commentCount} ${commentCount === 1 ? "Comment" : "Comments"}`;
    }, [commentCount]);

    return (
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:bg-slate-900 dark:shadow-none">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4f46e5]">
                        Community discussion
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                        {commentCountLabel}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                        Share your feedback, ask questions, and engage with other idea builders.
                    </p>
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm dark:bg-slate-950 dark:text-slate-100">
                    {commentCountLabel}
                </div>
            </div>

            <Form id="comment-form" onSubmit={handleAddComment} className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 sm:grid-cols-[1.5fr_auto]">
                <div className="space-y-3 min-w-0">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef0ff] text-lg font-bold text-[#4f46e5]">
                            {getInitials("You")}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-950 dark:text-white">Add a comment</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Be thoughtful and constructive.</p>
                        </div>
                    </div>
                    <TextArea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write your comment..."
                        className="w-full min-h-28 resize-none rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none shadow-sm transition hover:border-slate-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                </div>
                <div className="hidden items-end justify-end sm:flex">
                    <Button
                        type="submit"
                        className="rounded-full bg-[#4f46e5] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#4338ca]"
                    >
                        Add Comment
                    </Button>
                </div>
            </Form>
            <div className="mt-4 flex justify-end sm:hidden">
                <Button
                    type="submit"
                    form="comment-form"
                    className="rounded-full bg-[#4f46e5] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#4338ca]"
                >
                    Add Comment
                </Button>
            </div>

            <div className="mt-6 space-y-4">
                {allComments.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                        No comments yet. Start the discussion and invite others to join.
                    </div>
                )}

                {allComments.map((comment) => {
                    const isOwner = comment.userId === currentUserId;

                    return (
                        <article
                            key={comment._id}
                            className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#eef0ff] text-xl font-bold text-[#4f46e5]">
                                    {getInitials(comment.userName)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-950 dark:text-white">{comment.userName}</p>
                                            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                                                {formatDate(comment.createdAt)}
                                                {comment.updatedAt !== comment.createdAt ? " · edited" : ""}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                            Active
                                        </div>
                                    </div>

                                    {editingCommentId === comment._id ? (
                                        <div className="mt-4 space-y-3">
                                            <TextArea
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                className="min-h-24 w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                            />
                                            <div className="flex flex-wrap gap-3">
                                                <Button
                                                    type="button"
                                                    onClick={() => handleSaveComment(comment)}
                                                    className="rounded-full bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4338ca]"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    type="button"
                                                    onClick={cancelEditing}
                                                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                            {comment.text}
                                        </p>
                                    )}

                                    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        {isOwner && (
                                            <div className="inline-flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => startEditComment(comment)}
                                                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="rounded-2xl bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default Comments;

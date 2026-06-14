import { auth } from "@/lib/auth";
import { getAuthHeaders } from "@/lib/server-token";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const getDateText = (date) => {
    if (!date) {
        return "No date";
    }

    return new Date(date).toLocaleString();
};

const MyInteractionsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    const authHeaders = await getAuthHeaders();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-interactions/${user?.id}`, {
        headers: authHeaders,
        cache: "no-store",
    });

    const ideas = res.ok ? await res.json() : [];

    return (
        <main className="min-h-[calc(100vh-5rem)] bg-[#f7f8ff] px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
            <section className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-normal text-[#4f46e5]">
                        User Activity
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-normal text-slate-950 dark:text-white sm:text-4xl">
                        My Interactions
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Ideas where {user?.name || "you"} added comments.
                    </p>
                </div>

                {ideas.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {ideas.map((idea) => (
                            <article
                                key={idea._id}
                                className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-900"
                            >
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    {idea.imageUrl ? (
                                        <Image
                                            alt={idea.title}
                                            className="object-cover"
                                            fill
                                            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                                            src={idea.imageUrl}
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-indigo-50 text-5xl font-bold text-indigo-200 dark:bg-slate-800">
                                            {idea.title?.charAt(0) || "I"}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#4f46e5]">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-sm dark:bg-slate-800">
                                            C
                                        </span>
                                        <span>
                                            Commented {idea.commentCount || 0} time{idea.commentCount === 1 ? "" : "s"}
                                        </span>
                                    </div>

                                    <Link href={`/ideas/${idea._id}`}>
                                        <h2 className="line-clamp-2 text-xl font-bold text-slate-950 hover:text-[#4f46e5] dark:text-white">
                                            {idea.title}
                                        </h2>
                                    </Link>

                                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        {idea.shortDescription || "No short description added."}
                                    </p>

                                    {idea.lastComment ? (
                                        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                                            <p className="text-xs font-bold uppercase tracking-normal text-slate-500 dark:text-slate-400">
                                                Latest Comment
                                            </p>
                                            <p className="mt-2 line-clamp-3 text-sm text-slate-700 dark:text-slate-200">
                                                {idea.lastComment.text}
                                            </p>
                                            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                                {getDateText(idea.lastComment.createdAt)}
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                            No commented ideas yet
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Comment on an idea and it will show up here.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default MyInteractionsPage;

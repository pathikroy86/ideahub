import { auth } from '@/lib/auth';
import { getAuthHeaders } from '@/lib/server-token';
import { headers } from 'next/headers';
import React from 'react';
import IdeaCard from '../components/IdeaCard';

const MyIdeasPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/myideas/${user?.id}`, {
        headers: authHeaders,
        cache: "no-store",
    });
    const ideas = res.ok ? await res.json() : [];

    return (
        <main className="min-h-[calc(100vh-5rem)] bg-[#f7f8ff] px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
            <section className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-normal text-[#4f46e5]">
                        Dashboard
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-normal text-slate-950 dark:text-white sm:text-4xl">
                        My Ideas
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Ideas submitted by {user?.name || "you"}. You can edit or delete your own ideas from here.
                    </p>
                </div>

                {ideas.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
                        {ideas.map((idea) => (
                            <IdeaCard key={idea._id} idea={idea} showActions />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                            No ideas yet
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Add a new idea and it will show up here.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default MyIdeasPage;

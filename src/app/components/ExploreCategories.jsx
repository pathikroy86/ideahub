import { getAuthHeaders } from "@/lib/server-token";

const categoryIcons = {
    Technology: "⚙️",
    Health: "🩺",
    Education: "🎓",
    Finance: "💳",
    Community: "🌐",
    AI: "🤖",
    Startup: "🚀",
};

const formatCategoryTitle = (category) => {
    if (!category) return "Other";
    return category
        .toString()
        .split(/[-_\s]/)
        .map((word) => word[0]?.toUpperCase() + word.slice(1))
        .join(" ");
};

const getDescription = (category) => {
    const title = formatCategoryTitle(category);
    return `${title} ideas and innovation from the community.`;
};

const getTopTags = (tagSet) => {
    return Array.from(tagSet)
        .slice(0, 3)
        .map((tag) => tag.toString())
        .filter(Boolean);
};

const buildCategoryCards = (ideas) => {
    const categories = new Map();

    ideas.forEach((idea) => {
        const rawCategory = idea.category || "Other";
        const title = formatCategoryTitle(rawCategory);
        const entry = categories.get(title) || {
            id: title.toLowerCase().replace(/\s+/g, "-"),
            title,
            count: 0,
            tags: new Set(),
            icon: categoryIcons[title] || "📌",
            description: getDescription(title),
        };

        entry.count += 1;

        if (idea.tags) {
            const tags = Array.isArray(idea.tags)
                ? idea.tags
                : idea.tags.toString().split(",").map((tag) => tag.trim());
            tags.forEach((tag) => tag && entry.tags.add(tag));
        }

        categories.set(title, entry);
    });

    return Array.from(categories.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 4)
        .map((category) => ({
            ...category,
            label: `${category.count} ideas`,
            tags: getTopTags(category.tags),
        }));
};

const ExploreCategories = async () => {
    const res = await fetch("http://localhost:8008/ideas", {
        headers: await getAuthHeaders(),
        cache: "no-store",
    });
    const ideas = res.ok ? await res.json() : [];
    const categories = buildCategoryCards(Array.isArray(ideas) ? ideas : []);

    return (
        <section className="bg-[#f7f8ff] dark:bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#4f46e5]">
                            Explore by categories
                        </p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                            Discover ideas by industry and focus area.
                        </h2>
                        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                            Browse the most popular categories and jump straight into the ideas your team needs.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="hidden rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-900 md:inline-flex"
                    >
                        View all categories
                    </button>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {categories.map((category) => (
                        <article
                            key={category.id}
                            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_65px_rgba(15,23,42,0.14)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#eef0ff] text-2xl">
                                    {category.icon}
                                </span>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                    {category.label}
                                </span>
                            </div>

                            <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-white">
                                {category.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                {category.description}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {category.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreCategories;

import { PersonPencil } from "@gravity-ui/icons";
import Image from "next/image";

const formatCategory = (category) =>
    category ? category.charAt(0).toUpperCase() + category.slice(1) : "General";

const IdeaCard = ({ idea }) => {
    const { title, shortDescription, category, name, imageUrl } = idea;

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
                {imageUrl ? (
                    <Image
                        alt={title}
                        className="object-cover transition duration-300 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                        src={imageUrl}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 text-5xl font-bold text-indigo-200">
                        {title?.charAt(0) ?? "?"}
                    </div>
                )}

                {category ? (
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/90 dark:bg-slate-800/90 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-slate-100 shadow-sm backdrop-blur-sm">
                        {formatCategory(category)}
                    </span>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h4 className="line-clamp-2 text-lg font-semibold text-gray-700 dark:text-slate-100">{title}</h4>
                <p className="line-clamp-2 flex-1 text-sm font-medium leading-relaxed text-gray-500 dark:text-slate-400">
                    {shortDescription}
                </p>
                {name ? (
                    <p className="flex items-center gap-1 pt-1 text-sm font-medium text-gray-500 dark:text-slate-400">
                        <PersonPencil className="h-4 w-4 shrink-0" />
                        {name}
                    </p>
                ) : null}
            </div>
        </article>
    );
};

export default IdeaCard;

import { Chip } from "@heroui/react";
import { getAuthHeaders } from "@/lib/server-token";
import Image from "next/image";

const IdeaDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:8008/ideas/${id}`, {
        headers: await getAuthHeaders(),
        cache: "no-store",
    });
    const data = await res.json();
    const tags = data.tags.split(",");
    const { _id, name, imageUrl, category, detailedDescription, estimatedBudget, problemStatement, proposedSolution, shortDescription, targetAudience, title } = data;
    console.log(data, tags)
    return (
        <div className="md:grid grid-cols-3 container mx-auto gap-5 bg-gray-100 rounded-xl p-3 mb-5">
            <div className="col-span-2 space-y-5">
                <Image className="rounded-xl w-full"
                    src={imageUrl}
                    alt={title}
                    width={500}
                    height={500}
                />
                <h3 className="text-2xl font-semibold">Detailed Description</h3>
                <p className="text-gray-500 font-bold bg-white p-2 rounded-xl">{detailedDescription}</p>
            </div>
            <div className="col-span-1">
                <div className="bg-white p-3 rounded-xl space-y-3 mb-3">
                    <h4 className="text-lg font-bold border-b border-b-gray-200 pb-1">Details</h4>
                    <div className="flex justify-between border-b border-b-gray-200 pb-1">
                        <p className="font-bold">Category</p>
                        <p className="text-gray-500 font-bold">{category}</p>
                    </div>
                    <div className="flex justify-between border-b border-b-gray-200 pb-1">
                        <p className="font-bold">Budget</p>
                        <p className="text-gray-500 font-bold">{estimatedBudget}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <p className="font-bold">Target Audience</p>
                        <p className="text-gray-500 font-bold">{targetAudience}</p>
                    </div>
                </div>
                <div className="bg-white p-3 rounded-xl mb-3">
                    <h3 className="text-lg font-bold">Problem</h3>
                    <p className="text-gray-500 font-bold">{problemStatement}</p>
                </div>
                <div className="bg-white p-3 rounded-xl mb-3">
                    <h3 className="text-lg font-bold">Solution</h3>
                    <p className="text-gray-500 font-bold">{proposedSolution}</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl">
                    {
                        tags.map((tag, index) => <Chip key={index} color="accent"># {tag}</Chip>)
                    }
                </div>
            </div>
        </div>
    );
};

export default IdeaDetailsPage;

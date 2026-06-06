import IdeaCard from "./IdeaCard";

const FeaturedIdeas = async () => {
    const res = await fetch('http://localhost:8008/ideas');
    const ideas = await res.json();
    return (
        <div className="container mx-auto mt-5 md:mt-8 px-8 py-5">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-5">Trending Ideas</h1>
            <div className="bg-gray-100 p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    ideas.map(idea => <IdeaCard key={idea._id} idea={idea}></IdeaCard>)
                }
            </div>
        </div>
    );
};

export default FeaturedIdeas;
import React from 'react';
import IdeaCard from '../components/IdeaCard';
import { Label, SearchField } from '@heroui/react';
import { getAuthHeaders } from '@/lib/server-token';

const IdeasPage = async () => {
    const res = await fetch('http://localhost:8008/ideas', {
        headers: await getAuthHeaders(),
        cache: "no-store",
    });
    const ideas = await res.json();
    return (
        <div className='container mx-auto mt-5'>
            <h1 className='text-2xl md:text-4xl lg:text-5xl font-semibold mb-4'>All Ideas</h1>
            <p className='text-gray-400 font-medium mb-6'>Explore and discover amazing startup ideas from the community.</p>
            <div className='mb-6 flex flex-col md:flex-row'>
                <div>
                    <SearchField name="search">
                        <Label>Search</Label>
                        <SearchField.Group>
                            <SearchField.SearchIcon />
                            <SearchField.Input className="w-[280px]" placeholder="Search..." />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    ideas.map(idea => <IdeaCard key={idea._id} idea={idea}></IdeaCard>)
                }
            </div>

        </div>
    );
};

export default IdeasPage;

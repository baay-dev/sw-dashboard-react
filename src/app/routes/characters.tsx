import ResultCard from "../../components/resultCard.tsx";
import {useState, useEffect, useCallback} from "react";
import {swapiService} from "../../services/swapi.service.tsx";
import {Button} from "@mui/material";
import type {CharacterDtoInterface} from "../../types/characterDto.interface.ts";

interface CharacterProps {
    searchValue: string;
}

function Characters({searchValue}: CharacterProps) {
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState<Array<CharacterDtoInterface>>([]);
    const [next, setNext] = useState(1);
    const [loadMore, setLoadMore] = useState(false);

    const fetchCharacters = useCallback(async (page = 1, append = false) => {
        setLoading(true);
        try {
            const data = await swapiService.getSearchCharacters(searchValue, page);
            if (append) {
                setCharacters(prev => [...prev, ...(data.results || [])]);
            } else {
                setCharacters(data.results || []);
            }
            setLoadMore(false);
            setNext(1);
            if(!data.next) return;
            const url = new URL(data.next);
            const pageNumber = url.searchParams.get('page');
            setNext(pageNumber ? parseInt(pageNumber) : 1);
            setLoadMore(true);
        } catch (error) {
            console.error('Failed to fetch characters:', error);
            if (!append) {
                setCharacters([]);
            }
        } finally {
            setLoading(false);
        }
    }, [searchValue]);

    function loadMoreButton() {
        if(!loadMore) return;
        return <Button variant="outlined" onClick={() => fetchCharacters(next, true)}>Load more...</Button>
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchCharacters(1, false);
        }, 250);

        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (<>
        <div className="cardsContainer">
            {characters.map((character, index) => (
                <ResultCard
                    key={index}
                    title={character.name}
                    description={`Birth year: ${character.birth_year}`}
                />
            ))}
        </div>

        {loadMoreButton()}
    </>)
}

export default Characters
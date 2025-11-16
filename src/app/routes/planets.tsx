import ResultCard from "../../components/resultCard.tsx";
import {useState, useEffect, useCallback} from "react";
import {swapiService} from "../../services/swapi.service.tsx";
import type {PlanetDtoInterface} from "../../types/planetDto.interface.ts";
import {Button} from "@mui/material";

interface PlanetsProps {
    searchValue: string;
}

function Planets({searchValue}: PlanetsProps) {
    const [loading, setLoading] = useState(true);
    const [planets, setPlanets] = useState<Array<PlanetDtoInterface>>([]);
    const [next, setNext] = useState(1);
    const [loadMore, setLoadMore] = useState(false);

    const fetchPlanets = useCallback(async (page = 1, append = false) => {
        setLoading(true);
        try {
            const data = await swapiService.getSearchPlanets(searchValue, page);
            if (append) {
                setPlanets(prev => [...prev, ...(data.results || [])]);
            } else {
                setPlanets(data.results || []);
            }
            setLoadMore(false);
            setNext(1);
            if(!data.next) return;
            const url = new URL(data.next);
            const pageNumber = url.searchParams.get('page');
            setNext(pageNumber ? parseInt(pageNumber) : 1);
            setLoadMore(true);
        } catch (error) {
            console.error('Failed to fetch planets:', error);
            if (!append) {
                setPlanets([]);
            }
        } finally {
            setLoading(false);
        }
    }, [searchValue]);

    function loadMoreButton() {
        if(!loadMore) return;
        return <Button variant="outlined" onClick={() => fetchPlanets(next, true)}>Load more...</Button>
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchPlanets(1, false);
        }, 250);

        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (<>
        <div className="cardsContainer">
            {planets.map((planet, index) => (
                <ResultCard
                    key={index}
                    title={planet.name}
                    description={`Climate: ${planet.climate}, Population: ${planet.population}`}
                />
            ))}
        </div>

        {loadMoreButton()}
    </>)
}

export default Planets
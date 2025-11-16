import ResultCard from "../../components/resultCard.tsx";
import {useState, useEffect} from "react";
import {swapiService} from "../../services/swapi.service.tsx";
import type {PlanetDtoInterface} from "../../types/planetDto.interface.ts";

interface PlanetsProps {
    searchValue: string;
}



function Planets({searchValue}: PlanetsProps) {
    const [loading, setLoading] = useState(true);
    const [planets, setPlanets] = useState<Array<PlanetDtoInterface>>([]);

    useEffect(() => {
        const fetchPlanets = async () => {
            setLoading(true);
            try {
                const data = await swapiService.getPlanets(searchValue);
                setPlanets(data.results || []);
            } catch (error) {
                console.error('Failed to fetch planets:', error);
                setPlanets([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchPlanets();
        }, 250);

        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (<>
        {planets.map((planet, index) => (
            <ResultCard
                key={index}
                title={planet.name}
                description={`Climate: ${planet.climate}, Population: ${planet.population}`}
            />
        ))}
    </>)
}

export default Planets
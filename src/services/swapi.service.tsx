import axios from "axios";
import type {ResponseInterface} from "../types/response.interface.ts";
import type {PlanetDtoInterface} from "../types/planetDto.interface.ts";

const BASE_API_URL = "https://swapi.dev/api/";
const BASE_PLANET_URL = `${BASE_API_URL}/planets`;
const BASE_CHARACTER_URL = `${BASE_API_URL}/people`;


export const swapiService = {
    async getSearchPlanets(value: string, page?: number) {
        try {
            const response = await axios.get(BASE_PLANET_URL, {
                params: { search: value,
                page}
            });
            return response.data as ResponseInterface<PlanetDtoInterface>;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
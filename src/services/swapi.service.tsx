import axios from "axios";

const BASE_API_URL = "https://swapi.dev/api/";
const BASE_PLANET_URL = `${BASE_API_URL}/planets`;
const BASE_CHARACTER_URL = `${BASE_API_URL}/people`;


export const swapiService = {
    async getPlanets(value: string) {
        try {
            const response = await axios.get(BASE_PLANET_URL, {
                params: { search: value }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
const API_URL = "https://swapi.dev/api/";

export type CharacterResponse = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export async function getCharacter(id: number): Promise<CharacterResponse> {
  return fetch(`${API_URL}/people/${id}`).then((res) => res.json());
}

export type Anime = {
    id: string
    name: string
    image: string;
}

export type Character = {
    id: string
    name: string
    image: string
    anime: Anime
}


const randomize = (array: any[]) => array.sort(() => Math.random() - 0.5);

export async function fetchAnimes(totalToFetch = 25): Promise<Anime[]> {
    const animes: Anime[] = [];
    const limit = 20;

    try {
        let offset = 0;

        while (animes.length < totalToFetch) {
            const res = await fetch(
                `https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=${limit}&page[offset]=${offset}`
            );

            if (!res.ok) {
                throw new Error(`Error fetching data: ${res.statusText}`);
            }

            const data: {
                data: {
                    id: string;
                    attributes: {
                        canonicalTitle: string;
                        posterImage?: { original?: string };
                    };
                }[];
            } = await res.json();

            // Transform and push the data
            data.data.forEach((anime) => {
                const { id } = anime;
                const { canonicalTitle, posterImage } = anime.attributes;

                if (!canonicalTitle || !posterImage?.original) return;

                animes.push({
                    id,
                    name: canonicalTitle,
                    image: posterImage?.original,
                });
            });

            offset += limit;

            if (data.data.length === 0) break;
        }

        return animes.slice(0, totalToFetch);
    } catch (error) {
        console.error("Error fetching popular anime:", error);
        return [];
    }
}

export default async function fetchCharacters(level: "easy" | "medium" | "difficult" | "extreme" = "easy"): Promise<{ characters: Character[], animes: Anime[] }> {
    const data: Character[] = [];
    const dataAnime: Anime[] = [];

    const totalToFetch = level === "easy" ? 10 : level === "medium" ? 20 : level === "difficult" ? 40 : 60;

    const allAnimes = await fetchAnimes(totalToFetch);

    while (data.length < 5) {
        const selectedAnime = allAnimes[Math.floor(Math.random() * allAnimes.length)];
        const id = selectedAnime.id;
        // gets an random anime
        const animeResponse = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
        const charactersResponse = await fetch(`https://kitsu.io/api/edge/anime/${id}/relationships/characters`);

        if (!animeResponse.ok || !charactersResponse.ok) {
            continue;
        }

        const animeData = await animeResponse.json();
        const charactersData = await charactersResponse.json();

        const anime = animeData?.data?.attributes;
        const characters: any[] = charactersData?.data;

        if (!anime || !characters) {
            continue;
        }

        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
        const characterID = randomCharacter?.id;

        const res = await fetch(`https://kitsu.io/api/edge/media-characters/${characterID}/character`);
        const json = await res.json();
        const character = json?.data?.attributes;

        if (!character || !character.image || !character.image.original || !anime.canonicalTitle || !anime.posterImage || !anime.posterImage.original) {
            continue;
        }

        if (dataAnime.find((anime) => anime.id === id)) {
            continue;
        }

        data.push({
            id: characterID,
            name: character.canonicalName,
            image: character.image?.original,

            anime: {
                id,
                name: anime.canonicalTitle,
                image: anime.posterImage?.original
            },
        });

        dataAnime.push(selectedAnime);
    }

    return { characters: randomize(data), animes: randomize(dataAnime) };
}
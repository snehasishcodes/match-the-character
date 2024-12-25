"use client";

import AnimeCard from "@/components/AnimeCard";
import CharacterCard from "@/components/CharacterCard";
import fetchCharacters, { Anime, Character } from "@/lib/fetchCharacters";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [isCorrect, setIsCorrect] = useState(false);
	const [characters, setCharacters] = useState<Character[]>([]);
	const [animes, setAnimes] = useState<Anime[]>([]);
	const [character, setCharacter] = useState<Character | undefined>();

	useEffect(() => {
		start();
	}, []);

	async function start() {
		if (isCorrect === true) return;
		const data = await fetchCharacters("difficult");
		setCharacters(data.characters);
		setAnimes(data.animes);
		setCharacter(data.characters[Math.floor(Math.random() * data.characters.length)]);
		setIsCorrect(false);
		setLoading(false);
	}

	const animeCardOnClick = (id: string) => {
		if (character?.anime.id === id) {
			callConfetti();
			start();
			setIsCorrect(true);
			setLoading(true);
		} else {
			setIsCorrect(false);
		}
	}

	const callConfetti = () => {
		if (isCorrect === true) return;

		const scalar = 2;
		const triangle = confetti.shapeFromPath({
			path: "M0 10 L5 0 L10 10z",
		});
		const square = confetti.shapeFromPath({
			path: "M0 0 L10 0 L10 10 L0 10 Z",
		});
		const coin = confetti.shapeFromPath({
			path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
		});
		const tree = confetti.shapeFromPath({
			path: "M5 0 L10 10 L0 10 Z",
		});

		const defaults = {
			spread: 360,
			ticks: 60,
			gravity: 0,
			decay: 0.96,
			startVelocity: 20,
			shapes: [triangle, square, coin, tree],
			scalar,
		};

		const shoot = () => {
			confetti({
				...defaults,
				particleCount: 30,
			});

			confetti({
				...defaults,
				particleCount: 5,
			});

			confetti({
				...defaults,
				particleCount: 15,
				scalar: scalar / 2,
				shapes: ["circle"],
			});
		};

		setTimeout(shoot, 0);
		setTimeout(shoot, 100);
		setTimeout(shoot, 200);
		setTimeout(shoot, 300);
		setTimeout(shoot, 500);
		setTimeout(shoot, 800);
		setTimeout(shoot, 1000);
	};

	return (
		<main
			className={cn(
				"min-h-[150vh] h-[200vh] md:h-screen md:min-h-screen max-h-[200vh] md:max-h-screen md:overflow-hidden",
				"w-full",
				"bg-[url('/bg/1.svg')] bg-center bg-cover bg-no-repeat",
				"flex flex-col justif-start md:justify-center items-center gap-4",
			)}
		>
			<div className="flex flex-col md:flex-row justify-between items-center gap-8 max-h-[190vh] md:max-h-[80vh] max-w-[80vw] h-full md:h-full w-full">
				<div className="bg-black/75 h-full w-full flex flex-row justify-between items-center gap-5 rounded-[2rem] p-6">
					<CharacterCard
						id={character?.id}
						name={character?.name}
						image={character?.image}
						loading={loading}
					/>
				</div>

				<div className={cn("bg-black/75 h-full w-full flex flex-col justify-between items-center gap-5 rounded-[2rem] p-6", loading === true ? "brightness-50" : null)}>
					{
						animes.map((anime, i) => (
							<AnimeCard
								key={i}
								name={anime.name}
								loading={loading}
								onClick={() => animeCardOnClick(anime.id)}
								isCorrect={character?.anime.id === anime.id}
							/>
						))
					}
				</div>
			</div>
		</main>
	);
}

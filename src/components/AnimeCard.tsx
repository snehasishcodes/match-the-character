"use client";

import { cn } from "@/lib/utils";

export default function AnimeCard({ name, loading = true, isCorrect, onClick, }: { name: string, loading: boolean, isCorrect?: boolean, onClick: () => void }) {
    return (
        <div className={cn("h-full w-full relative flex flex-row justify-center items-center gap-0 border-2 border-dashed border-white/25 rounded-[1.5rem] cursor-pointer bg-white/15 p-4 text-center text-white", loading === true ? "cursor-wait" : null, isCorrect === true ? "focus:border-green-400" : "focus:border-red-400")} onClick={onClick}>
            <h2 className="text-lg line-clamp-2">{name}</h2>
        </div>
    )
}
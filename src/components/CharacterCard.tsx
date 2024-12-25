import Image from "next/image";
import Loader from "./ui/loader";
import { cn } from "@/lib/utils";

export default function CharacterCard({ id, name, image, loading = true }: { id?: string, name?: string, image?: string, loading: boolean }) {
    return (
        <div className="h-full relative w-full flex flex-row justify-center items-center gap-0 border-2 border-dashed border-white/25 rounded-[1.5rem] cursor-pointer bg-white/15 select-none min-h-[60vh]">
            <Image
                src={image ?? "/bg/1.svg"}
                alt={name ?? "Character Image"}
                fill
                className={cn("w-full h-auto rounded-[1.5rem] object-cover", loading === true ? "brightness-50" : null)}
                loading="lazy"
            />

            {
                loading === true ?
                    <Loader /> : null
            }
        </div>
    )
}
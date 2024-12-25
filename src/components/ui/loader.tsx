import { cn } from "@/lib/utils";
import styles from "@/styles/loader.module.css";

export default function Loader({ className }: { className?: string }) {
    return (
        <span className={cn(styles.loader, className)}></span>
    )
}
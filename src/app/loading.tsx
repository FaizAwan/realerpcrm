import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="w-full flex-grow flex items-center justify-center p-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    );
}

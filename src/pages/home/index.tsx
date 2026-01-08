import { useEffect, useRef, useState } from "react";
import { Trash } from "lucide-react";
import Logo from "@/components/Logo";

const INPUT_COUNT = 12;
const ROWS = 8;
const STORAGE_KEY = "textor:textareas";

function normalizeText(value: string) {
    return value.replace(/\r?\n+/g, " ");
}

function getInitialValues(): string[] {
    if (typeof window === "undefined") {
        return Array(INPUT_COUNT).fill("");
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return Array(INPUT_COUNT).fill("");

        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return Array(INPUT_COUNT).fill("");

        const normalized = parsed.slice(0, INPUT_COUNT);
        while (normalized.length < INPUT_COUNT) normalized.push("");

        return normalized;
    } catch {
        return Array(INPUT_COUNT).fill("");
    }
}

export default function TextNormalizerGrid() {
    const [values, setValues] = useState<string[]>(getInitialValues);

    const containerRef = useRef<HTMLDivElement>(null);
    const leftRefs = useRef<HTMLTextAreaElement[]>([]);
    const rightRefs = useRef<HTMLTextAreaElement[]>([]);

    /* ================================
       PERSIST
    ================================= */
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    }, [values]);

    function handleChange(index: number, value: string) {
        setValues((prev) => {
            const next = [...prev];
            next[index] = value ?? "";
            return next;
        });
    }

    function clearAll() {
        localStorage.removeItem(STORAGE_KEY);
        setValues(Array(INPUT_COUNT).fill(""));
    }

    /* ================================
       SYNC SCROLL
    ================================= */
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const textareas = container.querySelectorAll("textarea");

        const syncScroll = (e: Event) => {
            const source = e.target as HTMLTextAreaElement;
            const row = source.closest("[data-row]");
            if (!row) return;

            const pair = row.querySelectorAll("textarea");
            pair.forEach((ta) => {
                if (ta !== source) {
                    ta.scrollTop = source.scrollTop;
                }
            });
        };

        textareas.forEach((ta) =>
            ta.addEventListener("scroll", syncScroll)
        );

        return () => {
            textareas.forEach((ta) =>
                ta.removeEventListener("scroll", syncScroll)
            );
        };
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-0">
            {/* AÇÕES */}
            <div className="w-full h-[7vh] px-2 flex justify-between items-center gap-4 shadow-md border-b-gray-600">
                <Logo />
                <button
                    onClick={clearAll}
                    className="
                        p-2
                        text-red-500
                        rounded-md
                        transition-colors
                        hover:bg-red-500
                        hover:text-white
                    "
                    aria-label="Limpar tudo"
                >
                    <Trash />
                </button>
            </div>

            {/* LINHAS */}
            <div
                ref={containerRef}
                className="w-full h-full flex flex-col gap-8 overflow-y-auto pt-8 px-4"
            >
                {Array.from({ length: INPUT_COUNT }).map((_, index) => (
                    <div
                        key={index}
                        data-row
                        className="w-full flex gap-0 items-stretch"
                    >
                        {/* ESQUERDA */}
                        <textarea
                            ref={(el) => {
                                if (el) leftRefs.current[index] = el;
                            }}
                            rows={ROWS}
                            value={values[index]}
                            onChange={(e) =>
                                handleChange(index, e.target.value)
                            }
                            className="
                                w-1/2
                                resize-y
                                p-3
                                border-gray-300
                                border
                                rounded-md
                            "
                        />

                        {/* DIREITA */}
                        <textarea
                            ref={(el) => {
                                if (el) rightRefs.current[index] = el;
                            }}
                            rows={ROWS}
                            value={normalizeText(values[index])}
                            readOnly
                            className="
                                w-1/2
                                resize-none
                                p-3
                                border-gray-300
                                border
                                rounded-md
                                bg-gray-50
                            "
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

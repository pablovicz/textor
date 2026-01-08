import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import "./index.css";

interface Props {
    content: string;
    title?: string;
    description?: string;
}

export default function MarkdownRenderer({ title, description, content }: Props) {
    useEffect(() => {
        if (title || description) {
            setTimeout(() => {
                const parentElement = document.querySelector(".markdown-content");
                if (parentElement) {
                    const firstH1 = parentElement.querySelector("h1");
                    if (!!title && firstH1 && firstH1.textContent?.trim() === title.trim()) {
                        firstH1.style.display = "none";
                    }
                    const firstPElement = parentElement.querySelector("p");
                    if (!!description && firstPElement && firstPElement.textContent?.trim() === description.trim()) {
                        firstPElement.style.display = "none";
                    }

                }
            }, 0); // Garante que o DOM já foi atualizado
        }
    }, [title, content]);

    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
            >
                {content
                    .split("\n")
                    .map((part) => {
                        if (part.includes("youtube")) {
                            const v = part.trim();
                            let id = null;

                            if (v.includes("?v=")) {
                                id = v.split("?v=")[1];
                            } else {
                                const splitted = v.split("/");
                                id = splitted[splitted.length - 1];
                            }

                            return `[![](https://markdown-videos-api.jorgenkh.no/youtube/${id})](https://youtu.be/${id})`;
                        }

                        if (/^\d+\.\s/.test(part)) {
                            const [index, title] = part.split(". ");
                            return `**${index}**. ${title}`;
                        }

                        return part;
                    })
                    .join("\n")
                    .replace(/\n/gi, "\n")}
            </ReactMarkdown>
        </div>
    );
}

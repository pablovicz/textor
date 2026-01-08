import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";


import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";
import { theme } from "@/theme/cte";




interface Props {
    children?: ReactNode;
    mainProps?: {
        gap: string;
    }
    ol?: { title?: string; path?: string; }[] | null;
    headless?: boolean;
}

export function Template({
    children,
    mainProps = {
        gap: '4'
    },
    ol = null,
    headless = false
}: Props) {

  


    if (headless) {

        return (
            <div className="w-[100vw] min-h-full flex flex-col justify-between items-center border-none p-0 overflow-x-hidden">
                <Header />
                <div className="w-[100vw] h-[calc(100vh-6rem)] flex flex-row align-start justify-between">
                    <main className={`w-[100%] flex-1 flex flex-col align-start justify-start gap-${mainProps.gap} px-8 pt-8 pb-12`}>
                        {children}
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[100vw] min-h-full flex flex-col justify-between items-center border-none p-0 overflow-x-hidden">
            <Header />
            <div className="w-[100vw] h-[calc(100vh-6rem)] flex flex-row align-start justify-between">
                {/* <Sidebar /> */}
                <div className="w-[100vw] min-w-[calc(100vw-250px)] h-[calc(100vh-6rem)] bg-stone-50 flex flex-col align-start justify-between overflow-y-auto">
                    {!!ol && ol.length > 0 && (
                        <ol id='exclude' className="w-full px-4 py-2 flex flex-row items-end justify-start gap-2">
                            {ol.map((item, index) => (
                                <React.Fragment key={nanoid()}>
                                    <li style={{ color: theme?.colors?.primary ?? undefined }} >
                                        {item.path ? (
                                            <Link to={item.path}>
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <span>
                                                {item.title}
                                            </span>
                                        )}
                                    </li>
                                    {index !== ol.length - 1 && (
                                        <div className="w-[2rem] pb-[2px]">
                                            <ChevronRight color={theme?.colors?.primary} size={16} />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}

                        </ol>
                    )}
                    <main className={`w-[100%] flex-1 flex flex-col align-start justify-start gap-${mainProps.gap} px-8 pt-8 pb-12`}>
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
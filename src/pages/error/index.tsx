import LottieLoader from "@/components/Lootie";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";


interface Props {
    title: string | string[];
    asset: string;
    width?: number;
}


export default function Error({
    title,
    asset,
    width
}: Props) {

    const { pathname } = useLocation();

    const [redirect, setRedirect] = useState<string | null>(null);

    useEffect(() => {

        const splitted = pathname.split('/')

        if (splitted[0].length > 0 && splitted[0] !== 'error'  && splitted[0] !== 'c') {
            setRedirect(splitted[0])
        }

    }, [])

    return (
        <div
            className="w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-8 p-4"
        >
            <LottieLoader
                asset={asset}
                lottieProps={{
                    width: width ?? Math.floor(Number(window.innerWidth) / 1.5)
                }}
            >
                {title}
            </LottieLoader>
            {!!redirect && (
                <Link to={`/${redirect}`}>
                    voltar
                </Link>
            )}
        </div>
    )
}
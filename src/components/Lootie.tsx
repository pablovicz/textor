/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import Lottie from "react-lottie-player";
import { nanoid } from "nanoid";


export type LottieLoaderProps = {
    children?: ReactNode;
    lottieProps?: {
        width?: any;
        height?: any;
        speed?: number;
        loop?: boolean;
        progress?: number;
    }
    renderIf?: boolean;
} & SourceProp

type SourceProp = {
    source: object;
    asset?: never;
} | {
    source?: never;
    asset: string;
}



export default function LottieLoader({
    children,
    source,
    asset,
    lottieProps,
    renderIf = true
}: LottieLoaderProps) {

    async function fetchAsset(): Promise<object | null> {

        if (asset) {
            return await axios.get(`${import.meta.env.VITE_API_ASSET_URL}/animation/${asset}.json`)
                .then(response => {
                    return response.data;
                })
                .catch(() => {

                    return null;
                });
        }

        return source as object;
    }

    const { data, isSuccess } = useQuery({
        queryKey: [`animation-${asset}`],
        queryFn: () => fetchAsset(),
        refetchInterval: 1000 * 60 * 60 * 24 * 6.9,
    });




    if (!renderIf) {

        return (<></>);
    }

    return (
        <div className='w-full h-full min-w-[200px] min-h-[300px] flex flex-col items-center justify-center p-4'>
            {isSuccess && (
                <Lottie
                    loop={lottieProps?.loop ?? true}
                    animationData={data ?? undefined}
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                    play
                    speed={lottieProps?.speed ?? 1}
                    style={{
                        width: lottieProps?.width ?? 200,
                        height: lottieProps?.height ?? undefined
                    }}

                />
            )}
            <span className='w-full text-center font-semibold max-w-[400px] text-stone-700'>
                {Array.isArray(children) ? (
                    children.map(item =>
                        <React.Fragment
                            key={nanoid()}
                        >
                            {item}<br />
                        </React.Fragment>
                    )) : (
                    <>{children}</>
                )}
            </span>
        </div >
    );
}
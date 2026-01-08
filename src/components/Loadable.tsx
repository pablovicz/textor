import { ReactNode } from "react";
import LottieLoader from "./Lootie";



interface Props {
    isLoading?: boolean;
    isError?: boolean;
    loading?: ReactNode;
    error: ReactNode;
    asset?: string;
    children: ReactNode;
}


export default function Loadable({
    isLoading = false,
    isError = false,
    loading,
    error,
    asset = 'default-loader',
    children
}: Props) {


    if (isLoading && !isError) {

        return (
            <LottieLoader
                asset={asset}
            >
                {loading}
            </LottieLoader>
        );
    }

    if (isError && !isLoading) {


        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                {error}
            </div>
        );
    }

    return (
        <>{children}</>
    )
}
import LottieLoader from "@/components/Lootie";



export function DefaultPageLoader() {


    return (
        <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-stone-50">
            <LottieLoader asset="loading">
                Carregando...
            </LottieLoader>
        </div>
    )
}
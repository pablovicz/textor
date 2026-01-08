import { theme } from "@/theme/cte";



export default function Footer() {


    return (
        <footer className="w-full h-[2rem] flex flex-row items-center justify-center gap-4 px-4" style={{ color: theme.colors.primary }}>
            <div className="w-full flex flex-row items-center justify-between border-t-1 border-gray-200 pt-6 pb-2">
                <span className="w-full text-left font-medium">
                    © Textor • {new Date().getFullYear()}
                </span>
                <span className="w-full text-right font-medium">
                    Todos os direitos reservados
                </span>
            </div>
        </footer>
    );
}
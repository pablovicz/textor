import { ReactNode } from "react";


import Error from "@/pages/error";
import { DefaultPageLoader } from "@/pages/_skeleton";
import HomePage from "@/pages/home";


interface IRoute {
    element: ReactNode;
    skeleton?: ReactNode;
    path: string;
}

export const PUBLIC_ROUTES: IRoute[] = [
    {
        path: '/',
        element: <HomePage />,
        skeleton: <DefaultPageLoader />
    },
]


export const ERROR_ROUTES: IRoute[] = [
    {
        path: '/error/404',
        element: <Error
            asset="404"
            title="Página inexistente"
        />
    },
    {
        path: '/error/503',
        element: <Error
            asset="503"
            title="Página temporariamente indisponível"
            width={300}
        />
    },
    {
        path: '/error/401',
        element: <Error
            asset="503"
            title={['não autorizado']}
            width={300}
        />
    }
];
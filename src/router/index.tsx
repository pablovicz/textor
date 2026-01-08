import { Navigate, Routes as ReactRouterRoutes, Route } from "react-router-dom";
import { ERROR_ROUTES } from "./routes";
import HomePage from "@/pages/home";



export default function Router() {


    return (
        <ReactRouterRoutes>
            <Route
                path='/'
                element={<HomePage />}
            />
            <Route
                path='*'
                element={<Navigate to='/' />}
            />


            {ERROR_ROUTES.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            ))}
        </ReactRouterRoutes>
    );
}
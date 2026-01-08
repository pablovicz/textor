import { Navigate } from "react-router";



export default function Redirect() {


    const faq = localStorage.getItem('faq') ?? null


    if (faq) {

        return <Navigate to={`/${faq}/error/404`} />
    }

    return <Navigate to='/error/404' />
}
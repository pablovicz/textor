/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from "@/theme/cte";
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";



function NavButton({
    title,
    path,
    icon = null,
    fontWeight = 'normal',
    _active = {
        fontWeight: 'bold'
    },
    _hover = {
        fontWeight: 'medium'
    },
    fontSize = 'md'
}: {
    title: string;
    path: string;
    icon?: ReactNode | null;
    fontWeight?: 'bold' | 'medium' | 'normal';
    fontSize?: 'xs' | 'sm' | 'md' | 'lg';
    _active?: {
        fontWeight?: 'bold' | 'medium' | 'normal';
    },
    _hover?: {
        fontWeight?: 'bold' | 'medium' | 'normal';
    }
}) {

    const params = useParams();

    const { pathname } = useLocation();


    const getPathname = () => {
        let path = pathname;
        for (const param of Object.entries(params ?? {})) {
            if (param) {
                path = path.replace(param[1] ?? '', `:${param[0]}`)
            }
        }
        if (path.endsWith('/')) {
            path = path.slice(0, path.length - 1)
        }
        return path;
    }

    const currentPath = getPathname();

    const [isHovered, setIsHovered] = useState(false);

    const size = {
        'xs': '0.75rem',
        'sm': '1rem',
        'md': '1.15rem',
        'lg': '1.25rem'
    }


    const isActive = currentPath === path || path === pathname;

    useEffect(() => {
        setIsHovered(false);
    }, [pathname])

    return (
        <Link
            className={`w-full min-h-10 pl-4 flex flex-row align-center justify-end rounded-bl-lg rounded-tl-lg`}
            onMouseEnter={isActive ? undefined : () => setIsHovered(true)}
            onMouseLeave={isActive ? undefined : () => setIsHovered(false)}
            to={path}
        >
            <div
                className={`w-full flex flex-row items-center justify-between gap-2 cursor-pointer text-[${size[fontSize]}]`}
                style={{
                    color: isActive || isHovered ? theme.colors.secondary : theme.colors.primary
                }}
            >
                {!!icon && (
                    <div className="w-[2rem] h-full flex flex-col items-center justify-center ">
                        {icon}
                    </div>
                )}
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <span
                        className={`w-full text-left no-underline ${isHovered ? `font-${_hover.fontWeight}` : isActive ? `font-${_active.fontWeight}` : `font-${fontWeight} hover:font-${_hover.fontWeight}`}`}
                        style={{
                            fontSize: size[fontSize]
                        }}
                    >
                        {title}
                    </span>
                </div>
                <div className="w-[4px] h-full flex flex-row justify-end">
                    <div
                        className="w-[4px] h-full"
                        style={{
                            background: isActive || isHovered ? theme.colors.secondary : 'transparent',
                            borderRadius: '2px'
                        }}
                    />
                </div>
            </div>
        </Link>
    );
}


export default function Sidebar() {

    const { faq } = useParams();

    const options: {
        title: string;
        uuid: string;
        icon: string;
        pages: {
            uuid: string;
            title: string;
            slug: string;
        }[]
    }[] = [];

    return (
        <nav className="w-[25vw] max-w-[250px] h-[calc(100vh-6rem)] flex flex-col items-center justify-flex-start gap-12 pt-4 pl-4 pb-8 bg-stone-100 border-r-1 border-stone-200">
            {/* <NavButton
                path={`/${faq}`}
                title="Início"
                _active={{
                    fontWeight: 'bold'
                }}
                _hover={{
                    fontWeight: 'bold'
                }}
                fontWeight="medium"
            /> */}
            <div className="w-full h-[calc(100vh-8rem)] flex flex-col items-center justify-flex-start gap-12 overflow-x-hidden overflow-y-auto">
                {options.map(section => (
                    <div
                        key={section.uuid}
                        className={`w-full flex flex-col items-center justify-start gap-4 pl-4`}
                        style={{
                            color: theme.colors.primary
                        }}
                    >
                        <div className="w-full h-[2rem] flex flex-row items-center justify-start gap-4">
                            {!!section.icon && (
                                <div className="w-[1.5rem] h-full flex flex-col items-center justify-center">
                                    <img
                                        src={section.icon}
                                        alt='icon'
                                        style={{
                                            width: '1.15rem',
                                        }}
                                    />
                                </div>
                            )}
                            <span className='w-full h-full align-text-center text-left text-sm font-bold'>
                                {section.title}
                            </span>
                        </div>
                        <div className="w-full flex flex-col items-center justify-start gap-4">
                            {section.pages.map(page => (
                                <NavButton
                                    key={page.uuid}
                                    path={`/${faq}/article/${page.slug}`}
                                    title={page.title}
                                    _active={{
                                        fontWeight: 'medium'
                                    }}
                                    _hover={{
                                        fontWeight: 'medium'
                                    }}
                                    fontWeight="normal"
                                    fontSize="xs"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    );
}
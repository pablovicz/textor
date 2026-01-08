import Logo from "./Logo";



export default function Header() {


    return (
        <header className='w-[100vw] h-[6rem] px-8 py-4 flex flex-col items-center justify-center shadow-md border-b-gray-600'>
            <div className='w-full flex flex-row items-center justify-between gap-8'>
                <Logo />
                {/* <div className='w-full flex flex-row items-center justify-end gap-8'>
                    <span style={{ color: theme.colors.secondary }}>
                        Textor
                    </span>
                </div> */}
            </div>
        </header>
    );
}
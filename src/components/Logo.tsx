
import IMAGE from '@/assets/logo.png'


export default function Logo() {


    return (
        <div className='cursor-pointer -ml-2' onClick={() => window.location.href = '/'}>
            <img
                src={IMAGE}
                width={200}
                height={50}
                className='border-none p-0'
                alt='Logo'
            />
        </div>
    );
}
import './header.scss';

interface HeaderProps {
    title: string;
}

const Header = (props: HeaderProps) => {

    const { title } = props;

    return (
        <div className='container mx-auto mb-20'>
            <h1 className='text-7xl font-bold'>{title}</h1>
        </div>
    )
}

export default Header;
export { Header };
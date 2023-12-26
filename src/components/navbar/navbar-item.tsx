import Link from "next/link";

interface NavbarItemProps {
    href: string;
    label: string;
}

const NavbarItem = (props: NavbarItemProps) => {
    const { href, label } = props;

    return (
        <li>
            <Link href={href}>{label}</Link>
        </li>
    )
}

export default NavbarItem;
export { NavbarItem }
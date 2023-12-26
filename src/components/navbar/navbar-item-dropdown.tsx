import NavbarItem from "./navbar-item";

interface NavbarItemDropdownProps {
    label: string;
    submenuItems: {
        label: string;
        href: string;
    }[];
    isMobile?: boolean;
}

const NavbarItemDropdown = (props: NavbarItemDropdownProps) => {
    const { label, submenuItems, isMobile } = props;

    const submenuItemsElements = submenuItems.map((item, index) => <NavbarItem key={index} href={item.href} label={item.label} />);

    if (isMobile) return (
        <li>
            <details>
                <summary>{label}</summary>
                <ul className="p-2">
                    {submenuItemsElements}
                </ul>
            </details>
        </li>
    )

    return (
        <li>
            <a>{label}</a>
            <ul className='p-2'>
                {submenuItemsElements}
            </ul>
        </li>
    )
}

export default NavbarItemDropdown;
export { NavbarItemDropdown };
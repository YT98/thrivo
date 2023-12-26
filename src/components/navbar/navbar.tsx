import Link from "next/link"
import NavbarItem from "./navbar-item"
import NavbarItemDropdown from "./navbar-item-dropdown"

const menuConfig = [
    {
        "label": "Home",
        "href": "/"
    },
    {
        "label": "Dashboard",
        "href": "/dashboard",
        "submenu": [
            {
                "label": "Testing submenu",
                "href": "test"
            }
        ]
    },
    {
        "label": "Settings",
        "href": "/settings"
    }
]

const Navbar = () => {

    const navbarItems = menuConfig.map((item, index) => {
        if (item.submenu) {
            return <NavbarItemDropdown key={index} label={item.label} submenuItems={item.submenu} />

        }
        return <NavbarItem key={index} href={item.href} label={item.label} />
    });

    const navbarItemsMobile = menuConfig.map((item, index) => {
        if (item.submenu) {
            return <NavbarItemDropdown isMobile key={index} label={item.label} submenuItems={item.submenu} />

        }
        return <NavbarItem key={index} href={item.href} label={item.label} />
    });

return (
    <div className='navbar bg-base-100 border-b-2'>

      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            {navbarItems}
          </ul>
        </div>
        <a className='btn btn-ghost text-xl'>daisyUI</a>
      </div>

      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          {navbarItemsMobile}
        </ul>
      </div>

      <div className='navbar-end'>
        <a className='btn'>End Button</a>
      </div>

    </div>
  )
}

export default Navbar
export { Navbar }

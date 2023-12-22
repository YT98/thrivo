import Link from "next/link";

const Navbar = () => {
    return (
        <div>
            <h1>Navbar</h1>
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/settings">Settings</Link>
        </div>
    )
}

export default Navbar;
export { Navbar }
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";

export default function NavbarComponent() {
    return (
        <Navbar color="dark" light={false} dark={true} fixed="top" expand="md" className="mb-4">
            <NavbarBrand href="/">Product Listing</NavbarBrand>
            <Nav className="ms-auto" navbar>
                <NavItem>
                    <NavLink href="/" active>Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/cart">Cart</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}
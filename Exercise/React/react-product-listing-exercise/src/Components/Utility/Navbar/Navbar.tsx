import {Nav, Navbar, NavbarBrand, NavItem, } from "reactstrap";
import {NavLink} from "react-router-dom";

export default function NavbarComponent() {
    return (
        <Navbar color="dark" light={false} dark={true} fixed="top" expand="md" className="mb-4">
            <NavbarBrand href="/">Product Listing</NavbarBrand>
            <Nav className="ms-auto" navbar>
                <NavItem>
                    {/*<NavLink href="/" active>Home</NavLink>*/}
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </NavItem>
                <NavItem>
                    {/*<NavLink href="/cart">Cart</NavLink>*/}
                    <NavLink to="/cart" className="nav-link">Cart</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}
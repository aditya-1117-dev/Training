import {Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import {NavLink} from "react-router-dom";
import DropdownComponent from "../Dropdown/Dropdown.tsx";
import {useContext} from "react";
import { UserContext } from "../../../App.tsx";

export default function NavbarComponent({users}) {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const usernames = users?.data?.users.map(user => user.username)

    return (
        <Navbar color="dark" light={false} dark={true} fixed="top" expand="md" className="mb-4">
            <NavbarBrand href="/">Product Listing</NavbarBrand>
            <Nav className="ms-auto" navbar>
                <NavItem>
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/cart" className="nav-link">{currentUser!=="" && currentUser+`'s`}  Cart</NavLink>
                </NavItem>

                <DropdownComponent
                    baseValue="Select the User"
                    list={usernames}
                    selectedItem={currentUser}
                    setSelectedItem={setCurrentUser} />
            </Nav>
        </Navbar>
    )
}
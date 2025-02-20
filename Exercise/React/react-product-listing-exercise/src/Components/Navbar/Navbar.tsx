import { Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import { UserContext } from "../../App.tsx";
import DropdownItems from "../DropdownItems.tsx";
import LogOut from "../../Utility/LogOut.tsx";

export default function NavbarComponent({users} : any) {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const usernames = users?.data?.users.map((user : any) => user.username)
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    const navLinks : {role : string[], component : (key : any)=> JSX.Element}[] = [
        {
            role : ['admin', 'user'],
            component : (key : any) => (
                <NavItem key={key}>
                    <NavLink to="/cart" className="nav-link">{currentUser!=="" && currentUser+`'s`}  Cart</NavLink>
                </NavItem>
            ),
        },
        {
            role : ['admin', 'moderator'],
            component : (key : any) => (
                <NavItem key={key}>
                    <NavLink to="/add-product" className="nav-link"> Add New Product </NavLink>
                </NavItem>
            )
        },
        {
            role : ['admin'],
            component : (key : any) => (
                <DropdownItems key={key}
                            baseValue="Select the User"
                            list={usernames}
                            selectedItem={currentUser}
                            setSelectedItem={setCurrentUser} />
            )
        }
    ]
    return (
        <Navbar color="dark" light={false} dark={true} fixed="top" expand="md" className="mb-4">
            <NavbarBrand href="/">Product Listing</NavbarBrand>
            {token && role &&
                <Nav className="ms-auto" navbar>
                    <NavItem key={'products'}>
                        <NavLink to={role} className="nav-link"> Products </NavLink>
                    </NavItem>
                    {navLinks.map((navLink : {role : string[], component : (key : any)=> JSX.Element}, index : any) => {
                        if (navLink.role.includes(role)) {
                            return navLink.component(index);
                        }
                    })}
                    <NavItem key={"logout"}>
                        <LogOut />
                    </NavItem>
                </Nav>
            }
        </Navbar>
    )
}
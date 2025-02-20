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
    return (
        <Navbar color="dark" light={false} dark={true} fixed="top" expand="md" className="mb-4">
            <NavbarBrand href="/">Product Listing</NavbarBrand>
            {token && role &&
                <Nav className="ms-auto" navbar>
                    {(role==='user' || 'admin') &&
                        <NavItem>
                            <NavLink to="/cart" className="nav-link">{currentUser!=="" && currentUser+`'s`}  Cart</NavLink>
                        </NavItem>
                    }
                    {(role==='admin' || role ==='moderator') &&
                        <NavItem>
                            <NavLink to="/add-product" className="nav-link"> Add New Product </NavLink>
                        </NavItem>
                    }
                    {(role==='admin') &&
                        <DropdownItems
                            baseValue="Select the User"
                            list={usernames}
                            selectedItem={currentUser}
                            setSelectedItem={setCurrentUser} />
                    }
                    <NavItem>
                        <LogOut />
                    </NavItem>
                </Nav>
            }
        </Navbar>
    )
}
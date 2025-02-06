import {Col, Nav, Navbar, NavbarBrand, NavItem, Row} from "reactstrap";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import { UserContext } from "../../../App.tsx";
import DropdownItems from "../Dropdown/DropdownItems.tsx";

export default function NavbarComponent({users, cartLength}) {
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
                    <Row>
                        <Col>
                            {cartLength > 0 && (
                                <p style={{ color: "white", padding: 0, margin: 0}}>{cartLength}</p>
                            )}
                        </Col>
                        <NavLink to="/cart" className="nav-link">
                            {currentUser !== "" ? `${currentUser}'s Cart` : 'Cart'}
                        </NavLink>
                    </Row>
                </NavItem>

                <DropdownItems
                    baseValue="Select the User"
                    list={usernames}
                    selectedItem={currentUser}
                    setSelectedItem={setCurrentUser} />
            </Nav>
        </Navbar>
    )
}
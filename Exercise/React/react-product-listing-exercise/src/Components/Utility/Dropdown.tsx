import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import ListCategories from "./ListCategories.tsx";
import {Dispatch, FC, SetStateAction, useState} from "react";

const DropdownComponent : FC<{list: string[] | object | null, setter : Dispatch<SetStateAction<string>>}>  = ({list, setter} ) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <Dropdown direction="down" isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>Select the category</DropdownToggle>
            <DropdownMenu>
                <DropdownItem  value="all" onClick={(e) =>setter(e.target.value)}> Select Categories</DropdownItem>
                <ListCategories setCategory={setter} categories={list}/>
            </DropdownMenu>
        </Dropdown>
    )
}
export default DropdownComponent;
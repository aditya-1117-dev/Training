import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import ListCategories from "../ProductListing/ListCategories.tsx";
import {FC, useState, MouseEvent, Dispatch, SetStateAction} from "react";

const DropdownComponent : FC<{list: string[] | object | null, selectedItem : string, setSelectedItem : Dispatch<SetStateAction<string>>}>  = ({ list, selectedItem, setSelectedItem } ) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <Dropdown direction="down" isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret> {selectedItem===""? "Select the Category": selectedItem} </DropdownToggle>
            <DropdownMenu>
                <DropdownItem  value="" onClick={(e: MouseEvent) => setSelectedItem( (e.target as HTMLButtonElement).value )} > Select Categories</DropdownItem>
                <ListCategories handleSelect={(e: MouseEvent) => setSelectedItem( (e.target as HTMLButtonElement).value )} categories={list}/>
            </DropdownMenu>
        </Dropdown>
    )
}
export default DropdownComponent;
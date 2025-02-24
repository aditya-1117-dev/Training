import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import ListCategories from "../ProductListing/ListCategories.tsx";
import {FC, useState, MouseEvent, Dispatch, SetStateAction} from "react";

const DropdownItems : FC<{list: string[] | object | null, selectedItem : string | number, setSelectedItem : Dispatch<SetStateAction<string | number>> , baseValue : string}>  = ({ list, selectedItem, setSelectedItem, baseValue } ) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    return (
        <Dropdown direction="down" isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret> {selectedItem===""? baseValue : selectedItem} </DropdownToggle>
            <DropdownMenu style={{ maxHeight : "280px",overflowY : "scroll" }}>
                <DropdownItem value="" onClick={(e: MouseEvent<HTMLElement>) => setSelectedItem( (e.target as HTMLInputElement).value )} > {baseValue} </DropdownItem>
                <ListCategories handleSelect={(e: MouseEvent<HTMLElement>) => setSelectedItem( (e.target as HTMLInputElement).value )} categories={list}/>
            </DropdownMenu>
        </Dropdown>
    )
}
export default DropdownItems;
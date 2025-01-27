import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import ListCategories from "../ProductListing/ListCategories.tsx";
import {Dispatch, FC, SetStateAction, useState, MouseEvent} from "react";

const DropdownComponent : FC<{list: string[] | object | null, setter : Dispatch<SetStateAction<string>>}>  = ({list, setter} ) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const [selectedCategory, setSelectedCategory] = useState("Select the Category");

    const handleCategorySelect = (e: MouseEvent) => {
        const value = (e.target as HTMLButtonElement).value;
        setSelectedCategory(value==="all"? "Select the Category": value);
        setter(value);
    };

    return (
        <Dropdown direction="down" isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret> {selectedCategory} </DropdownToggle>
            <DropdownMenu>
                <DropdownItem  value="all" onClick={handleCategorySelect} > Select Categories</DropdownItem>
                <ListCategories handleSelect={handleCategorySelect} categories={list}/>
            </DropdownMenu>
        </Dropdown>
    )
}
export default DropdownComponent;
import {DropdownItem} from "reactstrap";
import {MouseEvent} from "react";

export default function ListCategories({categories, handleSelect} : {categories: string[] | object | null, handleSelect : (e : MouseEvent<HTMLElement>) => void }) {
    return (
        <>
            {categories && Array.isArray(categories) && categories.map((category : string, index : number) => (
                <DropdownItem key={index} value={category} onClick={handleSelect}>{category}</DropdownItem>
            ))}
        </>
    )
}
import {DropdownItem} from "reactstrap";
import { Dispatch, SetStateAction} from "react";

export default function ListCategories({categories, setCategory} : {categories: string[] | object | null, setCategory : Dispatch<SetStateAction<string>>}) {
    return (
        <>
            {categories && categories.map((category, index) => (
                <DropdownItem key={index} value={category} onClick={(e) => setCategory(e.target.value)}>{category}</DropdownItem>
            ))}
        </>
    )
}
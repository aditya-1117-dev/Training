import {DropdownItem} from "reactstrap";
import { Dispatch, SetStateAction, MouseEvent} from "react";

export default function ListCategories({categories, setCategory} : {categories: string[] | object | null, setCategory : Dispatch<SetStateAction<string>>}) {
    return (
        <>
            {categories && Array.isArray(categories) && categories.map((category : string, index : number) => (
                <DropdownItem key={index} value={category} onClick={(e: MouseEvent) => setCategory((e.target as HTMLButtonElement).value)}>{category}</DropdownItem>
            ))}
        </>
    )
}
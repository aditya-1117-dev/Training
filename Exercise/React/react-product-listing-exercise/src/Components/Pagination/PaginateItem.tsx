import {PaginationItem, PaginationLink} from "reactstrap";
import {MouseEventHandler} from "react";

export default function PaginateItem({value, onClick, disabled=false, active=false, linkProp = ""}
                                         : {value? : string | number, onClick : MouseEventHandler, disabled? : boolean, active? : boolean, linkProp? : "" | "first" | "previous" | "next" | "last" }) {
    let paginationLink = null;
    switch (linkProp) {
        case "first":
            paginationLink = <PaginationLink first onClick={onClick} />;
            break;
        case "previous":
            paginationLink = <PaginationLink previous onClick={onClick} />;
            break;
        case "next":
            paginationLink = <PaginationLink next onClick={onClick} />;
            break;
        case "last":
            paginationLink = <PaginationLink last onClick={onClick} />;
            break;
        default:
            paginationLink = <PaginationLink onClick={onClick}>{value}</PaginationLink>;
    }
    return (
        <PaginationItem disabled={disabled} active={active}>
            {paginationLink }
        </PaginationItem>
    )
}
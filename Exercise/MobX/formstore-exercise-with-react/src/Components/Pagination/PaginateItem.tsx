import {PaginationItem, PaginationLink} from "reactstrap";
import {MouseEventHandler} from "react";
import {observer} from "mobx-react-lite";

interface IPaginateItem{
    value? : string | number,
    onClick : MouseEventHandler,
    disabled? : boolean,
    active? : boolean,
    linkProp? : "" | "first" | "previous" | "next" | "last"
}
function PaginateItem({value, onClick, disabled=false, active=false, linkProp = ""} : IPaginateItem ) {
    const paginationLink = () => {
        switch (linkProp) {
            case "first":
                return <PaginationLink first onClick={onClick} />;
            case "previous":
                return <PaginationLink previous onClick={onClick} />;
            case "next":
                return <PaginationLink next onClick={onClick} />;
            case "last":
                return <PaginationLink last onClick={onClick} />;
            default:
                return <PaginationLink onClick={onClick}>{value}</PaginationLink>;
        }
    }
    return (
        <PaginationItem disabled={disabled} active={active}>
            {paginationLink()}
        </PaginationItem>
    )
}
export default observer(PaginateItem)
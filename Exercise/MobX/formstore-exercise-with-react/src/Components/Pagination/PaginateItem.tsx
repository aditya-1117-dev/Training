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
    return (
        <PaginationItem disabled={disabled} active={active}>
            {linkProp === ""
                ? <PaginationLink onClick={onClick}> {value}</PaginationLink>
                : linkProp === "first"
                    ? <PaginationLink first onClick={onClick} />
                    : linkProp === "previous"
                        ? <PaginationLink previous onClick={onClick} />
                        : linkProp === "next"
                            ? <PaginationLink next onClick={onClick} />
                            : <PaginationLink last onClick={onClick} /> }
        </PaginationItem>
    )
}
export default observer(PaginateItem)
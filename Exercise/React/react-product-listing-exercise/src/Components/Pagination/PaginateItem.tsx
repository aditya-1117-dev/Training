import {PaginationItem, PaginationLink} from "reactstrap";
import {MouseEventHandler} from "react";

export default function PaginateItem({value, onClick, disabled=false, active=false, linkProp = ""} : {value? : string | number, onClick : MouseEventHandler, disabled? : boolean, active? : boolean, linkProp? : "" | "first" | "previous" | "next" | "last" }) {
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
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function PaginationComponent({currentPage, totalPages, onPageChange}: { currentPage: number, totalPages: number, onPageChange: (page: number) => void; }) {
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
            <PaginationItem key={i} active={i === currentPage}>
                <PaginationLink onClick={() => onPageChange(i)}> {i} </PaginationLink>
            </PaginationItem>
        );
    }
    return (
        <Pagination>
            <PaginationItem key="first" disabled={currentPage==1}>
                <PaginationLink first onClick={() => onPageChange(1)} />
            </PaginationItem>
            <PaginationItem key="previous" disabled={currentPage==1}>
                <PaginationLink previous onClick={() => onPageChange(currentPage-1)}/>
            </PaginationItem>

            {pageItems}

            <PaginationItem key="next" disabled={currentPage==totalPages}>
                <PaginationLink next onClick={() => onPageChange(currentPage+1)} />
            </PaginationItem>
            <PaginationItem key="last" disabled={currentPage==totalPages}>
                <PaginationLink last onClick={() => onPageChange(totalPages)}/>
            </PaginationItem>
        </Pagination>
    );
}

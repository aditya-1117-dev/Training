import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function PaginationComponent({currentPage, totalPages, onPageChange}: { currentPage: number, totalPages: number, onPageChange: (page: number) => void; }) {
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
            <PaginationItem key={i} active={i === currentPage}>
                <PaginationLink onClick={() => onPageChange(i)}>{i}</PaginationLink>
            </PaginationItem>
        );
    }
    return (
        <Pagination>
            <PaginationItem key="first">
                <PaginationLink first onClick={() => onPageChange(1)} />
            </PaginationItem>
            <PaginationItem key="previous">
                <PaginationLink previous onClick={() => {
                    if(currentPage>1) onPageChange(currentPage-1);
                    else onPageChange(totalPages);
                }}/>
            </PaginationItem>

            {pageItems}

            <PaginationItem key="next">
                <PaginationLink next onClick={() => {
                    if(currentPage<totalPages) onPageChange(currentPage+1)
                    else onPageChange(1);
                }} />
            </PaginationItem>
            <PaginationItem key="last">
                <PaginationLink last onClick={() => onPageChange(totalPages)}/>
            </PaginationItem>
        </Pagination>
    );
}

import { Pagination } from "reactstrap";
import PaginateItem from "./PaginateItem.tsx";

export default function PaginationComponent({currentPage, totalPages, onPageChange}: { currentPage: number, totalPages: number, onPageChange: (page: number) => void; }) {
    const pageItems = [];
    if(currentPage>2){
        pageItems.push(<PaginateItem key="first-dots" value="..." disabled={currentPage<=1} onClick={() => onPageChange(currentPage-2)}/>)
    }
    for (let i = currentPage - 1; i <= currentPage+1; i++) {
        if(i>0 && i<=totalPages){
            pageItems.push(<PaginateItem key={i} value={i} active={i === currentPage} onClick={() => onPageChange(i)} />);
        }
    }
    if(currentPage < totalPages-1){
        pageItems.push(<PaginateItem key="last-dots" value="..." disabled={currentPage>=totalPages} onClick={() => onPageChange(currentPage+2)}/>)
    }
    return (
        <Pagination>
            <PaginateItem key="first" disabled={currentPage===1}  onClick={() => onPageChange(1)} linkProp="first"/>
            <PaginateItem key="previous" disabled={currentPage===1}  onClick={() => onPageChange(currentPage-1)} linkProp="previous"/>
            {pageItems}
            <PaginateItem key="next" disabled={currentPage===totalPages}  onClick={() => onPageChange(currentPage+1)} linkProp="next"/>
            <PaginateItem key="last" disabled={currentPage===totalPages}  onClick={() => onPageChange(totalPages)} linkProp="last"/>
        </Pagination>
    );
}

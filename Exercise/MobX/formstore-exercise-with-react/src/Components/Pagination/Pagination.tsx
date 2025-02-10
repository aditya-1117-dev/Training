import { Pagination } from "reactstrap";
import PaginateItem from "./PaginateItem.tsx";
import {useContext} from "react";
import {ListTableStoreContext} from "../../Context/ListTableContext.tsx";
import {observer} from "mobx-react-lite";

function PaginationComponent() {
    const store = useContext(ListTableStoreContext);
    const pageItems = [];
    if(store.page>2){
        pageItems.push(<PaginateItem key="first-dots" value="..." disabled={store.page<=1} onClick={() => store.setCurrentPage(store.page-2)}/>)
    }
    for (let i = store.page - 1; i <= store.page+1; i++) {
        if(i>0 && i<=store.totalPages){
            pageItems.push(<PaginateItem key={i} value={i} active={i === store.page} onClick={() => store.setCurrentPage(i)} />);
        }
    }
    if(store.page < store.totalPages-1){
        pageItems.push(<PaginateItem key="last-dots" value="..." disabled={store.page>=store.totalPages} onClick={() => store.setCurrentPage(store.page+2)}/>)
    }
    return (
        <Pagination>
            <PaginateItem key="first" disabled={store.page===1}  onClick={() => store.setCurrentPage(1)} linkProp="first"/>
            <PaginateItem key="previous" disabled={store.page===1}  onClick={() => store.setCurrentPage(store.page-1)} linkProp="previous"/>
            {pageItems}
            <PaginateItem key="next" disabled={store.page===store.totalPages}  onClick={() => store.setCurrentPage(store.page+1)} linkProp="next"/>
            <PaginateItem key="last" disabled={store.page===store.totalPages}  onClick={() => store.setCurrentPage(store.totalPages)} linkProp="last"/>
        </Pagination>
    );
}

export default observer(PaginationComponent);
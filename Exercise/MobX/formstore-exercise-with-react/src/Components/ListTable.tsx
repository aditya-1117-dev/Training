import { observer } from 'mobx-react-lite';
import {Col, Container, Input, Row, Table} from "reactstrap";
import PaginationComponent from "./Pagination/Pagination.tsx";
import {ChangeEvent, useContext} from "react";
import {ListTableStoreContext} from "../Context/ListTableContext.tsx";
import Loader from "./Loader.tsx";
import ListRows from "./ListRows.tsx";

const ListTable = ({ tableContent, columns } : any) => {
    const store = useContext(ListTableStoreContext);
    return (
        <Col>
            <Container className="search-container">
                <Input className="search-input" placeholder="Search for products" value={store.searchQuery} onChange={(e : ChangeEvent<HTMLInputElement>)=> store.setSearchQuery(e.target.value)} />
            </Container>
            <Col md={8} style={{ margin: "0 auto" }}>
                {store.isLoading? <Loader height={100} width={100} /> :
                    tableContent.length === 0 ? <Row className="bold justify-content-center"> No Products Available</Row> :
                        (
                            <Table bordered hover responsive>
                                <thead>
                                <tr>
                                    {columns.map((col : string) => (
                                        <th key={col} className="text-uppercase text-center">{col.toUpperCase()}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {tableContent.map((row: any) => (
                                    <ListRows key={row.id} row={row} columns={columns} />
                                ))}
                                </tbody>
                            </Table>
                        )
                }
                <PaginationComponent/>
            </Col>
        </Col>
    );
};

export default observer(ListTable);

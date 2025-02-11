import { observer } from 'mobx-react-lite';
import {Col, Container, Input, Row, Table} from "reactstrap";
import PaginationComponent from "./Pagination/Pagination.tsx";
import {ChangeEvent, useContext} from "react";
import {ListTableStoreContext} from "../Context/ListTableContext.tsx";
import Loader from "./Loader.tsx";
import ListRows from "./ListRows.tsx";
import CheckBox from "./CheckBox.tsx";

const ListTable = ({ columns, Key } : any) => {
    const store = useContext(ListTableStoreContext);
    const tableContent =  store.getKeyInData(Key);
    const selectAllID = 11111111;

    function onCheckboxSelection( id: number){
        if ( id === selectAllID){
            if (store.isSelected(selectAllID) ){
                store.deSelectAll();
                return ;
            }else {
                store.selectAll();
            }
        }else {
            if (store.isSelected(selectAllID) ){
                store.updateSelection(selectAllID);
            }
        }
        return store.updateSelection(id);
    }
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
                                    <th className="text-uppercase text-center">
                                        <CheckBox id={selectAllID} value={store.isSelected(selectAllID)} onchange={()=> onCheckboxSelection(selectAllID)} />
                                    </th>
                                    {Object.keys(columns).map((colKey: string) => (
                                        <td key={colKey} className="text-center">{columns[colKey]}</td>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {tableContent.map((row: any, index: number) => (
                                        <tr key={row.id}>
                                            <td className="text-center">
                                                <CheckBox id={index} value={store.isSelected(index)}
                                                          onchange={() => onCheckboxSelection(index)}/>
                                            </td>
                                            <ListRows row={row} columns={Object.keys(columns)}/>
                                        </tr>
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

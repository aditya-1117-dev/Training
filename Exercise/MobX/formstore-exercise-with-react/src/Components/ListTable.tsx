import {observer} from 'mobx-react-lite';
import {Col, Container, Input, Row, Table} from "reactstrap";
import PaginationComponent from "./Pagination/Pagination.tsx";
import {ChangeEvent, useContext} from "react";
import {ListTableStoreContext} from "../Context/ListTableContext.tsx";
import Loader from "./Loader.tsx";
import ListRows from "./ListRows.tsx";
import Checkbox from "./InputFields/Checkbox.tsx";

const ListTable = ({columns, name}: any) => {
    const store = useContext(ListTableStoreContext);
    const tableContent = store.getKeyInData(name);
    const selectAll = store.isSelectAll();

    function onCheckboxSelection(id: number) {
        return store.updateSelection(id);
    }

    function handleSelectAll() {
        !store.isSelectAll() ? store.selectAll() : store.deSelectAll();
    }

    return (
        <Col>
            <Container className="search-container">
                <Input className="search-input" placeholder="Search for products" value={store.searchQuery}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => store.setSearchQuery(e.target.value)}/>
            </Container>
            <Col md={8} style={{margin: "0 auto"}}>
                {store.isLoading() ? <Loader height={100} width={100}/> :
                    tableContent.length === 0 ?
                        <Row className="bold justify-content-center"> No Products Available</Row> :
                        (
                            <Table bordered hover responsive>
                                <thead>
                                <tr>
                                    <th className="text-uppercase text-center">
                                        <Checkbox value={selectAll} onChange={handleSelectAll} name="name"
                                                  options={[{value: '', label: ''}]}/>
                                    </th>
                                    {columns.map((column : any) => (
                                        <td key={column.name} className="text-center">{column.display}</td>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {tableContent.map((row: any, index: number) => (
                                    <tr key={row.id}>
                                        <td className="text-center">
                                            <Checkbox value={store.isSelected(index)}
                                                      onChange={() => onCheckboxSelection(index)} name="name"
                                                      options={[{value: '', label: ''}]}/>
                                        </td>
                                        <ListRows row={row} columns={columns.map((column : any)=> column.name)}/>
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

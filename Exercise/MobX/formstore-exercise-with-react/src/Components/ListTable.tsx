import {observer} from 'mobx-react-lite';
import {Col, Input, Row, Table} from "reactstrap";
import PaginationComponent from "./Pagination/Pagination.tsx";
import {ChangeEvent, useContext} from "react";
import {ListTableStoreContext} from "../Context/ListTableContext.tsx";
import Loader from "./Loader.tsx";
import ListRows from "./ListRows.tsx";
import Checkbox from "./InputFields/CheckboxInput.tsx";

const ListTable = ({columns, name}: any) => {
    const store = useContext(ListTableStoreContext);
    const tableContent = store.getKeyInData(name);
    const selectAll = store.isSelectAll();

    function onCheckboxSelection(id: number) {
        return store.updateSelection(id);
    }

    function handleSelectAll() {
        selectAll ? store.deSelectAll() : store.selectAll();
    }

    return (
        <Col>
            <Row className="search-container">
                <Col md={7}>
                    <Input className="search-input" placeholder="Search for products" value={store.searchQuery}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => store.setSearchQuery(e.target.value)}/>
                </Col>
                <Col md={4}>
                    Number of Selected Items are : {store.numberOfSelectedItems}
                </Col>
            </Row>
            <Col style={{marginTop: "6%", width: '100%'}}>
                <Table bordered hover responsive style={{width: '100%', tableLayout: 'fixed'}}>
                    <thead>
                    <tr>
                        <th style={{width: 50}} className="text-uppercase text-center">
                            <Checkbox value={selectAll} onChange={handleSelectAll} name="name"
                                      options={[{value: '', label: ''}]}/>
                        </th>
                        {columns.map((column: any) => (
                            <th key={column.name} className="text-center">{column.display}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {store.isLoading()
                        ? <tr className="text-center">
                            <td colSpan={columns.length}><Loader height={100} width={100}/></td>
                        </tr>
                        : tableContent.length === 0
                            ? (<tr>
                                <td colSpan={columns.length} className="text-center">No Products Available</td>
                            </tr>)
                            : (tableContent.map((row: any) => (
                                    <tr key={row.id}>
                                        <td className="text-center">
                                            <Checkbox value={store.isSelected(row.id)}
                                                      options={[{value: '', label: ''}]}
                                                      onChange={() => onCheckboxSelection(row.id)} name="name"/>
                                        </td>
                                        <ListRows row={row} columns={columns}/>
                                    </tr>
                                ))
                            )
                    }
                    </tbody>
                </Table>
                <PaginationComponent/>
            </Col>
        </Col>
    );
};

export default observer(ListTable);

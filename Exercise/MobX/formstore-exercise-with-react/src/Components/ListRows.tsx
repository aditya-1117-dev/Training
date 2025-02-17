import { observer } from "mobx-react-lite";

function ListRows({ row, columns }: { row: any; columns: {name: string; render?: (value: any, row: any) => JSX.Element | string}[] }) {
    return (
        <>
            {columns.map( (col : any) => (
                <td key={col.name} className="text-center align-middle">
                    {col.render ? col.render( row ) : (row[col.name] || "---")}
                </td>
            ))}
        </>
    );
}

export default observer(ListRows);

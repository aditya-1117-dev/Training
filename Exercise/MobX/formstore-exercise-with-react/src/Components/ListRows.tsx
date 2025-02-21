import { observer } from "mobx-react-lite";

function ListRows({ row, columns }: { row: any; columns: {name: string; render?: (value: any, row: any) => JSX.Element | string}[] }) {
    return (
        <>
            {columns.map( (col : any) => {
                const nestedKeys = col.name.split('.');
                let value = "---"
                for(const key of nestedKeys) {
                    if (key === nestedKeys[0]) value = row[key];
                    else value = value[key];
                }
                return (
                    <td key={col.name} className="text-center align-middle">
                        {col.render ? col.render(row) : value}
                    </td>
                )
            })}
        </>
    );
}

export default observer(ListRows);

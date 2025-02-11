import { observer } from "mobx-react-lite";
import { CardImg } from "reactstrap";

function ListRows({ row, columns }: { row: any; columns: string[] }) {
    return (
        <>
            {columns.map((col) => (
                <td key={col} className="text-center align-middle">
                    {col === "thumbnail" ? (<CardImg src={row.thumbnail} alt={row.title} style={{ width: "50px", height: "50px" }} />)
                        : col === "description" ? (row.description.length > 90 ? `${row.description.slice(0, 90)}...` : row.description)
                            : (row[col] || "---")}
                </td>
            ))}
        </>
    );
}

export default observer(ListRows);

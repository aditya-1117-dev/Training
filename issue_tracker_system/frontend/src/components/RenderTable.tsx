import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, LinearProgress, Stack, Pagination
} from '@mui/material';
import type { ReactNode } from "react";

export interface IRendertable<T> {
    data: T[];
    columns: {
        key: string;
        header: string;
        render?: (item: T) => ReactNode;
        align?: 'left' | 'center' | 'right';
        width?: string | number;
    }[];
    loading?: boolean;
    page?: number;
    totalPages?: number;
    onPageChange?: (newPage: number) => void;
}

export function RenderTable<T>({
                                   data, columns, loading,
                                   page = 1, totalPages = 1, onPageChange
                               }: IRendertable<T>) {
    return (
        <TableContainer
            component={Paper}
            sx={{ width: '100%', overflowX: 'auto' }}
        >
            {loading && <LinearProgress />}
            <Table sx={{ width : "100%" }} aria-label="data table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.key}
                                align={column.align}
                                sx={{ width: column.width }}
                            >
                                {column.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell
                                    key={`${index}-${column.key}`}
                                    align={column.align}
                                    sx={{ width: column.width }}
                                >
                                    {column.render
                                        ? column.render(item)
                                        : (item as Record<string, any>)[column.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {
                onPageChange &&
                (
                <Stack direction="row" justifyContent="center" p={2}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => onPageChange(value)}
                        color="primary"
                    />
                </Stack>
            )}
        </TableContainer>
    );
}

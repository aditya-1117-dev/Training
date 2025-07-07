import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress,
    Stack,
    Pagination,
} from '@mui/material';
import type {ReactNode} from 'react';

export interface IColumn<T> {
    key: string;
    label: string;
    render?: (item: T, index?: number) => ReactNode;
    align?: 'left' | 'center' | 'right';
    width?: string | number;
}

export interface IRendertable<T> {
    data: T[];
    columns: IColumn<T>[];
    loading?: boolean;
    page?: number;
    totalPages?: number;
    onPageChange?: (newPage: number) => void;
}

export function RenderTable<T extends Record<string, undefined>>({
                                   data,
                                   columns,
                                   loading,
                                   page = 1,
                                   totalPages = 1,
                                   onPageChange,
                               }: IRendertable<T>) {
    return (
        <TableContainer component={Paper} sx={{width: '100%', overflowX: 'auto'}}>
            {loading && <LinearProgress/>}
            <Table sx={{width: '100%'}} aria-label="data table">
                <TableHead>
                    <TableRow>
                        {columns.map((column: IColumn<T>) => (
                            <TableCell
                                key={column.key}
                                align={column.align}
                                sx={{width: column.width}}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 ? (
                            data.map((item: T, index: number) => (
                                <TableRow key={index}>
                                    {columns.map((column: IColumn<T>) => (
                                        <TableCell
                                            key={`${index}-${column.key}`}
                                            align={column.align}
                                            sx={{width: column.width}}
                                        >
                                            {column.render
                                                ? column.render(item, index)
                                                : item[column.key] ?? ' - '}
                                        </TableCell>
                                    ))}
                                </TableRow>)
                            )
                        )
                        : (<TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>

            {onPageChange && (
                <Stack direction="row" justifyContent="center" p={2}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => onPageChange(value)}
                        color="primary"
                        siblingCount={0}
                        boundaryCount={1}
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            )}
        </TableContainer>
    );
}
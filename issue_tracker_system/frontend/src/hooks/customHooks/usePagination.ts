import { useState, useCallback } from 'react';

interface PaginationProps {
    initialPage?: number;
    initialLimit?: number;
    totalItems?: number;
}

interface PaginationResult {
    page: number;
    limit: number;
    totalPages: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setTotalItems: (totalItems: number) => void;
    handlePageChange: (newPage: number) => void;
}

export function usePagination({
                                  initialPage = 1,
                                  initialLimit = 5,
                                  totalItems = 0,
                              }: PaginationProps = {}): PaginationResult {
    const [page, setPage] = useState<number>(initialPage);
    const [limit, setLimit] = useState<number>(initialLimit);
    const [totalPages, setTotalPages] = useState<number>(
        Math.ceil(totalItems / initialLimit) || 1
    );

    const setTotalItems = useCallback(
        (total: number) => {
            setTotalPages(Math.ceil(total / limit) || 1);
        },
        [limit]
    );

    const handlePageChange = useCallback(
        (newPage: number) => {
            if (newPage >= 1 && newPage <= totalPages) {
                setPage(newPage);
            }
        },
        [totalPages]
    );

    return {
        page,
        limit,
        totalPages,
        setPage,
        setLimit,
        setTotalItems,
        handlePageChange,
    };
}
import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationControlProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({ totalPages, currentPage, onPageChange }) => {
  const getPageItems = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    pages.push(1, 2);

    const start = Math.max(3, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);

    if (start > 3) pages.push('ellipsis');
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < totalPages - 2) pages.push('ellipsis');

    pages.push(totalPages - 1, totalPages);

    return pages;
  };

  return (
    <Pagination>
      <Pagination.Prev className="me-2" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} />
      {getPageItems().map((item, idx) =>
        item === 'ellipsis' ? (
          <Pagination.Ellipsis key={`e-${idx}`} disabled />
        ) : (
          <Pagination.Item key={item} active={item === currentPage} onClick={() => onPageChange(item)}>
            {item}
          </Pagination.Item>
        ),
      )}
      <Pagination.Next className="ms-2" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
    </Pagination>
  );
};

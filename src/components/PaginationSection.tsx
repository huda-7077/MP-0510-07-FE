import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationSectionProps {
  page: number;
  take: number;
  total: number;
  onChangePage: (page: number) => void;
}

const PaginationSection: React.FC<PaginationSectionProps> = ({
  page,
  take,
  total,
  onChangePage,
}) => {
  const totalPages = Math.ceil(total / take);

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const range = 3;
    const start = Math.max(1, page - range);
    const end = Math.min(totalPages, page + range);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent className="flex items-center gap-2">
        <PaginationItem>
          <PaginationPrevious
            className={`rounded px-3 py-2 ${
              page === 1
                ? "cursor-not-allowed text-gray-400"
                : "hover:bg-gray-200"
            }`}
            onClick={page > 1 ? () => onChangePage(page - 1) : undefined}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              className={`rounded px-3 py-2 ${
                pageNum === page
                  ? "bg-primary text-white dark:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => onChangePage(pageNum)}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={`rounded px-3 py-2 ${
              page === totalPages
                ? "cursor-not-allowed text-gray-400"
                : "hover:bg-gray-200"
            }`}
            onClick={
              page < totalPages ? () => onChangePage(page + 1) : undefined
            }
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSection;

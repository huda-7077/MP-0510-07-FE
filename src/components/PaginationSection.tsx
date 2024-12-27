import { PaginationMeta } from "@/types/pagination";
import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
interface PaginationSectionProps extends PaginationMeta {
  onChangePage: (page: number) => void;
}

const PaginationSection: FC<PaginationSectionProps> = ({
  page,
  take,
  total,
  onChangePage,
}) => {
  const handlePrev = () => {
    if (page > 1) {
      onChangePage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < Math.ceil(total / take)) {
      onChangePage(page + 1);
    }
  };

  return (
    <Pagination className="my-12">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={handlePrev} />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>

        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSection;

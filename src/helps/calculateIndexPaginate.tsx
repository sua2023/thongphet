import { FilterState } from "@/interfaces/filter";

interface IndexPaginateTypes {
  filter: any;
  index: number;
}

export const calculateIndexPaginate = ({
  filter,
  index,
}: IndexPaginateTypes) => {
  const indexPageNumber =
    index + 1 + (filter?.page * filter?.offset - filter?.offset);

  return indexPageNumber;
};

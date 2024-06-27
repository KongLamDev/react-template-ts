import {
  CellContext,
  ColumnDefTemplate,
  createColumnHelper,
} from "@tanstack/react-table";
import { Data } from "../../App";

const columnHelper = createColumnHelper<Data>();

const getFormattedDate = (value: string) => {
  const date = new Date(value);
  // Extract and format day, month, and year
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const DateCell: ColumnDefTemplate<CellContext<Data, string>> = ({
  getValue,
}) => {
  const value = getValue();
  return <span>{getFormattedDate(value)}</span>;
};

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("merchant", {
    header: "Merchant",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("date", {
    header: "Date",
    id: "date",
    cell: DateCell,
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
];

import { FC } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Data } from "../../App";
import styled from "styled-components";
import { columns } from "./columns";

const Table = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
  white-space: nowrap;

  thead {
    display: flex;
  }

  tbody {
    display: flex;
    flex-direction: column;
  }

  tr {
    display: flex;
    width: 100%;
  }

  th,
  td {
    flex: 1;
    text-align: left;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface Props {
  data: Data[];
}

export const TableExpenses: FC<Props> = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

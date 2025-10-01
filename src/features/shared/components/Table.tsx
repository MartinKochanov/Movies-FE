import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import type { ReactNode } from "react";

export type Column<T> = {
  field: keyof T | string;
  headerName: string;
  width?: number;
  renderCell?: (row: T) => ReactNode;
};

export interface GenericTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowId?: (row: T) => string;
  count: number;
  page: number;
  rowsPerPage: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSortChange?: (field: string) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export const GenericTable = <T extends { id: string }>({
  columns,
  rows,
  rowId,
  count,
  page,
  rowsPerPage,
  sortField,
  sortOrder,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  onEdit,
  onDelete,
}: GenericTableProps<T>) => {
  const handleSort = (field: string) => {
    if (onSortChange) onSortChange(field);
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field.toString()}>
                {onSortChange ? (
                  <TableSortLabel
                    active={sortField === col.field}
                    direction={sortOrder}
                    onClick={() => handleSort(col.field.toString())}
                  >
                    {col.headerName}
                  </TableSortLabel>
                ) : (
                  col.headerName
                )}
              </TableCell>
            ))}
            {(onEdit || onDelete) && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={rowId ? rowId(row) : row.id}>
              {columns.map((col) => (
                <TableCell key={col.field.toString()}>
                  {col.renderCell ? col.renderCell(row) : (row as any)[col.field]}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell>
                  {onEdit && (
                    <IconButton onClick={() => onEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton onClick={() => onDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

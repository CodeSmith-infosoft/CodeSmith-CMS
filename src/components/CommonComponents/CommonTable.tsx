import { Dispatch, JSX, ReactNode, SetStateAction } from "react";
import { Table } from "react-bootstrap";
import TablePagination from "./TablePagination";

type ComponentProps = {
  data: any[];
  header: {
    title: string | JSX.Element;
    dataIndex: string;
    key: string;
    render?: (text: any, record: any) => ReactNode;
    headerClass?: string;
    cellClass?: string;
  }[];
  extraColumn?: [];
  isPagination?: boolean;
  loading?: boolean;
  limit?: number;
  page?: number;
  totalPages?: number;
  totalRecords?: number;
  onPageChange?: Dispatch<
    SetStateAction<{
      page: number;
      limit: number;
      totalPages: number;
      totalRecords: number;
    }>
  >;
};

const CommonTable: React.FC<ComponentProps> = ({
  data,
  header,
  isPagination,
  loading,
  limit,
  page,
  totalPages,
  totalRecords,
  onPageChange,
  extraColumn
}) => {
  const handlePageChange = onPageChange || (() => {});
  return (
    <div className="common-table">
      <Table className="mb-0">
        <thead>
          <tr>
            {header.length ? (
              header.map((data, index) => (
                <th className={data.headerClass} key={index}>
                  {data.title}
                </th>
              ))
            ) : (
              <th>No Header</th>
            )}
          </tr>
        </thead>
        <tbody>
          <>
            {data.length ? (
              data.map((col, index) => (
                <tr key={index}>
                  {header.map((row, index) => (
                    <td className={`${row.cellClass || ""} `} key={index}>
                      {row.render
                        ? row.render(col?.[row.dataIndex], col)
                        : col?.[row.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12}>
                  {loading ? "Fetching Data" : "No Data Found"}
                </td>
              </tr>
            )}
            {extraColumn?.length ? 
            extraColumn.map((column: [], index: number) => (
              <tr key={index}>
                {column.map((row: any, index: number) => (
                  <td key={index}>{row}</td>
                ))}
              </tr>
            ))
            :<></>}
          </>
        </tbody>
      </Table>
      {isPagination && (
        <TablePagination
          page={page}
          limit={limit}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
        />
      )}

      {/* gdddddddddd */}
    </div>
  );
};

export default CommonTable;

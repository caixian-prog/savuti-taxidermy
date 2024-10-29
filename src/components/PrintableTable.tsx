import { PrinterOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { FC } from "react";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

interface PROPS {
  dataSource: any[];
  columns: any;
  filename?: string;
}
const PrintableTable: FC<PROPS> = ({
  dataSource,
  columns,
  filename = "table_data.xlsx",
}) => {
  // Function to export data to Excel
  const exportToExcel = () => {
    // Create an array of headers based on the column titles
    const headers = columns.map((col: any) => col.title);

    // Map the data to an array of arrays based on the column dataIndex
    const dataForExport = dataSource.map(
      (row) => columns.map((col: any) => row[col.dataIndex]) // Remove reliance on DataType
    );

    // Add headers at the beginning of the data array
    const excelData = [headers, ...dataForExport];

    // Create a worksheet and a workbook
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write to Excel
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    FileSaver.saveAs(blob, filename);
  };
  return (
    <div>
      <div className="text-end mb-2">
        <Button type="primary" onClick={exportToExcel}>
          <PrinterOutlined /> Print
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default PrintableTable;

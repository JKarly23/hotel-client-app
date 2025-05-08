import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

const ExportButton = ({ data, columns, fileName = "export", format = "xlsx" }) => {
  const handleExport = () => {
    const exportData = data.map((row) => {
      const filteredRow = {};
      columns.forEach((col) => {
        filteredRow[col.label] = row[col.key];
      });
      return filteredRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    const writeOptions = { bookType: format, type: "array" };
    const buffer = XLSX.write(workbook, writeOptions);
    const blob = new Blob([buffer], { type: "application/octet-stream" });

    saveAs(blob, `${fileName}.${format}`);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      <Download className="w-4 h-4" />
      Exportar
    </button>
  );
};

export default ExportButton;

'use client'

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ExportToPDF = () => {
  const divRef = useRef();

  const handleExportToPDF = () => {
    const input = divRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("transactions.pdf");
    });
  };

  return (
    <div>
      <div ref={divRef} style={{ padding: "20px", border: "1px solid black" }}>
        <h1>Transactions</h1>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr className='bg-blue-500'>
              <th style={{ border: "1px solid #000", padding: "8px" }}>TRANSACTION NO.</th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>ITEM NAME</th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>UNIT COST</th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>CUSTOMER TYPE</th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>CUSTOMER NAME</th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>PAYMENT OPTIONS</th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>SALES PERSON</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #000", padding: "8px" }}>001</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>Item A</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>$10</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>Regular</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>John Doe</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>Credit Card</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>Jane Smith</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "8px" }}>002</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>Item B</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>$20</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>Premium</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>Alice Brown</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>Cash</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>Bob White</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      <button onClick={handleExportToPDF} style={{ marginTop: "20px" }}>
        Export to PDF
      </button>
    </div>
  );
};

export default ExportToPDF;

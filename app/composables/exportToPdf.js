import React from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
import { Button } from '@nextui-org/button';
import { BiExport } from 'react-icons/bi';

const PdfExport = (data) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    const columns = [
        {name: "TRANSACTION NO.", dataKey: "transaction_no"},
        {name: "ITEM NAME", dataKey: "item_name"},
        {name: "UNIT COST", dataKey: "unit_cost"},
        {name: "CUSTOMER TYPE", dataKey: "customer_type"},
        {name: "CUSTOMER NAME", dataKey: "customer_name"},
        {name: "PAYMENT METHOD", dataKey: "payment_method"},
        {name: "SALES PERSON", dataKey: "sales_person"},
      ];
      
    // Add the table to the PDF
    doc.autoTable({
      head: [columns.map(col => col.name)],
      body: data.rows.map(item => [item.transaction_no, item.item_name, item.unit_cost, item.customer_type, item.customer_name, item.payment_method, item.sales_person ]),
    });

    // Save the generated PDF
    doc.save('transactions.pdf');
  };

  return (
    <div>
        <Button color="primary" endContent={<BiExport />} onPress={exportToPDF}>  Export</Button>
    </div>
  );
};

export default PdfExport;

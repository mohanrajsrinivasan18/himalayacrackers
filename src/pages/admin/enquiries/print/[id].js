export async function getServerSideProps({ params }) {
  return { props: { id: params.id } };
}

export default function PrintInvoice({ id }) {
  return (
    <html>
      <head>
        <title>Invoice #{id}</title>
        <style>{`
          body { font-family: Arial; padding: 40px; }
          h1 { margin-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; }
          th { background: #f3f4f6; }
        `}</style>
      </head>

      <body onLoad={() => window.print()}>
        <h1>Himalaya Crackers</h1>  
        <p>Sivakasi, Tamil Nadu</p>
        <p><strong>Invoice No:</strong> HC-{id}</p>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Crackers</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop: 20 }}>
          <strong>GST:</strong> As applicable<br />
          <strong>Thank you for your business</strong>
        </p>
      </body>
    </html>
  );
}

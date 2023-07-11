import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import ComponentToPrint from './ComponentToPrint';

const RenderPrint = (props) => {
  const [pdfBlob, setPdfBlob] = useState(null);

  function renderPrintComponent() {
    pdf(<ComponentToPrint />)
      .toBlob()
      .then((blob) => {
        setPdfBlob(blob);
        downloadPdf(blob);
      })
      .catch((error) => {
        console.error('Error rendering or saving PDF:', error);
      });
  }
  
  function downloadPdf() {
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  return (
    <button onClick={renderPrintComponent} type="button" className='mx-1 btn btn-primary nav-text btn-lg action-ratio'>PDF</button>
  );
};

export default RenderPrint;
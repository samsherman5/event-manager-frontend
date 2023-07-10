import React from 'react';
import ComponentToPrint from './ComponentToPrint';
import { PDFViewer } from '@react-pdf/renderer';

const Print = () => (
  <PDFViewer>
    <ComponentToPrint />
  </PDFViewer>
);

export default Print;
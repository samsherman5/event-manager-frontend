import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import ComponentToPrint from './ComponentToPrint';

const Print = () => (
  <PDFViewer>
    <ComponentToPrint />
  </PDFViewer>
);

export default Print;
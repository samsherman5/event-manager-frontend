import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import ReactDOM from 'react-dom';
import ComponentToPrint from './ComponentToPrint';

const Print = ({address}) => (
  <PDFViewer>
    <ComponentToPrint address={address} />
  </PDFViewer>
);

export default Print;
ReactDOM.render(<Print />, document.getElementById('root'));
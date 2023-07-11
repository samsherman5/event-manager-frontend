import { createRoot } from 'react-dom/client';
import ComponentToPrint from './ComponentToPrint';
import ComponentToImage from './ComponentToImage';

const PDFRender = ({address}) => {
  const container = document.getElementById('root');
  const root = createRoot(container);

  function renderPrintComponent() {
    root.render(<ComponentToPrint address={address} />);
    document.body.style.backgroundColor = 'white';
  }
  
  return (
    <div>
      <button onClick={renderPrintComponent} type="button" className='mx-1 btn btn-primary nav-text btn-lg action-ratio'>PDF</button>
    </div>
  );
};

const ImageRender = ({day, address}) => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  
  function renderImageComponent() {
    root.render(<ComponentToImage day={day} address={address}  />);
    document.body.style.backgroundColor = 'white';
  }
  
  return (
    <div>
      <button onClick={renderImageComponent} type="button" className='mx-1 btn btn-primary nav-text btn-lg action-ratio'>Today</button>
    </div>
  );
};

export {PDFRender, ImageRender};
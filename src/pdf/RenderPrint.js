import { createRoot } from 'react-dom/client';
import ComponentToPrint from './ComponentToPrint';

const RenderPrint = (props) => {
  function renderPrintComponent() {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<ComponentToPrint address={props.address} />);
    document.body.style.backgroundColor = 'white';
  }
  
  return (
    <button onClick={renderPrintComponent} type="button" className='mx-1 btn btn-primary nav-text btn-lg action-ratio'>PDF</button>
  );
};

export default RenderPrint;
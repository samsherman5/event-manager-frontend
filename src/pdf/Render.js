import { useNavigate } from 'react-router-dom';


const PDFRender = ({address}) => {
  const navigate = useNavigate();

  function renderPrintComponent() {
    navigate('/pdf');
  }
  
  return (
    <div>
      <button onClick={renderPrintComponent} type="button" className='mx-1 btn btn-primary nav-text btn-lg action-ratio'>PDF</button>
    </div>
  );
};

const ImageRender = ({day, address}) => {
  const navigate = useNavigate();

  function renderImageComponent() {
    navigate('/image');
  }
  
  return (
    <div>
      <button onClick={renderImageComponent} type="button" className='mx-1 btn btn-primary nav-text btn-lg action-ratio'>Today</button>
    </div>
  );
};

export { ImageRender, PDFRender };

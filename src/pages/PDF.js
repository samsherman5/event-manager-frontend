

import ComponentToPrint from '../pdf/ComponentToPrint'; 

const PDF = ({address}) => { 
  document.body.style.backgroundColor = 'white';
  return (  
      <ComponentToPrint address={address} />
  ); 
}  

export default PDF;
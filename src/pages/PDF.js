

import ComponentToPrint from '../pdf/ComponentToPrint'; 

const PDF = ({address}) => { 
  document.body.style.backgroundColor = 'white';
  document.body.style.backgroundImage = "";
  return (  
      <ComponentToPrint address={address} />
  ); 
}  

export default PDF;
import { useEffect } from "react";
import ComponentToPrint from '../pdf/ComponentToPrint'; 

const PDF = ({address}) => { 
  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    document.body.style.backgroundImage = "";
  })

  return (  
      <ComponentToPrint address={address} />
  ); 
}  

export default PDF;
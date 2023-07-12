import { StyleSheet, View } from '@react-pdf/renderer';
import PrintableColumnPage from './PrintableColumnPage';
import React from 'react'; 



const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

const ComponentToPrint = ({address}) => {
    const printRef = React.useRef(null);

    return (
        <>
            <View ref={printRef} style={styles.section}>
                <div ref={printRef} className="d-flex justify-content-start align-items-center 25vh mb-3">
                    <img ref={printRef} alt="SummerTech Logo" src="/summertech-logo.png" className="img-fluid" style={{'max-width': '30%'}}/>
                </div>
            </View>
            <View ref={printRef} style={styles.section}>
                <PrintableColumnPage ref={printRef} address={address} day="Sunday"/>
            </View>
            <View ref={printRef} style={styles.section}>
                <PrintableColumnPage ref={printRef} address={address} day="Monday"/>
            </View>
            <View ref={printRef} style={styles.section}>
                <PrintableColumnPage ref={printRef} address={address} day="Tuesday"/>
            </View>
            <View ref={printRef} style={styles.section}>
                <PrintableColumnPage ref={printRef} address={address} day="Wednesday"/>
            </View>
            <View ref={printRef} style={styles.section}>
                <PrintableColumnPage ref={printRef} address={address} day="Thursday"/>
            </View>
            <View ref={printRef} style={styles.section}>
                <PrintableColumnPage ref={printRef} address={address} day="Friday"/>
            </View>
        </>
    );
};


export default ComponentToPrint;
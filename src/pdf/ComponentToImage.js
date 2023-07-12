import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import PrintableColumnPage from './PrintableColumnPage';

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

const ComponentToPrint = ({day, address}) => {

    return (
        <Document>
            <Page size="A4" className="App" styles={styles.page}>
                <View style={styles.section}>
                    <PrintableColumnPage view={"day"} address={address} day={day} />
                </View>
            </Page>
        </Document>
    );
};


export default ComponentToPrint;
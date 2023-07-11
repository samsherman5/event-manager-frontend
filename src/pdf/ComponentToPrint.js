import PrintableColumnPage from './PrintableColumnPage';
import { Page, View, Document, StyleSheet} from '@react-pdf/renderer';

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

const ComponentToPrint = ({address}) => (
    <Document>
        <Page size="A4" className="App" styles={styles.page}>
            <View style={styles.section}>
                <div className="d-flex justify-content-start align-items-center 25vh mb-3">
                    <img alt="SummerTech Logo" src="/summertech-logo.png" className="img-fluid" style={{'max-width': '30%'}}/>
                </div>
            </View>
            <View style={styles.section}>
                <PrintableColumnPage address={address} day="Sunday"/>
            </View>
            <View style={styles.section}>
                <PrintableColumnPage address={address} day="Monday"/>
            </View>
            <View style={styles.section}>
                <PrintableColumnPage address={address} day="Tuesday"/>
            </View>
            <View style={styles.section}>
                <PrintableColumnPage address={address} day="Wednesday"/>
            </View>
            <View style={styles.section}>
                <PrintableColumnPage address={address} day="Thursday"/>
            </View>
            <View style={styles.section}>
                <PrintableColumnPage address={address} day="Friday"/>
            </View>
        </Page>
    </Document>
);


export default ComponentToPrint;
import { StyleSheet, View } from '@react-pdf/renderer';
import PrintableColumnPage from '../pdf/PrintableColumnPage';

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

const Image = ({day, address}) => {
    document.body.style.backgroundColor = 'white';
    document.body.style.backgroundImage = "";

    return (
      <View style={styles.section}>
          <PrintableColumnPage view={"day"} address={address} day={day} />
      </View>
    );
};


export default Image;
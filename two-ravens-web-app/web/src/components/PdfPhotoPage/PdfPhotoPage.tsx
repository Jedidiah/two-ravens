import { View, Text, Image, Page, StyleSheet } from '@react-pdf/renderer';
import { Photo } from 'types/graphql';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  },
  photoTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#222',
    color: '#fff',
    marginBottom: 0,
    marginTop: 10,
    fontSize: 11,
  },
  section: {
    // margin: 10,
    padding: 10,
    paddingBottom: 0,
    // flexGrow: 1,
    // alignItems: 'flex-start',
    // alignContent: 'flex-start'
  },
  borderedBox: {
    border: '1px dotted #ccc',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    flexGrow: 1,
    fontSize: 11,
  },
  sectionTwoUp: {
    paddingVertical: 10,
    flexDirection: 'row',
    flexGrow: 1,
    alignContent: 'stretch',
  },
  signatureBox: {
    height: '4cm',
    fontSize: 11,
  },
});

function PdfPhotoPage(props: { photo: Photo; index: number; total: number }) {
  const { photo, index, total } = props;
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>
          Image Publication Approval
        </Text>

        <View style={styles.photoTitle}>
          <Text>{photo.title}</Text>
          <Text>{photo.cameraTrap.deviceId}</Text>
          <Text color="#ccc">
            Photo {index + 1} of {total}
          </Text>
        </View>

        <Image
          style={{
            width: '100%',
            height: '40vh',
            margin: '-4px auto',
            objectFit: 'contain',
            backgroundColor: '#222',
            border: '2px solid #333',
          }}
          src={{
            uri: photo.large,
          }}
        />
      </View>
      <View style={[styles.sectionTwoUp]}>
        <View style={[styles.borderedBox, { flexGrow: 3 }]}>
          <Text
            style={{
              fontFamily: 'Helvetica-Bold',
              fontSize: 14,
              marginBottom: 7,
            }}
          >
            Comments
          </Text>
          <Text wrap style={{ color: '#aaa' }}>
            Leave any notes you have about the image.
          </Text>
        </View>
        <View style={[styles.borderedBox]}>
          <Text
            style={{
              fontFamily: 'Helvetica-Bold',
              fontSize: 14,
              marginBottom: 7,
            }}
          >
            Approved Uses
          </Text>
          <Text wrap style={{ color: '#aaa' }}>
            Check the places you wish to allow publication
          </Text>
        </View>
      </View>
      <View style={styles.signatureBox}>
        <Text style={styles.section}>Approved By:</Text>
      </View>
    </Page>
  );
}

export default PdfPhotoPage;

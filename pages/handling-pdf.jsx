import Head from 'next/head';
import { Container } from 'react-bootstrap';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ebebeb',
  },
  title: {
    fontSize: '16pt',
  },
  section: {
    margin: 4,
    padding: 8,
    fontSize: '12pt',
  },
});

// Create Document Component
function ExampleDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Parodi Hujan</Text>
          <View style={styles.section}>
            <Text>Tak ada yang lebih basah</Text>
            <Text>dari hujan setelah Oktober. Banjir</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default function HandlingPDF() {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container className="py-3" style={{ height: '100vh' }}>
      <Head>
        <title>Handling PDF on React</title>
      </Head>

      {isMounted && (
        <PDFViewer style={{ width: '100%', height: '100%' }}>
          <ExampleDocument />
        </PDFViewer>
      )}
    </Container>
  );
}

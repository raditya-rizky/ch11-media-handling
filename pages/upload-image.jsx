import Head from "next/head";
import { Container, Stack, Form, Button } from "react-bootstrap";

export default function UploadImage() {
  return (
    <Container className="py-3">
      <Head>
        <title>Upload Image with Cloudinary Example</title>
      </Head>

      <Form style={{ maxWidth: 600, margin: "auto" }}>
        <Stack gap={3}>
          <h3>Upload Image with Cloudinary Example</h3>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}

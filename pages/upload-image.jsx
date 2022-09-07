import Head from 'next/head';
import { useState } from 'react';
import { Container, Stack, Form, Button } from 'react-bootstrap';
import { signUpload } from '../utils/cloudinary.server';

export async function getServerSideProps() {
  const cloudinarySign = signUpload();

  return {
    props: {
      cloudinarySign,
    },
  };
}

export default function UploadImage({ cloudinarySign }) {
  const [imageSrc, setImageSrc] = useState();
  const [cloudinaryData, setCloudinaryData] = useState();
  const [loading, setLoading] = useState(false);

  function handleOnChange(changeEvent) {
    if (!changeEvent.target.files[0]) {
      setImageSrc(undefined);
      setCloudinaryData(undefined);
      return;
    }

    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setCloudinaryData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    if (loading) return;

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'formFile'
    );

    // If developer forgot to create the file input or file input with the name declared above
    if (!fileInput) {
      throw new Error(
        'The file input is not found. Make sure you define it on your Form'
      );
    }

    // If no files to submit then just return
    if (fileInput.files.length < 1) {
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('api_key', cloudinarySign.apiKey);
    formData.append('timestamp', cloudinarySign.timestamp);
    formData.append('signature', cloudinarySign.signature);
    formData.append('folder', 'my-first-folder');
    // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260"); // You can manipulate image here

    setLoading(true);

    const url = `https://api.cloudinary.com/v1_1/${cloudinarySign.cloudName}/auto/upload`;
    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadResponse.json();
    setImageSrc(uploadData.secure_url);
    setCloudinaryData(uploadData);
    console.log(uploadData.url);

    setLoading(false);
  }

  return (
    <Container className="py-3">
      <Head>
        <title>Upload Image with Cloudinary Example</title>
      </Head>

      <Form
        style={{ maxWidth: 600, margin: 'auto' }}
        method="post"
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      >
        <Stack gap={3}>
          <h3>Upload Image with Cloudinary Example</h3>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control name="formFile" type="file" accept="image/*" />
          </Form.Group>

          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt="Image Upload Result" width="100%" />
          )}

          {imageSrc && !cloudinaryData && (
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          )}

          {cloudinaryData && (
            <code>
              <pre>{JSON.stringify(cloudinaryData, null, 2)}</pre>
            </code>
          )}
        </Stack>
      </Form>
    </Container>
  );
}

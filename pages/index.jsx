import Head from "next/head";
import Link from "next/link";
import { Container, Stack } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="py-3">
      <Head>
        <title>Learn Media Handling</title>
      </Head>

      <Stack gap={3} direction="horizontal">
        <Link href="/upload-image">
          <a>Upload Image</a>
        </Link>

        <Link href="/video-player">
          <a>Video Player</a>
        </Link>

        <Link href="/preview-pdf">
          <a>Preview PDF</a>
        </Link>
      </Stack>
    </Container>
  );
}

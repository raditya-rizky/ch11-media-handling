import Head from 'next/head';
import dynamic from 'next/dynamic';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'https://www.youtube.com/watch?v=htTVKo9HaSo',
  bunnyMovie: 'https://www.youtube.com/watch?v=iik25wqIuFo',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm',
};

export default function VideoPlayer() {
  const player = useRef(null);
  const [source, setSource] = useState(sources.sintelTrailer);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);

  // An hacky way to make react-player render only on client
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container className="py-3">
      <Head>
        <title>Create Video Player on React</title>
      </Head>

      <div style={{ width: 600, margin: 'auto' }}>
        <h3>Create Video Player on React</h3>

        {isMounted && (
          <ReactPlayer
            ref={player}
            url={source}
            playing={playing}
            muted={muted}
            volume={volume}
            playbackRate={playbackRate}
            onEnded={() => setPlaying(false)}
          />
        )}

        <Stack className="mt-3" gap={3} direction="horizontal">
          <Button onClick={() => setPlaying(true)}>Play</Button>
          <Button onClick={() => setPlaying(false)}>Pause</Button>
        </Stack>

        <Stack className="mt-3" gap={3} direction="horizontal">
          <Button
            onClick={() =>
              player.current.seekTo(player.current.getCurrentTime() + 10)
            }
          >
            Duration + 10
          </Button>
          <Button
            onClick={() =>
              player.current.seekTo(player.current.getCurrentTime() - 10)
            }
          >
            Duraton - 10
          </Button>
          <Button onClick={() => player.current.seekTo(50)}>
            Duration = 50
          </Button>
        </Stack>

        <Stack className="mt-3" gap={3} direction="horizontal">
          <Button onClick={() => setPlaybackRate(playbackRate + 1)}>
            Speed + 1
          </Button>
          <Button onClick={() => setPlaybackRate(playbackRate - 1)}>
            Speed - 1
          </Button>
          <Button onClick={() => setPlaybackRate(playbackRate + 0.1)}>
            Speed + 0.1
          </Button>
          <Button onClick={() => setPlaybackRate(playbackRate - 0.1)}>
            Speed - 0.1
          </Button>
        </Stack>

        <Stack className="mt-3" gap={3} direction="horizontal">
          <Button onClick={() => setVolume(volume + 0.1)}>Volume + 0.1</Button>
          <Button onClick={() => setVolume(volume - 0.1)}>Volume - 0.1</Button>
          <Button onClick={() => setMuted(true)}>Mute</Button>
          <Button onClick={() => setMuted(false)}>Unmute</Button>
        </Stack>

        <Stack className="mt-3" gap={3} direction="horizontal">
          <Button onClick={() => setSource(sources['sintelTrailer'])}>
            Sintel teaser
          </Button>
          <Button onClick={() => setSource(sources['bunnyTrailer'])}>
            Bunny trailer
          </Button>
          <Button onClick={() => setSource(sources['bunnyMovie'])}>
            Bunny movie
          </Button>
          <Button onClick={() => setSource(sources['test'])}>Test movie</Button>
        </Stack>
      </div>
    </Container>
  );
}

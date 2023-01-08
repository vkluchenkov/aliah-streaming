import styles from '../styles/Home.module.css';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { ClodFLareResponse } from '../src/types';
import { VideoCard } from '../src/components/VideoCard';

const Home: NextPage<ClodFLareResponse> = ({ result, success, errors, messages }) => {
  const videos = result.map((video) => {
    const title = new Date(video.created).toLocaleDateString('pl');

    return <VideoCard key={video.uid} uid={video.uid} thumbnail={video.thumbnail} title={title} />;
  });

  return (
    <>
      {videos.length ? (
        <>
          <h1 className={styles.header}>Recent videos</h1>
          <section className={styles.videos}>{videos}</section>
        </>
      ) : (
        <h3 className={styles.sorry}>No videos found</h3>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cfAccount = process.env.CLOUDFLARE_ACCOUNT!;
  const cfUrl = process.env.CLOUDFLARE_URL!;
  const cfEmail = process.env.CLOUDFLARE_EMAIL!;
  const cfKey = process.env.CLOUDFLARE_KEY!;

  const { data } = await axios.get<ClodFLareResponse>(cfUrl + cfAccount + '/stream', {
    headers: {
      'X-Auth-Email': cfEmail,
      'X-Auth-Key': cfKey,
    },
  });

  return {
    props: { ...data },
  };
};

export default Home;

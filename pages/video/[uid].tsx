import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Stream } from '@cloudflare/stream-react';
import styles from '../../styles/Video.module.css';

const Video: NextPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  return (
    <div className={styles.video__container}>
      <Stream
        width='100%'
        height='100%'
        controls
        responsive={false}
        src={uid as string}
        className={styles.video}
        autoplay
      />
    </div>
  );
};

export default Video;

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

interface CardProps {
  uid: string;
  thumbnail: string;
  title: string;
  isLive: boolean;
}

export const VideoCard: React.FC<CardProps> = ({ uid, thumbnail, title, isLive }) => {
  return (
    <Link href={`/video/${uid}`}>
      <article className={clsx(styles.card, isLive && styles.card_live)}>
        {isLive && <div className={styles.live} />}
        <div className={styles.card__image}>
          <Image src={thumbnail} style={{ objectFit: 'cover' }} fill alt={title} />
        </div>
        <h2 className={styles.card__title}>{title}</h2>
      </article>
    </Link>
  );
};

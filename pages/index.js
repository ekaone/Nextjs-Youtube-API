import Head from "next/head";
import styles from "../styles/Home.module.css";

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

export async function getServerSideProps() {
  const res = await fetch(
    `${YOUTUBE_URL}?part=snippet&playlistId=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_&maxResults=20&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  return {
    props: {
      data
    }
  };
}

export default function Home({ data }) {
  console.log("data: ", data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My{" "}
          <a
            href="https://github.com/ekaone/Nextjs-Youtube-API"
            target="_blank"
          >
            Youtube Playlist API
          </a>
        </h1>

        <ul className={styles.grid}>
          {data.items.map(item => {
            console.log("item: ", item);

            const { id, snippet = {} } = item;
            const { title, thumbnails = {}, resourceId } = snippet;
            const { medium = {} } = thumbnails;
            return (
              <li key={id} className={styles.card}>
                <a
                  href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                  target="_blank"
                >
                  <p>
                    <img
                      width={medium.width}
                      height={medium.height}
                      src={medium.url}
                    />
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Yatra Nepal AI</title>
      </Head>
      <main>
        <h1>Welcome to Yatra Nepal AI</h1>
        <p>Explore Nepal with smart, AI-assisted travel planning.</p>
        <Link href="/assistant">Talk to our AI Travel Assistant</Link>
      </main>
    </div>
  );
}

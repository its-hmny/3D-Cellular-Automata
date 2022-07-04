import Head from 'next/head';

const SEO = () => (
  <Head>
    {/* Browser's tab appearance */}
    <title>3D Cellular Automata</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    {/* General metadata (title, description, author) */}
    <meta name="language" content="English" />
    <meta name="title" content="3D Cellular Automata" />
    <meta name="author" content="Enea Guidi (its-hmny)" />
    <meta
      name="description"
      content="A Three.js webapp to simulate cellular automata in 3D"
    />
    <meta
      name="keywords"
      content="cellular automata,3D,conway,game of life,three.js,react"
    />

    {/* Other metatags */}
    <meta name="robots" content="index, follow" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
  </Head>
);

export default SEO;

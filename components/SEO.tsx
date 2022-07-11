import Head from 'next/head';

import { Metadata } from '../schema/constant';

const SEO = () => (
  <Head>
    {/* Browser's tab appearance */}
    <title>3D Cellular Automata</title>
    <link rel="icon" type="image/x-icon" href="./favicon.ico" />
    <link rel="canonical" href={Metadata.SiteUrl} />

    {/* General metadata (title, description, author) */}
    <meta name="language" content="English" />
    <meta name="title" content={Metadata.Title} />
    <meta name="author" content={Metadata.Author} />
    <meta name="description" content={Metadata.Description} />
    <meta name="keywords" content={Metadata.Keywords.join(',')} />

    {/* Open graph (Facebook) metatags */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={Metadata.Title} />
    <meta property="og:image" content={Metadata.Image} />
    <meta property="og:url" content={Metadata.SiteUrl} />
    <meta property="og:description" content={Metadata.Description} />

    {/* Twitter metatags */}
    <meta name="twitter:image" content={Metadata.Image} />
    <meta name="twitter:title" content={Metadata.Title} />
    <meta name="twitter:site" content={Metadata.SiteUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={Metadata.TwitterHandle} />
    <meta name="twitter:description" content={Metadata.Description} />

    {/* Other metatags */}
    <meta name="robots" content="index, follow" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
  </Head>
);

export default SEO;

import Head from "next/head";
import Layout, { siteTitle } from "../component/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import axios from "axios";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {/* {console.log(allPostsData)} */}
          {/* {allPostsData?.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))} */}
          {allPostsData?.map(({ sha, path }, index) => (
            <li className={utilStyles.listItem} key={sha}>
              {path}
              {/* <br />
              {id}
              <br />
              {date} */}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const response = await axios({
    method: 'get',
    // responseType: 'stream',
    url: "https://gitee.com/api/v5/repos/coffeegirl/test-data/git/trees/master?access_token=acd71d3f8fe43bcf58b556de87dca3fe"
  });


  console.log("111111");
  console.log(response);
  console.log(response.data);

  return {
    props: {
      allPostsData: response.data.tree,
    },
  };
}

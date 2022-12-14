import Layout from "../../component/layout";
import {
  getGitAllId,
  getGitPostData,
  //   getPostData,
  //   getAllPostIds,
} from "../../lib/posts";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData?.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
      <div className={utilStyles.lightText}>{postData?.date}</div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData?.contentHtml }} />
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   // Add the "await" keyword like this:
//   const postData = await getPostData(params.id);
//   return {
//     props: {
//       postData,
//     },
//   };
// }

export async function getStaticPaths() {
  const paths = await getGitAllId();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getGitPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

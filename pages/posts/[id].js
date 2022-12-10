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
  //   useEffect(() => {
  //     getText();
  //   }, []);
  //   const getText = async () => {
  //     const res = await axios({
  //       method: "get",
  //       responseType: "blob",
  //       url: `https://gitee.com/api/v5/repos/coffeegirl/test-data/git/blobs/a19e775723d2471bb6c2bc1fc0d3087f9c80d802?access_token=acd71d3f8fe43bcf58b556de87dca3fe`,
  //     });
  //     console.log(res, "res");
  //     console.log(res.data, typeof res.data, res.data.length, "res data");
  //     const data = await res.data.toString();
  //     console.log(res.data, "res string");
  //   };
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>{postData.date}</div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
//   console.log(postData, "postData");
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
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getGitPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

import Layout from "../../component/layout";
import { getGitAllId, getGitPostData } from "../../lib/posts";
import axios from "axios";

export default function Post({ postData }) {
  return (
    <Layout>
      {postData}
      {/* {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
    </Layout>
  );
}

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
  console.log(postData, "postData");
  return postData;
  // return {
  //     props: {
  //         postData,
  //     },
  // };
}

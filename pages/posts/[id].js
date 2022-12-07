import Layout from '../../component/layout';
// import { getAllPostIds, getPostData } from '../../lib/posts';
import axios from "axios";
import matter from "gray-matter";
import { remark } from 'remark';
import html from 'remark-html';


export default function Post({ postData }) {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    );
}

export async function getStaticPaths() {
    // const paths = getAllPostIds();

    const response = await axios({
        method: 'get',
        // responseType: 'stream',
        url: "https://gitee.com/api/v5/repos/coffeegirl/test-data/git/trees/master?access_token=acd71d3f8fe43bcf58b556de87dca3fe"
    });

    const paths = response.data.tree.map((ele) => {
        return {
            params: {
                // id: ele.path.replace(/\.md$/, ''),
                id: ele.sha
                // sha: ele.sha
            },
        }
    })
    console.log(paths);


    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    console.log(params.id, 'params');
    // const postData = await getPostData(params.sha);
    const res = await axios({
        method: 'get',
        // responseType: 'stream',
        url: `https://gitee.com/api/v5/repos/coffeegirl/test-data/git/blobs/${params.id}?access_token=acd71d3f8fe43bcf58b556de87dca3fe`
    });
    // return {
    //     props: {
    //         postData,
    //     },
    // };
}
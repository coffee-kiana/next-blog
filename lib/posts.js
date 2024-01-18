// import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import axios from "axios";
import { log } from "console";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export async function getGitTreeData() {
  const response = await axios({
    method: "get",
    url: "https://gitee.com/api/v5/repos/coffeegirl/test-data/git/trees/master?access_token=填入gitee的token",
  });
  return response.data.tree;
}

export async function getGitAllId() {
  const response = await axios({
    method: "get",
    url: "https://gitee.com/api/v5/repos/coffeegirl/test-data/git/trees/master?access_token=填入gitee的token",
  });

  const paths = response.data.tree.map((ele) => {
    return {
      params: {
        id: ele.sha,
        name: ele.path,
      },
    };
  });
  return paths;
}

export async function getGitPostData(params) {
  //   console.log(params, "params");

  const res = await axios({
    method: "get",
    responseType: "blob",
    url: `https://gitee.com/api/v5/repos/coffeegirl/test-data/git/blobs/${params}?access_token=填入gitee的token`,
  });
  const fileJSON = JSON.parse(res.data);
  const fileBlob = fileJSON.content;
  //获取到的blob用base64解码
  const fileContents = Buffer.from(fileBlob, "base64").toString();
  //markdown转换html
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  // Combine the data with the id and contentHtml
  return {
    id: params,
    contentHtml,
    ...matterResult.data,
  };
}

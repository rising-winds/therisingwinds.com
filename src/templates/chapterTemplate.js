import React from 'react';
import {graphql} from 'gatsby';

export default function Template({
  data,
}) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  console.info(frontmatter);
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.parent}</h2>
        <p>{frontmatter.chapterRank}</p>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export const chapterQuery = graphql`
  query ChapterById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        parent
        chapterRank
      }
    }
  }
`;
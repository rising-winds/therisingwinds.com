const {graphql} = require('gatsby');
const path = require('path');
const moment = require('moment');

const slugify = (field) => field.replace(/\s/g, "-").toLowerCase();

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve('src/templates/blogTemplate.js');
  const chapterTemplate = path.resolve('src/templates/chapterTemplate.js');

  return graphql(`
    {
      blogPosts: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/(blog)\/.*\.md$/"}}
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              date
              title
            }
          }
        }
      }
      chapters: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/(chapters)\/.*\.md$/"}}
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              parent
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const {blogPosts, chapters} = result.data;
    blogPosts.edges.forEach(({ node }) => {
      createPage({
        path: `/blog/${moment(node.frontmatter.date).format('YYYY/MM/DD')}/${slugify(node.frontmatter.title)}`,
        component: blogPostTemplate,
        context: {
          id: node.id
        },
      });
    });


    // Reduce Chapters to break apart by frontmatter parent.
    
    
    chapters.edges.forEach(({ node }) => {
      const parent = node.frontmatter.parent;
      const title = node.frontmatter.title;
      createPage({
        path: `/chapters/${parent ? `${slugify(parent)}/` : ''}${slugify(title)}`,
        component: chapterTemplate,
        context: {
          id: node.id
        },
      });
    });

  });
};
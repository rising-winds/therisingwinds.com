const path = require('path');
const moment = require('moment');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve('src/templates/blogTemplate.js');

  return graphql(`
    {
      blogPosts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.blogPosts.edges.forEach(({ node }) => {
      createPage({
        path: `/blog/${moment(node.frontmatter.date).format('YYYY/MM/DD')}/${node.frontmatter.title.replace(/\s/g, "-").toLowerCase()}`,
        component: blogPostTemplate,
        context: {
          id: node.id
        },
      });
    });
  });
};
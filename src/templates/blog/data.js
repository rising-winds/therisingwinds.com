import path from 'path';
import moment from 'moment';

const template = path.resolve("src/templates/blog/template.jsx");

const generateBlogPages = (createPage, graphql, slugify) => {
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
        }
    `).then(result => {
        
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        const {blogPosts} = result.data;
        
        blogPosts.edges.forEach(({ node }) => {
            createPage({
                path: `/blog/${moment(node.frontmatter.date).format('YYYY/MM/DD')}/${slugify(node.frontmatter.title)}`,
                component: template,
                context: {
                    id: node.id
                }
            });
        });

    })
}

export default generateBlogPages;
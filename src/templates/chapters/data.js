import path from 'path';

const template = path.resolve("src/templates/chapters/template.jsx");

const generateChapterPages = (createPage, graphql, slugify) => {
    return graphql(`
        {
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

        const {chapters} = result.data;

        chapters.edges.forEach(({ node }) => {
            const parent = node.frontmatter.parent;
            const title = node.frontmatter.title;
            createPage({
                path: `/chapters/${parent ? `${slugify(parent)}/` : ''}${slugify(title)}`,
                component: template,
                context: {
                    id: node.id
                },
            });
        });

    })
}

export default generateChapterPages;
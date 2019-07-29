import path from 'path';
import moment from 'moment';

import createBlogPages from './src/templates/blog/data.js';
import createChapterPages from './src/templates/chapters/data.js';

const slugify = (field) => field.replace(/\s/g, "-").toLowerCase();

exports.createPages = ({ actions, graphql}) => {
    const { createPage } = actions;

    return Promise.all([
        createBlogPages(createPage, graphql, slugify),
        createChapterPages(createPage, graphql, slugify)
    ])

};


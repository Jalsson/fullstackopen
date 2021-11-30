const dummy = (blogs) => {
    return 1
}


const _ = require('lodash');

const totalLikes = (blogs) => {
    blogLikes = 0
    blogs.map((blog) => blogLikes += blog.likes)
    return blogLikes
}

const favoriteBlog = (blogs) => {
    return blogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))[0];

}

const mostBlogs = (blogs) => {
    const authors = _.countBy(blogs, 'author');
    // Create items array
    const authorArray = Object.keys(authors).map(function (key) {
        return [key, authors[key]];
    });
    const mostBlogAuthor = authorArray.sort((a, b) => (a < b) ? 1 : ((b < a) ? -1 : 0))[0];
    return {
        "author": mostBlogAuthor[0],
        "blogs": mostBlogAuthor[1]
    }

}

const mostLikes = (blogs) => {
    
    const authors = _(blogs)
        .groupBy('author')
        .map((blog, likes) => ({
            author: blog[0].author,
            likes: _.sumBy(blog, 'likes')
        }))
        .value()[0]
    // Create items array
    const authorArray = Object.keys(authors).map(function (key) {
        return [key, authors[key]];
    });
    const mostBlogAuthor = authorArray.sort((a, b) => (a < b) ? 1 : ((b < a) ? -1 : 0))[0];
    return authors

}



module.exports = {
    dummy, totalLikes, favoriteBlog: favoriteBlog, mostBlogs, mostLikes
}


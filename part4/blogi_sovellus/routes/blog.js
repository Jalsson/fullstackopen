const express = require("express")
const router = express.Router()
const fs = require('fs')
const mongoose = require('mongoose')
const password = require('../secret')
const uniqueValidator = require('mongoose-unique-validator')
const listHelper = require('../utils/list_helper')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
// Ensure virtual fields are serialised.
blogSchema.set('toJSON', {
    virtuals: true
})

const Blog = mongoose.model('Blog', blogSchema)

router.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

router.post('/', async (request, response) => {
    const body = request.body

    if (body.title == undefined || body.url == undefined) {
        response.status(400).send({error: 'Either title or url is missing'})
        return
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes | 0
    })

    const result = await blog
        .save()
    response.status(201).json(result)
})

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
        context: "query",
    })

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        return response.status(404).end()
    }
})

router.delete("/:id", async (req, res, next) => {
    const id = req.params.id
    await Blog.deleteOne({_id: id})
    res.sendStatus(200)
})


module.exports = router
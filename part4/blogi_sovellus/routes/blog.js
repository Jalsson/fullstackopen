const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose')
const password = require('../secret')
const uniqueValidator = require('mongoose-unique-validator');
const listHelper = require('../utils/list_helper')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

router.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

router.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})


module.exports = router;
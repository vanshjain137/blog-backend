const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Blog = require('../model/blog');
const Comment = require('../model/comment');
const checkAdmin = require('../middleware/checkAdmin');

//post blog by admin
router.post('/',checkAdmin,(req,res)=>{
    const newBlog = new Blog({
        _id: new mongoose.Types.ObjectId,
        title:req.body.title,
        category:req.body.category,
        description:req.body.description,
        imageUrl:req.body.imageUrl
    })
    newBlog.save()
    .then(result=>{
        res.status(200).json({
            new_blog:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//get all blogs
router.get('/',(req,res)=>{
    Blog.find()
    .select('_id title category description imageUrl')
    .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//get blog by id
router.get('/:id',(req,res)=>{
    Blog.findById({_id:req.params.id})
    .select('_id title category description imageUrl')
    .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//get blog by category
router.get('/category/:category',(req,res)=>{
    Blog.find({category:req.params.category})
    .select('_id title category description imageUrl')
    .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//delete blog by id
router.delete('/:id', checkAdmin, async (req, res) => {
  try {
    const blogId = req.params.id;

    await Comment.deleteMany({ blogId: blogId });

    const result = await Blog.deleteOne({ _id: blogId });

    res.status(200).json({
      message: "Blog and its comments deleted successfully",
      deletedBlog: result
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

//update blog
router.put('/:id',checkAdmin,(req,res)=>{
    Blog.updateOne({_id:req.params.id},req.body)
    .then(result=>{
        res.status(200).json({
            updatedData:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//count all blogs
router.get('/get/count',(req,res)=>{
    Blog.find().countDocuments()
    .then(result=>{
        res.status(200).json({
            total:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//return n latest blog
router.get('/latest-post/:n',(req,res)=>{
    Blog.find().sort({$natural : -1}).limit(req.params.n)
    .then(result=>{
        res.status(200).json({
            Blog:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;
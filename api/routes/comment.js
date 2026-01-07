const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../model/comment');
const checkAuth = require('../middleware/checkAuth');

//post new comment
router.post('/',checkAuth,(req,res)=>{
    const newComment = new Comment({
        _id: new mongoose.Types.ObjectId,
        email:req.body.email,
        commentText:req.body.commentText,
        blogId:req.body.blogId
    })
    newComment.save()
    .then(result=>{
        res.status(200).json({
            new_Comment:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//get all comment
router.get('/',(req,res)=>{
    Comment.find()
    .select('_id email commentText blogId timestamp')
    .then(result=>{
        res.status(200).json({
            comments:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


//delete comment by id
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const isOwner = comment.email === req.userData.email;
        const isAdmin = req.userData.userType === 'admin';

        if (isOwner || isAdmin) {
            await Comment.deleteOne({ _id: req.params.id });
            return res.status(200).json({ message: "Comment deleted successfully" });
        }

        // If neither, block the action
        return res.status(403).json({
            message: "Permission denied. Only the owner or an admin can delete this."
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get all comments of a blog by id
router.get('/:blogId', (req, res) => {
    Comment.find({ blogId: req.params.blogId })
    .then(result => {
        res.status(200).json({ comments: result });
    })
    .catch(err => res.status(500).json({ error: err }));
});


//count all comment of any blog
router.get('/get/count/:blogId',(req,res)=>{
    Comment.find({blogId:req.params.blogId}).countDocuments()
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


module.exports = router;
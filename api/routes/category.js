const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../model/category');
const checkAdmin = require('../middleware/checkAdmin');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//post category by admin
router.post('/',checkAdmin,(req,res)=>{
    const newCategory = new Category({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        imageUrl:req.body.imageUrl,
        publicId: req.body.publicId
    })
    newCategory.save()
    .then(result=>{
        res.status(200).json({
            new_category:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//get all category
router.get('/',(req,res)=>{
    Category.find()
    .select('_id name imageUrl publicId')
    .then(result=>{
        res.status(200).json({
            category:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


//delete category by id
router.delete('/:id',checkAdmin, async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    if (category.publicId) {
      await cloudinary.uploader.destroy(category.publicId);
    }

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      message: "Successfully deleted both image and category data"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error during deletion" });
  }
});

//update category
router.put('/:id',checkAdmin, async (req, res) => {
    try {
        const oldCategory = await Category.findById(req.params.id);
       
        if (req.body.publicId && oldCategory.publicId && req.body.publicId !== oldCategory.publicId) {
            await cloudinary.uploader.destroy(oldCategory.publicId);
        }

        const result = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ updatedData: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

//return n latest category
router.get('/latest-category/:n',(req,res)=>{
    Category.find().sort({$natural : -1}).limit(req.params.n)
    .then(result=>{
        res.status(200).json({
            Category:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//count all category
router.get('/get/count',(req,res)=>{
    Category.find().countDocuments()
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
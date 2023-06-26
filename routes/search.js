const express = require('express');

const router=express.Router();
const path=require('path');
const rootDir=require('../util/path');
const bodyParser = require('body-parser');

const urlModel=require('../models/urlModel');

const searchData=[];

router.get('/search' , (req,res)=>{
    res.render(path.join(rootDir, 'views/search.pug') , {urlData: searchData});
});

router.post("/search" , (req,res)=>{

    let requested = req.body.search;
    console.log(requested);
    async function searcher(requested){
        const data = await urlModel.find({$or : [{fullname : requested} , {note : requested} ]} );
        data.forEach(element => {
            searchData.push(element);
        });
    }
    searcher(requested);
    res.render(path.join(rootDir, 'views/search.pug') , {urlData: searchData});
    

});

module.exports = router;
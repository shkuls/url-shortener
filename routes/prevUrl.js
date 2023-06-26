const express = require('express');

const router=express.Router();
const path=require('path');
const rootDir=require('../util/path');
const bodyParser = require('body-parser');

const urlModel=require('../models/urlModel');

router.get("/prevUrl" , (req,res)=>{
    const prevData=[];
    async function loader(){
        const data= await urlModel.find({});
        data.forEach(element => {
            prevData.push(element);
        });
        //res.send(prevData);
        res.render(path.join(rootDir, 'views/prevUrls.pug') , {urlData: prevData});
    }
    loader();
});

module.exports=router;

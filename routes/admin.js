
const { v4: uuidv4 } = require('uuid');
const express = require('express');

const router=express.Router();
const path=require('path');
const rootDir=require('../util/path');
const bodyParser = require('body-parser');
const connectDB=require('../util/connect');
const urlModel=require('../models/urlModel');
const validUrl = require('valid-url');
require('dotenv').config()//dotenv setup



const show=[];

connectDB(process.env.MONGO_URI);

async function searchDuplicate(LongUrl){

    const data=await urlModel.find({fullname : LongUrl});
    var check=false;
    var shortId = uuidv4().slice(1,10);
    if(data[0] != null)
        if(data[0]._id != null){
        check=true;
        shortId=data[0].shortname;
        }
    
    
    return [check , shortId]
}

async function addUrl(LongUrl , inputNote){
    var duplicateResults= await searchDuplicate(LongUrl);
    //console.log(duplicateResults);
    const testUrl={fullname : LongUrl , shortname : duplicateResults[1] , note : inputNote};
    const newUrl=new urlModel(testUrl);
    
    show.push(testUrl);
    if(duplicateResults[0] == false)
        newUrl.save();
    
}


const pug=require('pug');

router.use(bodyParser.urlencoded({extended:false}));

router.get('/' , (req,res) =>
{
       res.render(path.join(rootDir , 'views/main.pug') , {urlData:show});
});

router.post('/', async (req,res)=>
{  
    if (validUrl.isUri(req.body.inputUrl)){
        console.log('Looks like an URI');
        //console.log(req.body);
        await addUrl(req.body.inputUrl , req.body.note);
        //console.log(show);
        res.render(path.join(rootDir , 'views/main.pug') , {urlData:show} );
        //console.log("saved");
    }
    else{

        res.render(path.join(rootDir , 'views/main.pug') , {errMsg:"Please Enter A Valid URL!" , urlData : show });
    } 
});

router.get(`/srt/:shrtID` , (req,res)=>{


   var shortId=req.params.shrtID;
   //console.log(shortId)
   async function finder(){
       var data = await urlModel.find({'shortname' : shortId});
       //console.log(data[0].clicks)
       res.redirect(data[0].fullname);       
   }
   finder();
});

module.exports=router;

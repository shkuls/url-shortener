const mongoose=require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        fullname : {
            type : String , 
            
            default : "",
        } , 
        shortname : {
            type : String , 
         
            default : "",
        } , 

        note :  {
            type : String, 
            default : "--",
        }

    }
);

const url = mongoose.model('url' , urlSchema);

module.exports=url;
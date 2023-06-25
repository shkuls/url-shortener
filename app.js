const express=require('express');
const app=express();
const adminRoutes=require('./routes/admin');
const prevRoutes=require('./routes/prevUrl');
const rootDir=require('./util/path');
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine' , 'pug' );
app.use(adminRoutes);
app.use(prevRoutes);

app.listen(80, ()=>{
    console.log("listening on port 3000")
});
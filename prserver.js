const { urlencoded } = require("express");
var abc=require("express");
var fileuploader=require("express-fileupload");
var mysql=require("mysql");
var multiparty=require("multiparty");
var app=abc();

app.use(abc.static("public"));
app.listen(2006,function()
{
    console.log("SERVER STARTED");
})
app.get("/",function(req,resp)
{
    var purapath=process.cwd()+"/public/index.html";
    resp.sendFile(purapath);
})  
app.get("/admin",function(req,resp)
{
    var purapath=process.cwd()+"/public/admin-panel.html";
    resp.sendFile(purapath);
})  
 
app.use(abc.static("public"));
var dbConfiguration={
    host:"localhost",
    user:"root",
    password:"",
    database:"project"
}
var refdb=mysql.createConnection(dbConfiguration);
refdb.connect(function(err)
{
    if(err)
    console.log(err);
    else
    console.log("connected");
})
//=================================================================================================================================
app.get("/chksignup",function(req,resp)
{
    
    console.log("heyy");
    console.log(req.query);
    var dataAry=[req.query.email,req.query.pwd,req.query.utype,1];
    console.log(dataAry);
    refdb.query("insert into users values(?,?,?,?)",dataAry,function(err,result)
    {
        if(err)
        {
            console.log(err);
            resp.send(err);
        }
        else
        {
            console.log(result);
            resp.send(result);

        }
    })
})
//===============================================================================================================================================
app.get("/updrec",function(req,resp){

    var ary=[req.query.email,req.query.pwd];
    var ary2=[req.query.newpwd,req.query.email];
    console.log(req.query.newpwd);
    refdb.query("select * from users where email=? and pwd=?",ary,function(err,result)
    {
        if(err)
        resp.send(err);
        else
        if(result.length==1)
        {
            refdb.query("update  users set pwd =? where email=? ",ary2, function (err,result){
                if (err) 
                {
                    resp.send(err);
                    
                }
                else
                 {
                    //console.log("hh");
                    resp.send("Password Successfully updated!!");
                }
               
            });

        }
        else
       resp.send("Invalid Old Password");
    })
   

});
//=================================================================================================================================================
app.get("/chkloginKuch",function(req,resp)
{
    console.log(req.query.emaillogin);
    //0/1 records
       refdb.query("select * from users where email=? and status=1",[req.query.emaillogin],function(err,result)
       {
            if(err)
                resp.send(err);
                else
                {
                    console.log(result);
             resp.send(result);
           
                }
             
       })
})
app.use(fileuploader());
app.use(abc.urlencoded('extended:true'));
//=================================================================================================================================================
app.post("/profile-save",function(req,resp)
{
    console.log(req.body.email);
    var fname=req.body.email+"-"+req.files.profilepic.name;
    var gname=req.body.email+"-"+req.files.proofpic.name;
    var des=process.cwd()+"/public/uploads/"+fname;
    req.files.profilepic.mv(des,function(err){
            if(err)
                console.log(err);
            else
                console.log("Uploaded");
    })
    var des=process.cwd()+"/public/uploads/"+gname;
    req.files.proofpic.mv(des,function(err){
            if(err)
                console.log(err);
            else
                console.log("Uploaded");
    })
    var dataAry1=[req.body.email,req.body.name,req.body.mobile,req.body.address,req.body.city,req.body.prooftype,req.body.timings,gname,fname];
    refdb.query("insert into dprofile values(?,?,?,?,?,?,?,?,?)",dataAry1,function(err,result)
    {
        if(err)
            resp.send(err);
        else
            resp.send("Inserted Successfully");
})

})
//============================================================================================================================================
app.post("/profile-list",function(req,resp)
{
    console.log("helloo");
    var mname=req.body.email+"-"+req.files.pic.name;
    var des=process.cwd()+"/public/uploads/"+mname;
    req.files.pic.mv(des,function(err){
            if(err)
                console.log(err);
            else
                console.log("Uploaded");
    })
   
    var dataAry2=[req.body.email,req.body.medicine,req.body.packing,req.body.qty,req.body.expdate,req.body.company,mname,req.body.description];
    refdb.query("insert into medicines values(?,?,?,?,?,?,?,?,current_date())",dataAry2,function(err,result)
    {
        if(err)
            resp.send(err);
        else
            resp.send("Medicine listed");
    })
})
//=======================================================================================================================================
app.post("/profile-update",function(req,resp)
{
    console.log(req.body.hdn);
    // var fname=req.body.email+"-"+req.files.profilepic.name;
    var gname;
    var fname;
    if(req.files!=null)
    {
        if(req.files.profilepic!=null)
    {
        console.log("profile pic change");
     fname=req.body.email+"-"+req.files.profilepic.name;
    var des=process.cwd()+"/public/uploads/"+fname;
    req.files.profilepic.mv(des,function(err){
            if(err)
                console.log(err);
            else
                console.log("congoo");
    })
    }
  else
    fname=req.body.hdn;
  //  var gname=req.body.email+"-"+req.files.proofpic.name;
  if(req.files.proofpic!=null)
  {
    console.log("proof pic change");
   gname=req.body.email+"-"+req.files.proofpic.name;
   console.log("**************"+gname+"********");
  var des=process.cwd()+"/public/uploads/"+gname;
  req.files.proofpic.mv(des,function(err){
          if(err)
              console.log(err);
          else
              console.log("congoo");
  })
  }
else
  gname=req.body.hdn1;
    }
    else
    {
        fname=req.body.hdn;
        gname=req.body.hdn1;
    }
    var dataAry3=[req.body.name,req.body.address,req.body.mobile,req.body.city,req.body.prooftype,req.body.timings,gname,fname,req.body.email];
    console.log(dataAry3);
    refdb.query("update dprofile set name=?,address=?,mobile=?,city=?,prooftype=?,timings=?,proofpic=?,profilepic=? where email=?",dataAry3,function(err,result)
    {
        if(err)
            {
                console.log(err);
            }
        else
            {
                console.log(result);
                resp.send("Updated Successfully");
            }
})

})


//===========================================================================================================================================
app.get("/getProfileObject",function(req,resp)
{
    console.log("hqw");
    console.log(req.query.email);
    refdb.query("select * from dprofile where email=?",[req.query.email],function(err,resultAryOfObjects)
    {
         if(err)
             {
                console.log(err);
                resp.send(err);
             }
            
         else
            {
                console.log(resultAryOfObjects);
                resp.send(resultAryOfObjects);;
            }
    })
})
//==========================================================================================================================================
app.get("/fetchusers",function(req,resp)
{
    refdb.query("select * from users",function(err,resultAryOfObjects)
    {
        if(err)
        resp.send(err);
       
              else
        resp.send(resultAryOfObjects);

    })
})
//==========================================================================================================================================
app.get("/profile-block-angular",function(req,res)
{                                //table col name
    refdb.query("update users set status=1 where email=?",[req.query.emailidX],function(err,result){
            if(err)
                res.send(err);
            
            else
                res.send("Record Updated Successfulllllyyyyy.... Badhaiiiii");
    })
})

//==============================================================================================================================================
app.get("/profile-resume-angular",function(req,res)
{                                //table col name
    refdb.query("update users set status=0 where email=?",[req.query.emailidX],function(err,result){
            if(err)
                res.send(err);
            
            else
                res.send("Record Updated Successfulllllyyyyy.... Badhaiiiii");
    })
})
//===================================================================
app.all("/fetchdonors",function(req,resp)
{
    refdb.query("select * from dprofile",function(err,resultAryOfObjects)
    {
        if(err)
        resp.send(err);
       
              else
        resp.send(resultAryOfObjects);

    })
})
//===========================================================================================================
app.all("/dprofile-delete-angular",function(req,res)
{
    refdb.query("delete from dprofile where email=?",[req.query.emailidX],function(err,result){
        if(err)
            res.send(err);
        else
        if(result.affectedRows==0)
        res.send("Invalid Id");
        else
            res.send("Record Deleted Successfulllllyyyyy.... Badhaiiiii");
})
})
//===========================================================================================================
app.get("/fetchAllCities",function(req,resp)
{
    refdb.query("select distinct city from dprofile ",function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);;
    })

})
//===============================================================================================================
app.get("/fetchAllMedic",function(req,resp)
{
    
 
console.log(req.query.cityx);
    refdb.query("select medicine from medicines inner join dprofile on medicines.email =dprofile.email where dprofile.city=?",[req.query.cityx],function(err,result){
      //console.log(result);
        if(err)
        {
             resp.send(err);
             console.log(err);
        }
        else{
        console.log(result);
             resp.send(result);
        }

    })
})
//==================================================================================================================
app.get("/fetchSomeMedRecords",function(req,resp)
{
    refdb.query("select * from medicines where medicine=? ",[req.query.medx],function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);;
    })

})
//=====================================================================================================================
app.get("/fetchalldetails",function(req,resp)
{
    
    refdb.query("select * from dprofile where email=?",[req.query.emailidX],function(err,result){
        if(err)
        {
            resp.send(err);
            console.log(err);
        }
        else
        if(result.affectedRows==0)
        resp.send("Invalid Id");
        else
        {
            resp.send(result);
            console.log(result);
        }
})
})
//====================================================================================================================
app.get("/fetchallmed",function(req,resp)
{
    console.log(req.query);
    refdb.query("select medicine from medicines where email=?",[req.query.email],function(err,result){
        if(err)
        {
            resp.send(err);
            console.log(err);
        }
        else
       {
        if(result.affectedRows==0)
        resp.send("Invalid Id");
        else
        {
            resp.send(result);
            console.log(result);
        }
       }
    })
})
//=============================================================================================================================================app.all("/dprofile-delete-angular",function(req,res)
app.all("/doUnlist",function(req,res)
{
    refdb.query("delete medicine from  medicines where email=?",[req.query.emailidX],function(err,result){
        if(err)
            res.send(err);
        else
        if(result.affectedRows==0)
        res.send("Invalid Id");
        else
            res.send("Record Deleted Successfulllllyyyyy");
        })
})
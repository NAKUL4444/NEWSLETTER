const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.use(express.static("public"));

// --data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \

app.post("/",function(req,res){
const eMail=(req.body.email);
const fName=(req.body.fname);
const lName=(req.body.lname);

const data={

members:[
   
    {
    email_address:eMail,
    status:"subscribed",
    merge_fields:{
    FNAME:fName,
    LNAME:lName
    }
    }

]

};

const jsonData=JSON.stringify(data); 
const url="https://us10.api.mailchimp.com/3.0/lists/591e0163d8";
const options={
method: "POST",
auth:"Na:9cd205746979650ba0ef904ee943d1fa-us10"
}
const request=https.request(url,options,function(response){

if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
}
else{
        res.sendFile(__dirname+"/failure.html");
}
response.on("data",function(data){
console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
console.log("server start");
});

// 80b808473b0d7419b22d2b56c90dffbc-us10 key
// f436632fca id
const express= require ("express");
const app = express();
const bp = require ("body-parser");
const request = require ("request");
const https = require("https");

app.use(express.static(__dirname + '/Bootstrap'));
app.use(bp.urlencoded({ extended: true }));

app.get("/",function(req,res){ 
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

    const firstName= req.body.firstName;
    const lastName= req.body.lastName;
    const email= req.body.email;

    const data={

        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:
                {
                    FNAME: firstName,
	                LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/94d74c1d60";
    const options = {
        method:'POST',
        auth:"parth:60183f7516877a88d74c62a8ed0fcd69-us6"
    }

    const request = https.request(url,options,function(response)
    {
        // response.on("data", function(data){
        //     const responseData = JSON.parse(data);
        if(response.statusCode === 200)
        {
            
                // // if(responseData.new_members==="{}"){
                // //     console.log(responseData.new_members[]);
                // //     res.sendFile(__dirname+"/failure.html");
                // // }
                // // else{
                //     console.log(responseData.new_members[]);
                    res.sendFile(__dirname+"/success.html");
                
            
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
            
        }
        
        
        })
    

    request.write(jsonData);
    request.end();
 
    // res.send("Hi"+firstName+lastName+" "+email);
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Listening on port 3000");
})

// API KEY - 60183f7516877a88d74c62a8ed0fcd69-us6 
// AudienceId - 94d74c1d60
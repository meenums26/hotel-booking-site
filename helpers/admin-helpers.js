var db=require('../config/connection')
var collection=require('../config/collection')
const bcrypt = require('bcrypt')
var generator = require('generate-password');
var nodemailer = require('nodemailer');

module.exports={
    doLogin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let admin=await db.get().collection(collection.USER_COLLECTION).findOne({username:adminData.username})
            let password=await db.get().collection(collection.USER_COLLECTION).findOne({password:adminData.password})
            if(admin){
                   if(password){
                    loginStatus =true
                   }
                    if(loginStatus){
                        console.log('login success')
                        response.admin=admin
                        console.log("response:",response.admin)
                        response.status=true
                        resolve(response)
                    }
                    else{
                        console.log("login failed")
                        resolve({status:false})
                    }
                
            }else{
                console.log("user not find")
                resolve({status:false})
            }
        })
    },
    addHotel:(hotelData)=>{
        console.log("hotelData:",hotelData)
        
        return new Promise(async(resolve,reject)=>{
            var password = await generator.generate({
                length: 10,
                numbers: true
            });
            hotelData.password = await bcrypt.hash(password,10);
        db.get().collection('hotels').insertOne(hotelData).then((data)=>{
            console.log("pass inside dbset :",password)
            resolve({hotelData :data.ops[0],pass:password})
        }).catch((err)=>{
            console.log("Error:",err)
        })
    })
    },
    sendMail:(reciever)=>{
        console.log("reciever:",reciever.hotelData)
        console.log("password:",reciever.pass)
        responseData={}
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:'meenumsmav@gmail.com',
                pass:'12#Uneem'
            },
            tls: { rejectUnauthorized: false }
        });
            var mailOptions = {
                from : 'meenumsmav@gmail.com',
                to : reciever.hotelData.email,
                subject : 'From Travelex',
                text:"Thank you for registering!Your Hotel is added successfully.Your username : "+reciever.user+" and password : "+reciever.pass+". You can use this username and password to enter into your account.Don't share it with anypone. with regards, Travelex"
            }
            transporter.sendMail(mailOptions,function(error,info){
                if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent:' + info.response);
                    responseData.message = "Hotel registered successfully!"
                    console.log(responseData.message)
                  }
            })
    },
    getAllHotels:()=>{
        return new Promise(async(resolve,reject)=>{
            let hotels=await db.get().collection(collection.HOTEL_COLLECTION).find().toArray()
            resolve(hotels)
        })
    },

}
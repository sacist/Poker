const mongoose=require('mongoose')

const counterSchema=new mongoose.Schema({
    id:{type:String,required:true},
    seq:{type:Number,default:1}
})

const Counter=mongoose.model('Counter',counterSchema)
module.exports=Counter
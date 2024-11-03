const mongoose = require ('mongoose')


const tableSchema=new mongoose.Schema({
    tableId:{type:Number,required:true,unique:true},
    currentPlayers:{type:Array,default:[]},
    blind:{type:Number,default:0},
    ante:{type:Number,default:0},
    flop:{type:Array,default:[]},
    turn:{type:Array,default:[]},
    river:{type:Array,default:[]},
    playerHands:{type:Object,default:{

    }},
    deck:{type:Array,default:[]},
    pot:{type:Number,deafault:0},
    gameStarted:{type:Boolean,default:false},
})  


const Table=mongoose.model('table',tableSchema)
module.exports=Table
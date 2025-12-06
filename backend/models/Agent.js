
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
    {
        agentName : {
            type : String,
            required : true
        },
        agencyName : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        phoneNo : {
            type : String,
            required : true
        },
        address : {
            type : String,
            required : true
        }
        
    }, {timestamps : true}
)

const Agent = mongoose.model("Agent",agentSchema);
export default Agent;
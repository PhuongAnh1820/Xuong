import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        requied: true,
        lowercase: true // chuyển tất cả chữ sang chữ thường
    },
    slug:{
        type: true,
        unique: true // gia tri duy nhat
    },
    category:{
        type: mongoose.Schema.Types.ObjectId, // lưu trữ các giá trị ID
        ref:"Category", //tham chiếu giữa mô hình hiên tại và mô hình khác có tên là category
        required: true
    },
    price:{
        type: Number,
        required: true,
        default: 0 // mac dinh la 0
    },
    image:{
        type: String,
    },
    gallergy:{
        type:Array,
    },
    description:{
        type: String
    },
    discount:{
        type: String
    },
    countInStock:{
        type:Number,
        default: 0
    },
    featured:{
        type: Boolean,
        default: false,
    },
    tag:{
        type: Array,
    },
    attributes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Attributes"
        }
    ],
    timestamps:true,versionKey:false


})

productSchema.plugin(mongoosePaginate)
export default mongoose.model("Product",productSchema)
 
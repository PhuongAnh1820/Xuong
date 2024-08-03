import { StatusCodes } from "http-status-codes";
import Product from "../models/product"

//thêm sản phẩm
export const create = async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        return res.status(StatusCodes.OK).json(product)
        
      }catch(error){
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
  
      }
}


// lấy danh sách sản phẩm
export const getAllProducts = async(req,res)=>{
    try{
        

    }catch(error){
    }
}
// lấy sản phẩm theo id
// xóa sản phẩm
// sửa sản phẩm 
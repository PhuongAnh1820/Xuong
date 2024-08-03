import category from "../models/category"
import StatusCode from 'http-status-codes'
import slugify from 'slugify';
import product from "../models/product";
import category from "../models/category";
import category from "../models/category";


// tạo danh mục
export const create = async (req, res)=>{
    try{

        
        const categoy = await category.create({
            name: req.body.name,  
            slug: slugify(req.body.name,"-") // chuyển chuỗi thành kí tự
        })

        // Statuscode : làm việc với các mã trạng thái http
        // npm i http-status-codes
        return res.status(StatusCode.CREATED).json(categoy) // CREATED: thông báo tạo thành công

    }catch(error){
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})
       
    }
}



// lấy danh sách danh mục
export const getAll = async(req,res)=>{
    try{

        const categories = await category.find({}); //thực hiện truy vấn lấy danh sách danh mục
        if(categories.length === 0){  // nếu kh có danh mục nào 
            return res.status(StatusCode.NOT_FOUND).json({message:"Không có danh mục nào ?"})
        }
        return res.status(StatusCode.OK).json(categories)

    }catch(error){
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})

    }
}

// lấy danh mục theo id 
export const getCategoryById = async(res,req) =>{
    try{
        const products = await product.find({category:req.params.id}) // tìm sản phẩm có danh mục cần tìm
        const category = await category.findById(req.params.id)  // tìm danh mục trudng với id trùng
        if(category.length === 0){
            return res.status(StatusCode.NOT_FOUND).json({message:"Khong tim thay san pham nao"})
        }

        return res.status(StatusCode.OK).json({category,products})
        

    }catch(error){
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})

    }
}

// xóa danh mục
export const deleteCategoryById = async(req,res)=>{
    try{
      const category = await category.findByIdAndDelete(req.params.id) // tìm danh mục có id ? 
      return res.status(StatusCode.OK).json({category})
      
    }catch(error){
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})

    }
}

// update danh mục

export const updateCategoryById = async(req,res)=>{
    try{
        const category = await category.findByIdAndUpdate(req.params.id,req.body,{new:true}) // lấy danh sách, sửa thân, tạo mới
        return res.status(StatusCode.OK).json({category})
        
      }catch(error){
          return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error})
  
      }
}

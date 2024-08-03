import instance from "@/configs/axios"
import { Loading3QuartersOutlined, RollbackOutlined } from "@ant-design/icons"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Checkbox, Form, Input, message, Select, Skeleton } from "antd"
import TextArea from "antd/es/input/TextArea"
import { FormProps} from "react-hook-form"
import { Link, useParams } from "react-router-dom"

type FieldType = {
  
    name: string
    categoryId?: string
    price?: number,
    image:string,

    description?: string
    discount?: number
    featured?: boolean
    quantity?: number
}
const ProductEditPage = () =>{
    const {id} = useParams()
    const [messageApi, contextHolder] = message.useMessage()
   const querryClient = useQueryClient()
   
   // lay san pham theo id 
   const {
    data:product,
    isLoading,
    isError} = useQuery({
      queryKey:["product",id],
      queryFn: () => instance.get(`/products/${id}`),
   })

   
    // lay danh sach danh muc
    const {data:categories} = useQuery({
        queryKey:["categories"],

        queryFn: () => instance.get('categories'),
    });
    // them san pham
    const {mutate,isPending} = useMutation({
        mutationFn: async(product : FieldType) =>{
            try{
                return await instance.put(`products/${id}`,product)

            }catch(error){
                throw new Error("Call API that bai")
            }
        },
        onSuccess: () =>{
        
        messageApi.open({
            type:"success",
            content:"Cap nhat san pham thanh cong"
        });
        querryClient.invalidateQueries({
            queryKey:['product']
        })
        
        },
        onError : (error) =>{
            messageApi.open({
                type:"error",
                content:error.message
            })
        }
    })

   
    const onFinish: FormProps<FieldType>["onFinish"] = (values: any ) => {
        mutate(values);
    };
if(isError) <div>Error...</div>
    return (
        <>
        {contextHolder}
        <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-medium">Sua sản phẩm</h1>
        <Link to="/admin/products/add">
        <Button type="primary">
            <RollbackOutlined /> Quay lai
       </Button></Link>
        </div>

        <Skeleton loading={isLoading} active>
                <Form
                 
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{...product?.data}}
                    onFinish={onFinish}
                    autoComplete="off"
                    disabled={isPending}
                >
        <Form.Item<FieldType> label="Ten san pham" name="name" rules={[{required:true, message:"Ten san pham bat buoc phai dien"}]}>
            <Input />

        </Form.Item>

        
        <Form.Item<FieldType> label="Gia san pham" name="price" rules={[{required:true, message:"Gia san pham bat buoc phai dien"}]}>
            <Input />

        </Form.Item>

        <Form.Item<FieldType> label="Danh muc" name="categoryId" rules={[{required:true, message:" bat buoc phai dien"}]}>
        <Select
                            showSearch
                            placeholder="Chọn danh mục"
                            filterOption={(input, option) =>
                                (option?.label?.toString() ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={categories?.data.map((category: any) => ({
                                value: category.id,
                                label: category.name,
                            }))}
                        />
         

        </Form.Item>

        <Form.Item<FieldType> label="Mo ta san pham" name="description">
            <TextArea rows={5}/>

        </Form.Item>

        <Form.Item<FieldType> label="Khuyen mai" name="discount">
        <Input />

        </Form.Item>

        <Form.Item<FieldType> label="So luong" name="quantity">
        <Input />
        </Form.Item>

        <Form.Item<FieldType> label="San pham noi bat" name="featured" valuePropName="checked">
        <Checkbox />
        </Form.Item>
        

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            {isPending && <Loading3QuartersOutlined className="animate-spin" />}{" "}
                            Submit
                        </Button>
                    </Form.Item>





</Form>
</Skeleton>

        </>
    )
}
export default ProductEditPage
import { ICategory } from "@/common/types/category"
import instance from "@/configs/axios"
import { useMutation } from "@tanstack/react-query"
import { Button, Form, FormProps, Input, message } from "antd"

// tao FieldType
type FieldType = {
    name: string
}

export const CategoryAdd = () =>{
    const [messageApi, contextHolder] = message.useMessage()
    const [form] = Form.useForm()
    // them danh muc :mutate , onSuccess, onError


    const {mutate} = useMutation({
        mutationFn: async(categories:ICategory)=>{
            try{
                return await instance.post(`/categories`,categories)

            }catch(error){
                throw new Error("Call API that bai")
            }
        },
        onSuccess : () =>{
            //reset  form
            form.resetFields()
            messageApi.open({
                type:"success",
                content:"Them danh muc thanh cong"
            })
        },
        onError(error){
            messageApi.open({
                type:"error",
                content:error.message
            })
        }
    })

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        mutate(values)
    }  
      
    return(
        <>
       {contextHolder}
       <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
  
    autoComplete="off">

     <Form.Item<FieldType> label="Ten danh muc" name="name"
      rules={[{ required: true, message: 'Danh muc bat buoc phai dien' }]}>
 <Input />
     </Form.Item>

<Button type="primary" htmlType="submit">
  Submit
</Button>

    </Form>
        </>
    )}
    
    export default CategoryAdd 
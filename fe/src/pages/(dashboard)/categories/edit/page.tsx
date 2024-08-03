import instance from "@/configs/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Form, FormProps, Input, message, Skeleton } from "antd"
import { useParams } from "react-router-dom"

type FieldType = {
    name: string
}
const CategoryEdit = () =>{
    const {id} = useParams()
    const [messageApi, contextHolder] = message.useMessage()

    const queryClient = useQueryClient()

    // lấy danh mục theo id 
    const {data: categorie, isLoading, isError} = useQuery({
        queryKey:['category', id],
        queryFn: () => instance.get(`/categories/${id}`)
    })
   
    // cập nhật danh mục
    const {mutate} = useMutation({
        mutationFn: async (categories: FieldType) => {
            try {
                return await instance.put(`/categories/${id}`, categories)
            } catch (error) {
                throw new Error("Call API thất bại")
            }
        },
        onSuccess : () => {
            messageApi.open({
                type: "success",
                content: "Update thành công"
            })
            queryClient.invalidateQueries({
                queryKey: ['categories']
            })
        },
        onError(error) {
            messageApi.open({
                type: "error",
                content: error.message
            })
        }
    })

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        mutate(values)
    }  

    if (isError) return <div>Error...</div>

    return (
        <>
            {contextHolder}
            <Skeleton loading={isLoading} active>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{...categorie?.data}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType> 
                        label="Tên danh mục" 
                        name="name"
                        rules={[{ required: true, message: 'Danh mục bắt buộc phải điền' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Skeleton>
        </>
    )
}
export default CategoryEdit

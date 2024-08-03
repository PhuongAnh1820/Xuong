import { ICategory } from "@/common/types/category";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Space, Table } from "antd";
import { Link } from "react-router-dom";

export const CategoryList = () =>{
    const [messageApi,contextHolder] = message.useMessage();
    const querryClient = useQueryClient();

    //list danh muc
    const {data,isLoading,isError,error} = useQuery({
        queryKey:['categories'],
        queryFn: () => instance.get('/categories')
    })
// xoa danh muc
const {mutate} = useMutation({
    mutationFn: async(id:number) =>{
       try{
        return instance.delete(`/categories/${id}`)

       }catch(error){
      throw new Error("Call API that bai, vui long thu lai")
       }
    },
    onSuccess: () =>{
        messageApi.open({
            type:"success",
            content:"Xoa danh muc thanh cong"
        }),
        querryClient.invalidateQueries({
            queryKey:['categories']
        })
    },
    onError(error){
        messageApi.open({
            type:"error",
            content: error.message
        })
    }
})
    // bang table
    const dataSource = data?.data.map((category: ICategory)=>({
        key: category.id,
        ...category
    }))

    const columns = [
        {
          title: 'Ten danh muc',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title:"Action",
          id:"action",
          render:(_:any,categories: ICategory)=>{
            return(
                <Space>
                    <Popconfirm
    title="Xoa danh muc"
    description="Ban co muon xoa danh muc khong "
    onConfirm={()=> mutate(categories.id!)}
    okText="Yes"
    cancelText="No"
  >
    <Button type="primary" danger>Delete</Button>
  </Popconfirm>

  <Link to={`/admin/categories/${categories.id}/edit`}>
  <Button type="primary">Update</Button>
  </Link>
                </Space>
            )
          }
        }
      ];
    if(isError) <div>{error.message}</div>
    return(
        <>
        {contextHolder}
        
        <Link to="/admin/categories/add">
        <Button type="primary">Them danh muc</Button>
        </Link>

<Skeleton loading={isLoading} active>
<Table dataSource={dataSource} columns={columns} />;
</Skeleton>
       
        </>
    )
    }
    export default CategoryList
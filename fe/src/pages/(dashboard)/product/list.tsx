import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Space, Table } from "antd";
import { Link } from "react-router-dom";
import {PlusOutlined} from '@ant-design/icons'

const ProductList = () => {
  const [messageApi,contextHolder] = message.useMessage()
   const querryClient = useQueryClient();

   // list danh sach san pham
   const {data, isLoading, isError, error} = useQuery({
    queryKey:["products"],
    queryFn: () => instance.get("/products")
   })

   // xoa san pham
   const {mutate} = useMutation({
    mutationFn: async(id:number)=>{
      try{
        return instance.delete(`/products/${id}`)

      }catch(error){
        throw new Error("Call API thất bạt, vui lòng thử lại")
      }
    },
      // neu thanh cong 
onSuccess: () =>{
  messageApi.open({
    type:"success",
    content:"Xóa sản phẩm thành công"
  })
  querryClient.invalidateQueries({
    queryKey:['products']
  })
},
onError(error){
  messageApi.open({
    type:"error",
    content:error.message
  });
},
  })
   

   

  
// show bang table
const dataSource = data?.data.map((product: IProduct)=> ({
  key:product.id,
  ...product,
}))
const columns= [
  {
    title: 'Ten san pham',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Gia san pham',
    dataIndex: 'price',
    key: 'price',
  },
  
  {
    title: 'Mo ta',
    dataIndex: 'description',
    key: 'description',
  },
  
  {
    title: 'So luong',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
   id:"action",
   render:(_:any,product:IProduct) =>{
    return (
      <Space>
      <Popconfirm title="Xoa san pham" 
      description="Ban co muon xoa san pham khong" 
      onConfirm={()=> mutate(product.id!)} 
      okText="Co" cancelText="Khong">
        <Button type="primary" danger>Xoa</Button>
      </Popconfirm>

      <Link to={`/admin/products/${product.id}/edit`}>
      <Button type="primary">Cap nhat</Button>
      </Link>

      </Space>
      
    )
   }
  },
];
if(isError) return <div>{error.message}</div>
    return (
      <>
      <div>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-medium">Quản lý sản phẩm</h1>
                <Link to="/admin/products/add">
                    <Button type="primary">
                        <PlusOutlined /> Thêm sản phẩm
                    </Button>
                </Link>
            </div>
            <Skeleton loading={isLoading} active>
                <Table dataSource={dataSource} columns={columns} />
            </Skeleton>
        </div>
      </>
    );
};

export default ProductList;


import CategoryAdd from "@/pages/(dashboard)/categories/add/page";
import CategoryEdit from "@/pages/(dashboard)/categories/edit/page";
import CategoryList from "@/pages/(dashboard)/categories/list";
import LayoutAdmin from "@/pages/(dashboard)/page";
import ProductAddPage from "@/pages/(dashboard)/product/add/page";
import ProductEditPage from "@/pages/(dashboard)/product/edit/page";
import ProductList from "@/pages/(dashboard)/product/list";
import NotFoundPage from "@/pages/(website)/404/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                </Route>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route path="products" element={< ProductList />} />
                    <Route path="products/add" element={<ProductAddPage />} />
                    <Route path="products/:id/edit" element={<ProductEditPage />} />
                    <Route path="categories" element={< CategoryList />} />
                    <Route path="categories/add" element={< CategoryAdd />} />
                    <Route path="categories/:id/edit" element={< CategoryEdit />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default Router;
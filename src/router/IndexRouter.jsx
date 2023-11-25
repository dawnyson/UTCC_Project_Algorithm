import React from "react";
import { Route, Routes } from "react-router-dom";
//layout
import MainLayout from "../layout/MainLayout"
//pages
import Index from "../pages/index/Index";
import NotFound404 from "../pages/error/NotFound404";
import Management from "../pages/admin/Management";

const IndexRouter = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Index />} />
                    <Route path="admin" element={<Management />} />
                </Route>
                <Route path='*' element={<NotFound404 />} />
            </Routes>
        </React.Fragment>
    )
}

export default IndexRouter;
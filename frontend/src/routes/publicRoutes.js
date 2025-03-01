import CartLayout from "../layouts/CartLayout/CartLayout";
import Header from "../layouts/components/Header/Header";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import DetailProductLayout from "../layouts/DetailProductLayout/DetailProductLayout";
import Cart from "../pages/Cart/Cart";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
export const publicRoutes = [
    {path : '/', page : DefaultLayout, layout : DefaultLayout},
    {path : '/cart', page : Cart, layout : CartLayout},
    {path : '/detail', page : DetailProduct, layout : DetailProductLayout}
]
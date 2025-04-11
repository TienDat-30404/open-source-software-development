import CartLayout from "../layouts/CartLayout/CartLayout";
import Header from "../layouts/components/Header/Header";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Cart from "../pages/Cart/Cart";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import DetailArtist from "../pages/DetailArtist/DetailArtist";
import MainContent from "../pages/HomePage/MainContent/MainContent";
import DetailPlayList from "../pages/DetailPlaylist/DetailPlaylist";
import DetailAlbum from "../pages/DetailAlbum/DetailAlbum";
import DetailSong from "../pages/DetailSong/DetailSong";
import Premium from "../pages/Premium/Premium";
// import ChatApp from "../pages/Chat/Chat";
import SignUp from "../pages/SignUp/SignUp";
import SignUpByStepOne from "../pages/SignUp/SignUpByStepOne";
import SignUpByStepTwo from "../pages/SignUp/SignUpByStepTwo";
import Payment from "../pages/Payment/Payment";
import PaymentVnpayReturn from "../pages/Payment/PaymentVnpayReturn";
import PaymentZalopayReturn from "../pages/Payment/PaymentZalopayReturn";
import PaymentMomoReturn from "../pages/Payment/PaymentMomoReturn";
import Login from "../pages/Login/Login";
export const publicRoutes = [
    {path : '/', page : MainContent, layout : DefaultLayout},
    {path : '/cart', page : Cart, layout : CartLayout},
    {path : '/artist/:id', page : DetailArtist, layout : DefaultLayout},
    {path : '/playlist/:id', page : DetailPlayList, layout : DefaultLayout},
    {path : 'album/:id', page : DetailAlbum, layout : DefaultLayout},
    {path : 'song/:id', page : DetailSong, layout : DefaultLayout},
    {path : 'premium', page : Premium, layout : DefaultLayout},
    // {path : 'chat', page : ChatApp, layout : null},
    {path : 'login', page : Login, layout : null},
    {path : 'sign-up', page : SignUp, layout : null},
    {path : 'sign-up/step=1', page : SignUpByStepOne, layout : null},
    {path : 'sign-up/step=2', page : SignUpByStepTwo, layout : null},
    {path : 'payment', page : Payment, layout : null},
    {path : '/payment-vnpay-return', page : PaymentVnpayReturn, layout : null},
    {path : '/payment-zalopay-return', page : PaymentZalopayReturn, layout : null},
    {path : '/payment-momo-return', page : PaymentMomoReturn, layout : null},


]


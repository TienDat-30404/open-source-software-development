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
export const publicRoutes = [
    {path : '/', page : MainContent, layout : DefaultLayout},
    {path : '/cart', page : Cart, layout : CartLayout},
    {path : '/artist/:id', page : DetailArtist, layout : DefaultLayout},
    {path : '/playlist/:id', page : DetailPlayList, layout : DefaultLayout},
    {path : 'album/:id', page : DetailAlbum, layout : DefaultLayout},
    {path : 'song/:id', page : DetailSong, layout : DefaultLayout}
]
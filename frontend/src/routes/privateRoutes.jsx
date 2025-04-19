import AdminLayout from "../layouts/Admin/AdminLayout";
import Album from "../pages/Admin/Album";
import Artist from "../pages/Admin/Artist/Artist";
import Category from "../pages/Admin/Category/Category";
import DashBoard from "../pages/Admin/DashBoard";
import Plan from "../pages/Admin/Plan/Plan";
import Song from "../pages/Admin/Song/Song";

export const privateRoutes = [
    {path : '/admin/dashboard', page : DashBoard, layout : AdminLayout},
    {path : 'admin/artist', page : Artist, layout : AdminLayout },
    {path : '/admin/song', page : Song, layout : AdminLayout},
    {path : '/admin/album', page : Album, layout : AdminLayout},
    {path : '/admin/plan', page : Plan, layout : AdminLayout},
    {path : '/admin/category', page : Category, layout : AdminLayout},

]
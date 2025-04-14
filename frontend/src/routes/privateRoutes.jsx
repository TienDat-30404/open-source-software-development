import AdminLayout from "../layouts/Admin/AdminLayout";
import Album from "../pages/Admin/Album";
import Artist from "../pages/Admin/Artist";
import DashBoard from "../pages/Admin/DashBoard";
import Plan from "../pages/Admin/Plan";
import Song from "../pages/Admin/Song";

export const privateRoutes = [
    {path : '/dashboard', page : DashBoard, layout : AdminLayout},
    {path : '/artist', page : Artist, layout : AdminLayout },
    {path : '/song', page : Song, layout : AdminLayout},
    {path : '/album', page : Album, layout : AdminLayout},
    {path : '/plan', page : Plan, layout : AdminLayout}
]
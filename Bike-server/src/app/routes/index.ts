import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { BlogRoutes } from "../modules/blog/blog.routes";
import { OrderRoutes } from "../modules/order/order.route";
import { HeroRoutes } from "../modules/herosection/hero.route";
import { MsgRoutes } from "../modules/messages/msg.route";

const router=Router();
const moduleRoutes=[
    {
        path:'/auth',
        route:UserRoutes,
    },
    {
        path:'/blogs',
        route:BlogRoutes,
    },
    {
        path:'/admin',
        route:AdminRoutes,
    },
    {
        path:'/order',
        route:OrderRoutes,
    },
    {
        path:'/hero',
        route:HeroRoutes,
    },
    {
        path:'/msg',
        route:MsgRoutes,
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;
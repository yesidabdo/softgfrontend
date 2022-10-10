import { Route } from "./route.model"

export class Schedule {
    id?:number
    route?:any
    route_id?:number
    week_num?:number
    from?:string
    to?:string
    active?:boolean
}

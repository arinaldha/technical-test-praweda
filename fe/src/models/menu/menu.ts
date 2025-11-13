export type Menus = {
    id: string
    menu_icon: Nullable<string>
    menu_id: string
    menu_name: string
    menu_order_no: number
    menu_parent: Nullable<string>
    menu_path: Nullable<string>
    children?: Nullable<Menus[]>
    is_active? : string;
}
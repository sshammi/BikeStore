export interface TUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "customer";
    deactive:boolean;
}
  
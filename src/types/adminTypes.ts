interface IAdmin {
    id: number;
    email: string;
    password: string;
    confirmPassword?: string;
}

// confirmPassword is optional because i need to delete it in the service
// no optinal operand can not be deleted in TS.

export type SignUpAdminData = Omit<IAdmin, "id">
export type SignInAdminData = Omit<IAdmin, "id" | "confirmpassword">

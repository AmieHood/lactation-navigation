// Counselor
export type Counselor = {
    dateAccredited: string
    role: string | null
    token: string
    id?: number,
}

//Counselor type for Find Chapter component only
export type Counselor2 = {
    dateAccredited: string
    role: string | null
    token: string
    id?: number,
    UserId: number
}

//Chapter
export interface Chapter {
    chapterName: string
    chapterCity: string
    chapterState: string
    chapterPhone: string
    chapterWebsite: string
    id?: number
}

//User
export interface User {
    firstName: string,
    lastName: string, 
    email: string, 
    password: string,
    confirmPassword: string,
    emailValid: boolean, 
    message: string,
    Counselor: Counselor,
    userCity?: string,
    userState?: string,
    userPhone?: string,
    id?: number,
}


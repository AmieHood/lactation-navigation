// Counselor Create
export interface Counselor {
    dateAccredited: string
    role: string | null
    id?: number,
    token: string
}

export interface Chapter {
    chapterName: string
    chapterCity: string
    chapterState: string
    chapterPhone: string
    chapterWebsite: string
    id?: number
}

export interface User {
    firstName: string,
    lastName: string, 
    email: string, 
    password: string,
    confirmPassword: string,
    emailValid: boolean, 
    message: string
    id?: number
}
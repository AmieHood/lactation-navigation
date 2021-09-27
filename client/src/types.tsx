// Counselor Create
export type Counselor = {
    dateAccredited: string
    role: string | null
    token: string
    id?: number,
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

export interface States {
    statesArray: [
        "AL",
        "AK",
        "AS",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "DC",
        "FM",
        "FL",
        "GA",
        "GU",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MH",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "MP",
        "OH",
        "OK",
        "OR",
        "PW",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VI",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
      ];
}
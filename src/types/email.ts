export interface EmailData {
    name: string
    email: string
    subject: string
    message: string
  }
  
  export interface ContactFormData extends EmailData {}
  
  export interface ApiResponse {
    success: boolean
    message: string
    error?:string
    [key: string]: any
  }
  
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: string
        NODE_ENV?: "development" | "production"
        EMAIL_SERVICE?: string
        EMAIL_USER?: string
        EMAIL_PASSWORD?: string
        RECIPIENT_EMAIL?: string
        SEND_CONFIRMATION?: string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
  
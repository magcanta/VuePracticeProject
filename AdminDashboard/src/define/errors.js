class Errors {
    static UNKNOWN = new Errors('UnknownError', 0)
    static USER_EXIST = new Errors('UserExistError', 1)
    static USER_NOT_FOUND = new Errors('UserNotFoundError', 2)
    static INVALID_CREDENTIALS = new Errors('InvalidCredentials', 3)

    constructor(name, code) {
        this.name = name
        this.code = code
    }

    toString() {
        return `${this.name}`
    }
}

export const errors = Errors
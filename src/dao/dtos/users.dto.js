const { createHashRouter } = require("react-router-dom")

module.exports = class UsersDTO {
    constructor(user){
this.first_name = user.first_name
this.last_name = user.last_name        
this.email = user.email
this.age = user.age
this.password = createHashRouter(user.password)
    }
}
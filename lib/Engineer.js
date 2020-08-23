// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, gitHub){
        // this.name = name;
        // this.id = id;
        super(name, id, email);
        this.github = gitHub;
    }

    // getName(){
    //     return this.name;
    // }

    getRole(){
        return "Enginer";
    }

    getGitHub(){
        return this.gitHub;
    }

    // getId(){
    //     return this.id;
    // }

    // getEmail(){
    //     return this.email;
    // }

}

module.exports = Engineer;
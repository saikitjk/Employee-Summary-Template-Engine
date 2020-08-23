const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamDataArray = [];


function createMember(){
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is this employee's name?"
        },
        {
            type: "input",
            name: "empId",
            message: "What is this employee's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is this employee's email?"
        },
        {
            type: "checkbox",
            name: "role",
            message: "What is this employee's role?",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }

    ])}

    async function init(){
        try{

            const member = await createMember();
            name = member.name;
            empId = member.empId;
            role = member.role;
            email = member.email;
            //console.log(role[0]);

            if(role[0] === "Manager"){
                createManager();
            }
            else if (role[0] === "Engineer"){

                createEngineer();
            }
            else if (role[0] === "Intern"){
                createIntern();
            }

        }
        catch(err){
            console.log(err);
        }
    }
    









function createManager(){
    return inquirer.prompt([
        {
            type: "input",
            name: "officeNum",
            message: "What is this manager's office number?",
        },
        {
            type: "checkbox",
            name: "addMore",
            message: "Do you want to add more employees?",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(function(data){

        officeNum = data.officeNum;
        const manager = new Manager(name, empId, email, officeNum);
        teamDataArray.push(manager);
        

        if(data.addMore[0] === "Yes"){  
            init();  
        }
        else{
            render(teamDataArray);
        }
        
    });

}

function createEngineer(){
    return inquirer.prompt([
        {
            type: "input",
            name: "gitHubName",
            message: "What is this engineer's GitHub handle?",
        },
        {
            type: "checkbox",
            name: "addMore",
            message: "Do you want to add more employees?",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(function(data){

        gitHubName = data.gitHubName;
        const engineer = new Engineer(name, empId, email, gitHubName);
        teamDataArray.push(engineer);
        //console.log(data.addMore[0]);

        if(data.addMore[0] === "Yes"){  
            init();  
        }
        else{
            render(teamDataArray);
            console.log(teamDataArray);
        }
    });
    
}

function createIntern(){
    return inquirer.prompt([
        {
            type: "input",
            name: "schoolName",
            message: "Which school did this intern graduate?",
        },
        {
            type: "checkbox",
            name: "addMore",
            message: "Do you want to add more employees?",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(function(data){

        schoolName = data.schoolName;
        const intern= new Intern(name, empId, email, schoolName);
        teamDataArray.push(intern);

        if(data.addMore[0] === "Yes"){  
            init();  
        }
        else{
            render(teamDataArray);
        }
    });
    
}

init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// const mainFile = fs.readFile('templates/main.html');



// fs.writeFile(outputPath, )
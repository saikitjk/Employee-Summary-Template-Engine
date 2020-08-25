const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
//const readFile = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
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

    ])};


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
            createHtml()
        }
        
    });

}

function createEngineer(){
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
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

        github = data.github;
        const engineer = new Engineer(name, empId, email, github);
        teamDataArray.push(engineer);
        //console.log(data.addMore[0]);

        if(data.addMore[0] === "Yes"){  
            init();  
        }
        else{
            render(teamDataArray);
            createHtml()
            //console.log(teamDataArray);
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
            createHtml()
        }
    });
    
}

async function createHtml(){
    const html = render(teamDataArray);
    //console.log("on99" + html);
    await writeFileAsync (outputPath,html);

    console.log("team.html created successfully.")

}



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


init()



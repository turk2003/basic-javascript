let Members = [];

const appHeader = document.getElementById('app-header');

const txtFirstName = document.getElementById('txtFirstName');
const txtLastName = document.getElementById('txtLastName');
const txtEmail = document.getElementById('txtEmail');

const lbFirstName = document.getElementById('lbFirstName');
const lbLastName = document.getElementById('lbLastName');
const lbEmail = document.getElementById('lbEmail');

let btnGetAll = document.getElementById('btnGetAll');
let btnAdd = document.getElementById('btnAdd');
const tbMembers = document.getElementById('tbMembers');


function members(firstname, lastname, email) {
    return {
        firstname: firstname,
        lastname: lastname,
        email: email
    };
}
// function deleteMember(id) {
//     console.log("Delete#"+id);
//     //Members.splice(id, 1);
//     renderTable();
// }

function hello() {
    console.log("Hello");
};

let DelBtn = {};
function renderTable() {
    tbMembers.innerHTML = '';
    DelBtn = {};

    for (let i = 0; i < Members.length; i++) {
        let member = Members[i];
        let newRow = `<tr id=ID${member.id}>
                        <th scope="row">${member.id}</th>
                        <td id="lbFirstName${member.id}">${member.firstname}</td>
                        <td id="lbLastName${member.id}" >${member.lastname}</td>
                        <td id="lbEmail${member.id}"> ${member.email}</td>
                        <td id="lbCommand${member.id}"><button id="btnDel${member.id} class="btn btn-danger" >del</button></div>
                        </td>
                      </tr>`;
        tbMembers.innerHTML += newRow;

        
    }
    let btnDEL = tbMembers.getElementsByTagName('button');
    for (let i = 0; i < btnDEL.length; i++) {
        btnDEL[i].onclick = function () {
            console.log("Delete#" + Members[i].id);
            deleteMember(Members[i].id);
        };
    }
    

}

let memberID = 0;



async function getData() {
    const url = "http://localhost:8000/member";
    let response = {};
    try {
        response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        return json;

    } catch (error) {
        console.error(error);
    }
}
async function deleteMember(id) {
    renderTable();
    let request = new Request("http://localhost:8000/member/" + id, {
        method: "DELETE"
    });
    let response = await fetch(request);
    let result = await response.json();
    console.log(result);
    getMembers();

}


async function getMembers() {
    Members = [];
    Members = await getData();
    console.log(Members);
    renderTable();
}

getMembers();
async function addMember(member) {
    let request = new Request("http://localhost:8000/member", {
        method: "POST",
        body: JSON.stringify(member),
    });

    let response = await fetch(request);
    let result = await response.json();
    console.log(result);

    getMembers();

}



btnGetAll.onclick = () => {
    getMembers();
};

btnAdd.onclick = () => {
    let member = members(txtFirstName.value, txtLastName.value, txtEmail.value);
    addMember(member);
    //Members.push(member);
    //renderTable();

};
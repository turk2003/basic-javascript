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
function deleteMember(id) {
    console.log("Delete#"+id);
    //Members.splice(id, 1);
    renderTable();
}



function renderTable() {
    tbMembers.innerHTML = '';
    let delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete';
    delBtn.className = 'btn btn-danger';

    for (let i = 0; i < Members.length; i++) {

        delBtn.onclick = () => {
            deleteMember(Members[i].id);
        };

        let newRow = `<tr id=ID${i}>
                        <th scope="row">${i}</th>
                        <td id="lbFirstName${i}">${Members[i].firstname}</td>
                        <td id="lbLastName${i}" >${Members[i].lastname}</td>
                        <td id="lbEmail${i}"> ${Members[i].email}</td>
                        <td id="lbCommand${i}"></td>
                      </tr>`;

        tbMembers.innerHTML += newRow;

        let command = document.getElementById(`lbCommand${i}`);
        command.appendChild(delBtn);
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


async function getMembers() {
    Members = await getData();
    // console.log(Members);
    renderTable();
}

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
    memberID++;
};
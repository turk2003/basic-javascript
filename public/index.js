const Members =[];

const appHeader = document.getElementById('app-header');

const txtFirstName = document.getElementById('txtFirstName');
const txtLastName = document.getElementById('txtLastName');
const txtEmail = document.getElementById('txtEmail');

const lbFirstName = document.getElementById('lbFirstName');
const lbLastName = document.getElementById('lbLastName');
const lbEmail = document.getElementById('lbEmail');

let btnSubmit = document.getElementById('btnSubmit');
let btnAdd = document.getElementById('btnAdd');
const tbMembers = document.getElementById('tbMembers');

function members(firstname , lastname , email){
    return {
        firstname: firstname,
        lastname: lastname,
        email: email
    };
}
function deleteMember(id){
    Members.splice(id,1);
    renderTable();
}



function renderTable(){
    tbMembers.innerHTML = '';
    let delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete';
    delBtn.className = 'btn btn-danger';
    
    for (let i = 0; i < Members.length; i++) {

        delBtn.onclick = () => {
            deleteMember(i);
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
btnAdd.onclick = () => {
    let member = members(txtFirstName.value, txtLastName.value, txtEmail.value);
    Members.push(member);
    renderTable();
    memberID++;
};

appHeader.innerHTML = 'Hello from JavaScript!';


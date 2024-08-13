

let tbodyMembers = document.getElementById('tbodyMembers');

function renderTable(Members){
    let members = Members.data;
    tbodyMembers.innerHTML = "";

    for(let idx = 0; idx < members.length; idx++){
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${members[idx].id}</td>
            <td>${members[idx].firstName}</td>
            <td>${members[idx].lastName}</td>
            <td>${members[idx].email}</td>
            <td>${members[idx].zipcode}</td>
            <td><button id="btnDel${members[idx].id}" type="button" class="btn btn-danger">Del</button></td>
        `;
        tbodyMembers.appendChild(tr);

        let btnDel = document.getElementById(`btnDel${members[idx].id}`);
        btnDel.addEventListener('click', function(){
            console.log(`Delete member with id: ${members[idx].id}`);
        });
    }
   
}

let tableMembers = {
    render: renderTable
};
export default tableMembers;
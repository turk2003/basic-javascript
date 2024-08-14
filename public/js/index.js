import { Members } from "./members/index.js";



let tbodyMembers = document.getElementById('tbodyMembers');
let txtZipCode = document.getElementById('txtZipCode');
function renderTable() {
    let members = Members.data;
    tbodyMembers.innerHTML = "";

    for (let idx = 0; idx < members.length; idx++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${members[idx].id}</td>
            <td>${members[idx].firstName}</td>
            <td>${members[idx].lastName}</td>
            <td>${members[idx].email}</td>
            <td>${members[idx].zipcode}</td>
            <td><button id="btnDel${members[idx].id}" type="button" class="btn btn-danger">Del</button></td>
        `;
        let btnDel = tr.querySelector(`#btnDel${members[idx].id}`);
        btnDel.addEventListener('click', async function(){
            console.log(`Delete member with id: ${members[idx].id}`);
            await Members.service.delete(members[idx].id);
            Members.data = await Members.service.getlist();
            renderTable();
        });
        tbodyMembers.appendChild(tr);  
    }

   

}
document.addEventListener('DOMContentLoaded', function () {
    const selectProvince = document.getElementById('selectProvince');
    const selectDistrict = document.getElementById('selectDistrict');
    const selectZipCode = document.getElementById('selectZipCode');

    // Function to fetch data from the API
    async function fetchProvinces() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Initialize the dropdowns with data from the API
    async function initializeDropdowns() {
        const provinces = await fetchProvinces();

        if (provinces) {
            // Populate provinces
            provinces.forEach(province => {
                let option = document.createElement('option');
                option.value = province.name_th;
                option.text = province.name_th;
                selectProvince.add(option); 
            });

            // Event listener for province selection
            selectProvince.addEventListener('change', function () {
                selectDistrict.innerHTML = '<option value="" selected disabled>Select a district</option>';
                selectZipCode.innerHTML = '<option value="" selected disabled>Select a ZIP code</option>';
                selectDistrict.disabled = false;

                const selectedProvince = provinces.find(p => p.name_th === this.value);
                selectedProvince.amphure.forEach(district => {
                    let option = document.createElement('option');
                    option.value = district.name_th;
                    option.text = district.name_th;
                    selectDistrict.add(option);
                });
            });
            
            // Event listener for district selection
            selectDistrict.addEventListener('change', function () {
                selectZipCode.innerHTML = '<option value="" selected disabled>Select a ZIP code</option>';
                selectZipCode.disabled = false;
                let zipcode 

                const selectedProvince = provinces.find(p => p.name_th === selectProvince.value);
                const selectedDistrict = selectedProvince.amphure.find(d => d.name_th === this.value);
                selectedDistrict.tambon.forEach(subdistrict => {
                    let option = document.createElement('option');
                    option.value = subdistrict.postcode;
                    option.text = `${subdistrict.name_th}`;
                    selectZipCode.add(option);
                    zipcode = subdistrict.zip_code
                     txtZipCode.value = zipcode
                });

            });
        }
    }

    // Call the function to initialize dropdowns
    initializeDropdowns();
    

    // Event listener for save button
    document.getElementById('btnSaveLocation').addEventListener('click', function () {
        
        const selectedProvince = selectProvince.value;
        const selectedDistrict = selectDistrict.value;
        const selectedZipCode = selectZipCode.value;
     

        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
    });
});




async function main(){

    
    

   
    Members.data = await Members.service.getlist();
        renderTable();

    Members.form.buttonAdd.addEventListener('click', async function(){
        console.log(Members.form.getData());
        let _member = Members.form.getData();
        Members.service.add(_member);
        Members.data = await Members.service.getlist();
        renderTable();
    });

    Members.form.buttonGetAll.addEventListener('click', async function(){
        Members.data = await Members.service.getlist();
        renderTable();
    });
   



};

main();


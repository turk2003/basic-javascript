
import memberForm from './member-form.js';
import memberModel from './member-model.js';
import memberService from './member-service.js';
const membersData = [];

const Members = {
    data: membersData,
    form: memberForm,
    model: memberModel,
    service:memberService
};

// Members.form.buttonAdd.addEventListener('click', function(){
//     let member = Members.model(
//         Members.form.firstName.value,
//         Members.form.lastName.value,
//         Members.form.email.value,
//         Members.form.zipcode.value
//     );
//     Members.data.push(member);
//     console.log(Members.data);
// });


export { Members }; 
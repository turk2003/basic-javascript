
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



export { Members }; 
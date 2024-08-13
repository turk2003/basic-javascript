import { Members } from "./members/index.js";
import tableMembers from "./tables/index.js";




console.log('Hello, world!');

async function main(){

    Members.form.buttonAdd.addEventListener('click', async function(){
        console.log(Members.form.getData());
        let _member = Members.form.getData();
        Members.service.add(_member);
        Members.data = await Members.service.getlist();
        tableMembers.render(Members);
    });
    
    Members.form.buttonGetAll.addEventListener('click', async function(){
        Members.data = await Members.service.getlist();
        tableMembers.render(Members);
    });

};

main();
async function getData() {
    console.log("start");
    const url =
        'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json';

    try {
        console.log("fetch");
        const response = await fetch(url);
        console.log("fetch end");
        const json = await response.json();
        console.log(json);

        // console.log(response.then((resp)=>{
        //   return resp.json()
        // }).then((json_resp)=>{
        //   console.log(json_resp)
        // }));

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }


        // let respData = json;
        // console.log(json);
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

//getData();

let myFunction = () => {

    console.log("myFunction");
    let gdata = getData();

    console.log("myFunction 2222");

}


//myFunction();

let myData = {};
function demoXhr() {
    const url =
    'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json';

    console.log("demoXhr ", myData);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            myData = JSON.parse(xhr.responseText);
            console.log(JSON.parse(xhr.responseText));
            console.log("Xhr data");
        }
    };
    xhr.send();

    console.log("demoXhr end");


}

let myXhrPromise = new Promise((resolve, reject) => {
    const url =
    'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json';

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
});

// myXhrPromise.then((data) => {
//     console.log("myXhrPromise", data);
// });

async function asyncXHR() {
    let jsonData = await myXhrPromise;

    console.log("asyncXHR", jsonData);
    
}


asyncXHR();
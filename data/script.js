import { AutoTest } from "./autotest.js";

console.log("Fetch autotest");
fetch('http://localhost:19190/' + 'autotest')
.then(response => response.json())
.then(json =>{
    console.log(json.autotest);
    const questions = [];
    json.autotest.forEach(q => {
        questions.push(JSON.parse(q.json));
    })
    const autoTest = new AutoTest(questions);
    console.log(autoTest);
})
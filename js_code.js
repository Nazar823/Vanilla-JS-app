let items_arr = [];
let current_color = null;
let colors = ["red", "blue", "green", "#00d669", "#ffa400", "#530cff"]

function add_item(){
    console.log("текущий цвет", current_color)
    let inp_text = document.getElementById("input_text");
    if (inp_text.value === ""){
        return alert("Форма пустая!");
    }
    let myForm = document.getElementById("myForm");
    let myTask = new Task();
    let text = inp_text.value;
    myTask.id=items_arr.length;
    myTask.text = text;
    myTask.checked = false;
    if (current_color !== null){
        myTask.color = current_color;
    } else {
        myTask.color = colors[Math.floor(Math.random()*6)];
        current_color = myTask.color;
    }
    items_arr.push(myTask);
    let html_text =  '<div class="item" id="item-'+myTask.id+'"><input type="checkbox" id="check-'+myTask.id+'" class="item_check" onchange="changeCheckBox()"><p class="item_text" id="text-'+myTask.id+'"></p></div>';
    myForm.insertAdjacentHTML("beforebegin",html_text);
    document.getElementById("text-"+myTask.id).innerHTML = myTask.text;
    document.getElementById("item-" + myTask.id).style.backgroundColor = current_color;
    inp_text.value = "";
    current_color = null;
    console.log(items_arr)
}

function setLavand() {
    current_color = "#530cff";
}
function setGreen_W() {
    current_color = "#00d669";
}
function setOrange() {
    current_color = "#ffa400";
}
function setGreen() {
    current_color = "green";
}
function setBlue() {
    current_color = "blue";
}
function setRed() {
    current_color = "red";
}

function changeCheckBox(){
    for (let i = 0; i < items_arr.length; i++){
        if (document.getElementById("check-" + i).checked){
            items_arr[i].checked = true;
            document.getElementById("item-" + i).className = "item_checked";
            document.getElementById("item-" + i).style.backgroundColor = "";
        } else {
            items_arr[i].checked = false;
            document.getElementById("item-" + i).className = "item";
            document.getElementById("item-" + i).style.backgroundColor = items_arr[i].color;
        }
    }
    console.log(items_arr);
}

class Task {
    id;
    text;
    color;
    checked;

    setId(id){
        this.id = id;
    }
    getId(){
        return this.id;
    }
    setColor(color){
        this.color = color;
    }
    getColor(){
        return this.color;
    }
    setText(text){
        this.text = text;
    }
    getText(){
        return this.text;
    }
    check(){
        this.checked = true;
    }
    unCheck(){
        this.checked = false;
    }
}
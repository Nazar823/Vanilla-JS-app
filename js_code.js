let items_arr = [];
let current_color = null;
const colors = ["red", "blue", "green", "#00d669", "#ffa400", "#530cff"];
const colorPicker = document.querySelector('.color_bts_div');
let selectedColorId = null;

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
colors.forEach((color, index) => {
    const colorPickerItem = document.createElement('input');
    colorPickerItem.id = "picker-"+index;
    colorPickerItem.type = 'button';
    colorPickerItem.classList.add('color_bts');
    colorPickerItem.style.backgroundColor = color;
    colorPickerItem.addEventListener('click', (e) => {
        if (selectedColorId !== null){
            document.querySelector("#" + selectedColorId).style.border = "black solid 0px";
        }
        e.target.style.border = "black solid 2px"
        selectedColorId = e.target.id;
        current_color = e.target.style.backgroundColor;
    })
    colorPicker.append(colorPickerItem);
})

function getRandomColor() {
    return colors[Math.floor(Math.random()*colors.length)];
}

function draw_item(myTask) {
    const div = document.createElement('div');
    div.id = 'item-' + myTask.id;
    div.classList.add('item');
    div.style.backgroundColor = myTask.color;
    document.querySelector("#items").append(div);
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = myTask.checked;
    check.id = "check-" + myTask.id;
    check.classList.add("item_check");
    check.onchange = function (){
        changeCheckBox();
    }
    div.append(check);
    const itm_text = document.createElement('p');
    itm_text.classList.add("item_text");
    itm_text.id = "text-" + myTask.id;
    itm_text.textContent = myTask.text;
    div.append(itm_text);
}

function create_item(id_arg, text_arg, check_arg, color_arg){
    let myTask = new Task();
    let text = text_arg;
    myTask.id=id_arg;
    myTask.text = text;
    myTask.checked = check_arg;
    myTask.color = color_arg;
    items_arr.push(myTask);
    localStorage.setItem("task_list", JSON.stringify(items_arr));
    draw_item(myTask);
}

function submit() {
    alert("Submit")
}


function add_item(){
    let inp_text = document.querySelector("#input_text");
    if ((inp_text.value.trim()) === ""){
        return alert("Форма пустая!");
    }
    if (!current_color){
        current_color = getRandomColor();
    }
    create_item(items_arr.length, inp_text.value.trimLeft().trimRight(), false, current_color);
    inp_text.value = "";
    current_color = null;
    if (selectedColorId){
        document.querySelector("#"+selectedColorId).style.border = "black solid 0px";
    }
    selectedColorId = null;
}
function changeCheckBox(){
    for (let i = 0; i < items_arr.length; i++){
        if (document.querySelector("#check-" + i).checked){
            items_arr[i].checked = true;
            document.querySelector("#item-" + i).className = "item_checked";
            document.querySelector("#item-" + i).style.backgroundColor = "";
        } else {
            items_arr[i].checked = false;
            document.querySelector("#item-" + i).className = "item";
            document.querySelector("#item-" + i).style.backgroundColor = items_arr[i].color;
        }
        localStorage.setItem("task_list", JSON.stringify(items_arr));
    }
}
window.onload = function itemsFromLocalStorage(){
    items_arr = JSON.parse(localStorage.getItem("task_list"));
    if (items_arr === null){
        items_arr = [];
    }
    items_arr.forEach(item => draw_item(item));
    changeCheckBox();
}
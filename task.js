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
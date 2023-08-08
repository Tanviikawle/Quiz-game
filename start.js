next=document.getElementById("next")
second=document.getElementById("btn2")
submit=document.getElementById("submitForm")
questions=document.getElementById("q")
type=document.getElementById("type")
cat=document.getElementById("cat")
// url=document.getElementById("new_url")

function form_appear(){
    second.remove()
    next.hidden=false
}

let no
let diff
let category

function onSubmit(){
    
}

second.addEventListener("click",form_appear)
submit.addEventListener("click",onSubmit)

export {no,diff,category}


next=document.getElementById("next")
s=document.getElementById("btn")
next.hidden=true
submit=document.getElementById("submitForm")
questions=document.getElementById("q")
type=document.getElementById("type")
cat=document.getElementById("cat")

function form_appear(){
    s.remove()
    next.hidden=false
}

function onSubmit(){
    no=questions.value
    diff=type.value
    category=cat.value
}

s.addEventListener("click",form_appear)
submit.addEventListener("click",onSubmit)
// export {no,diff,category}
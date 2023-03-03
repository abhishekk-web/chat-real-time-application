const groupNode = document.getElementById("groups")
const groupChat = document.getElementById("group-chat");
const normalChat = document.getElementById("normal-chat");
const createGroup = document.getElementById('create-group');
const messageHeader=document.getElementById('message-card-header')
const messages = document.getElementById("chat-messages");

createGroup.addEventListener("click", createGroups)
normalChat.addEventListener('click', normalChats)
window.addEventListener('DOMContentLoaded', allGroups);
groupNode.addEventListener('click', showGroupChats);

function createGroups(){
    window.location.href="../make-group/make-group.html"
}
function normalChats(){
    window.location.href="../chat-screen/chat-screen.html"
}


function allGroups () {

    groupForChats();

}
async function groupForChats(){

    try {
    
        groupNode.innerHtml = "";
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/groupchat/allusersgroup", {headers: {"Authorization": token}});
        console.log(response);
        response.data.user.forEach((group)=>{
            const childNodes=`<li class="list-group-item" >${group.name}<input type="hidden" class="user-id" value=${group.id} /></li>`
        groupNode.innerHTML +=childNodes
        })
    
    }
    catch(err){
        console.log(err);
    }

}

async function chat(e) {

    e.preventDefault();
    const id = +document.getElementById('msg-header-user-id').value;
    console.log("the id is "+id);
    const group=e.target.group2.value;
    console.log(group);
    if(!group){
        return alert('Enter a message')
    }
    const groupDetails={
        groupMessage: group,
        groupId:id
    }
    const token = localStorage.getItem("token"); 
    const response = await axios.post("http://localhost:3000/groupchat/sendmessage", groupDetails, {headers: {"Authorization": token}});
    console.log(response);
    alert(response.data.message);
}

async function showGroupChats(e){

    try {

        if(e.target.className == "list-group-item"){
            const name = e.target.textContent;
        const toUserid =  e.target.children[0].value;
        const message = `Send message to : ${name } <input type="hidden" id='msg-header-user-id' value=${toUserid}>`
        messageHeader.innerHTML= message
        messages.innerHTML = "";
        getGroupMessages(toUserid);
        }

    }
    catch(err){
        console.log(err);
    }

}

async function getGroupMessages(groupId = 0){

    try{
    messages.innerHTML = "";
    const token = localStorage.getItem("token");
    console.log("hello world");
    const response = await axios.get(`http://localhost:3000/groupchat/messages/${groupId}`, {headers: {"Authorization": token}});
    console.log(response);
    response.data.groupMessages.forEach((groupchat) => {
        const chatNodes=`<li class="list-group-item1">${groupchat.userName}:${groupchat.groupMessage}</li>`
        messages.innerHTML +=chatNodes
    })
    }
    catch(err){
        console.log(err);
    }
}
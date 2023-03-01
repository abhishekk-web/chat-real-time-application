const groupNode = document.getElementById("groups")
const groupChat = document.getElementById("group-chat");
const normalChat = document.getElementById("normal-chat");
const createGroup = document.getElementById('create-group');

createGroup.addEventListener("click", createGroups)
function createGroups(){
    window.location.href="../make-group/make-group.html"
}
normalChat.addEventListener('click', normalChats)
function normalChats(){
    window.location.href="../chat-screen/chat-screen.html"
}

window.addEventListener('DOMContentLoaded', allGroups);

function allGroups () {

    groupForChats();

}
async function groupForChats(){

    try {
    
        groupNode.innerHtml = "";
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/group/showgroup", {headers: {"Authorization": token}});
        console.log(response);
        response.data.group.forEach((group)=>{
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
    const message = {
        groupChat: e.target.group2.value
    }
    console.log(message);
    const response = await axios.post("http://localhost:3000/groupchat/sendmessage", message);
    console.log(response);
}
const normalChat = document.getElementById("normal-chat");
const groupChat = document.getElementById("group-chat");
const createGroup = document.getElementById("create-group");
const userNode = document.getElementById("contacts");

groupChat.addEventListener('click', groupChats);

function groupChats(){
    window.location.href="../group-chat/group-chat.html";
}

createGroup.addEventListener('click', createGroups);

function createGroups(){
    window.location.href = "../make-group/make-group.html"
}

window.addEventListener('DOMContentLoaded', showUsers);

function showUsers(){
    contacts();
}

async function contacts(){

    try {
        const  token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/chat/allcontacts", {headers: {"Authorization": token}});
        console.log(response);
        userNode.innerHTML = "";
        response.data.user.forEach((user)=> {
            const childNodes=`<li class="list-group-item" >${user.name}<input type="hidden" class="user-id" value=${user.id} /></li>`
            userNode.innerHTML += childNodes;
        })
    }
    catch(err){
        console.log(err);
    }
}


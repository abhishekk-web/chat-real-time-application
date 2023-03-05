const normalChat = document.getElementById("normal-chat");
const groupChat = document.getElementById("group-chat");
const createGroup = document.getElementById("create-group");
const userNode = document.getElementById("contacts");
const messages = document.getElementById("chat-messages");
const messageHeader=document.getElementById('message-card-header')



groupChat.addEventListener('click', groupChats);
createGroup.addEventListener('click', createGroups);
window.addEventListener('DOMContentLoaded', showUsers);
userNode.addEventListener('click', showMessages);

function groupChats(){
    window.location.href="../group-chat/group-chat.html";
}

function createGroups(){
    window.location.href = "../make-group/make-group.html"
}

function showUsers(){
    
        contacts();
        setInterval(()=>{
            getChats(toUserid)
        },2000)
 
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

async function chat(e){

    try {
    e.preventDefault();
    const id = +document.getElementById('msg-header-user-id').value;
    const chats=e.target.chat2.value;
    if(!chats){
        return alert('Enter a message')
     }
    console.log(chats);
    const chat = {
        Chat: chats,
        toUser: id
    }
    console.log(chat);

    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:3000/chat/sendmessage", chat, {headers: {"Authorization": token}})
    console.log(response);
    alert(response.data.message);

    }
    catch(err){
        console.log(err);
    }

}


let toUserid;
async function showMessages(e) {

    if(e.target.className == "list-group-item"){
        const name = e.target.textContent;
        toUserid =  e.target.children[0].value;
        const message = `Send message to : ${name } <input type="hidden" id='msg-header-user-id' value=${toUserid}>`
        messageHeader.innerHTML= message
        messages.innerHTML = "";
        getChats(toUserid);
    }
    else{
        console.log("hello world2");
    }

}

async function getChats(toUserid = 0){
   
    try{

    messages.innerHTML = "";
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:3000/chat/messages/${toUserid}`, {headers: {"Authorization": token}});
    console.log(response);
    response.data.chats.forEach((chat)=>{
        const chatNodes=`<li class="list-group-item1">${chat.user.name}:${chat.messages}</li>`
        messages.innerHTML +=chatNodes
      })
    }
    catch(err){
        console.log(err);
    }

}
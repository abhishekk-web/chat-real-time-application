const groupNode = document.getElementById("created-group-show");
const userNode = document.getElementById("list-of-all-contacts");
const groupChat = document.getElementById("group-chat");
const normalChat = document.getElementById("normal-chat");
const adminTrue=document.getElementById('admin-yes')
const adminFalse=document.getElementById('admin-no')

groupChat.addEventListener("click", groupChats)
function groupChats(){
    window.location.href="../group-chat/group-chat.html"
}
normalChat.addEventListener('click', normalChats)
function normalChats(){
    window.location.href="../chat-screen/chat-screen.html"
}

window.addEventListener('DOMContentLoaded',showAll);

function showAll(){

    showUsers();
    allGroups();

}

async function makeGroup(e){

    try {

        e.preventDefault();
        const groupData = {
            groupName : e.target.makegroup.value
        }

        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/group/makegroup', groupData, {headers: {'Authorization': token}});
        console.log(response);
        alert(response.data.message);
    }
    catch(err){
        console.log(err);
    }

}

async function allGroups() {

    const token = localStorage.getItem("token");
    groupNode.innerHTML="";
    const response = await axios.get("http://localhost:3000/group/showgroup", {headers: {"Authorization": token}});
    console.log(response);
    response.data.group.forEach((group)=>{
        const childNodes=`<li class="list-group-item" >${group.name}<input type="hidden" class="user-id" value=${group.id} /></li>`
        groupNode.innerHTML +=childNodes
    })
    
}

async function showUsers() {

    try {
        const token = localStorage.getItem("token");
        userNode.innerHTML = "";
        const response = await axios.get("http://localhost:3000/chat/allcontacts", {headers:{"Authorization": token}});
        console.log(response);
        response.data.user.forEach((users) => {
            const childNodes = `<li class="list-group-item">${users.name}<input type="hidden" class="user-id" value=${users.id}></li>`;
            userNode.innerHTML += childNodes;
        })
    }
    catch(err){
        console.log(err);
    }

}

async function addUserToGroup(e){

    try {

        e.preventDefault();
        const groupName = e.target.grpname.value;
        const email = e.target.email.value;
        
        console.log(groupName);

        const userGroupDetails = {
            groupName: groupName,
            email: email,
            isAdmin:adminTrue.checked === true ? true :false
        }
        console.log(userGroupDetails);

        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:3000/addgroup/adduser`, userGroupDetails, {headers: {"Authorization": token}});
        console.log(response);

    }
    catch(err){
        console.log(err);
    }

}
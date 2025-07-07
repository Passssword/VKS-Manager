const manageUsers = document.getElementById('manageUsers');
const btnCreateUserOpen = document.getElementById('btn_CreateUser_open');

// let dataUsers = data.dataUsers()
// let objectUsers = JSON.parse(dataUsers)

const mapUsersFunc = (users) => {
        return users.map(elem => `
                <tr>
                        <td>${elem[6]} ${elem[4]} ${elem[5]}</td>
                        <td>${elem[1]}</td>
                        <td>${elem[2]}</td>
                        <td>${elem[3]}</td>
                        <td>
                                <button class="btn edit">Редактировать</button>
                                <button class="btn delete">Удалить</button>
                        </td>
                </tr>`)
}
const createUsersString = function (usersArray) {
        let users = "";
        usersArray.forEach(element => {
                users +=  element
        });
        return users;
}



function addEventsButtons (users) {
        const buttonEdit = document.querySelectorAll('.edit')
        const buttonDelete = document.querySelectorAll('.delete')

        let usersCount = 0;
        buttonEdit.forEach( element => {
                const user = users[usersCount]
                usersCount++
                element.addEventListener('click', async (elem) => {
                        eel.SetUserEdiPageData(user[0], user[1], user[2], user[3], user[4], user[6], user[5])().then( res => {
                                if(res == true) {window.location.replace("edit-user.html");}
                                else {console.log("Somethink wrong")}
                        })
                })
        })

        let buttonDeleteUserCount = 0;
        buttonDelete.forEach( element => {
                const user = users[buttonDeleteUserCount]
                buttonDeleteUserCount++
                element.addEventListener('click', (elem) => {
                        const result = confirm("Хотите удалить пользователя?")
                        if(result == true) {
                                eel.DeleteUser(user[0])().then( res => {
                                        if (res== true) {window.location.replace("usersPage.html");}
                                })
                        }
                })
        })
}



eel.GetAllUsers()().then( usersArr => {

    let usersTableCaptions = `<tr>
                                    <th>Ф.И.О.</th>
                                    <th>Nickname</th>
                                    <th>Password</th>
                                    <th>Rolle</th>
                                    <th>Действие с объектом</th>
                            </tr>`

    let usersString = createUsersString(mapUsersFunc(usersArr))
    let usersTable = usersTableCaptions + usersString;

    //Render Users table
    manageUsers.innerHTML = usersTable;
    addEventsButtons(usersArr)
})

btnCreateUserOpen.onclick = function () {
    window.location.replace("create-user.html");
}
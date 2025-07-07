const inputEditUserID = document.getElementById('EditUser_id');
const inputEditUserLogin = document.getElementById('EditUser_Login');
const inputEditUserPassword = document.getElementById('EditUser_Password');
const inputEditUserRolle = document.getElementById('EditUser_Rolle');
const inputEditUserName = document.getElementById('EditUser_Name');
const inputEditUserPatronymic = document.getElementById('EditUser_Patronymic');
const inputEditUserLastName = document.getElementById('EditUser_LastName');
const editUserNameBlock = document.querySelector('.editUser_name_block');
const btnEditUser = document.getElementById('editUser_button');

btnEditUser.onclick = function () {
    let UserObject = {
        id: inputEditUserID.innerHTML,
        nickname: inputEditUserLogin.value,
        password: inputEditUserPassword.value,
        rolle: inputEditUserRolle.value,
        firstName: inputEditUserName.value,
        patronymic: inputEditUserPatronymic.value,
        lastName: inputEditUserLastName.value
    }

    eel.UpdateUser(UserObject)().then( res => {
        if(res == true) {window.location.replace("usersPage.html");}
        else{console.log("Somethink wrong")}
    })
}

document.addEventListener('DOMContentLoaded', async function() {
    // Document is loaded
    
    let userEditData = await eel.GetUserEdiPageData()()

    editUserNameBlock.innerHTML = `${userEditData.lastName} ${userEditData.firstName} ${userEditData.patronymic}`

    inputEditUserID.innerHTML = userEditData.id
    inputEditUserLogin.value = userEditData.Nickname
    inputEditUserPassword.value = userEditData.password
    inputEditUserName.value = userEditData.firstName
    inputEditUserPatronymic.value = userEditData.patronymic
    inputEditUserLastName.value = userEditData.lastName
    if(userEditData.rolle == 'Admin') {
        inputEditUserRolle.innerHTML = `
            <option value="User" >Пользователь системы</option>
            <option value="Admin" selected>Администратор системы</option>
            `
    }
  });
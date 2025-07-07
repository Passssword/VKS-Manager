const btnCreateUserCreate = document.getElementById('btn_CreateUser_create');

const inputCreateUserLogin = document.getElementById('CreateUser_Login');
const inputCreateUserPassword = document.getElementById('CreateUser_Password');
const inputCreateUserRolle = document.getElementById('CreateUser_Rolle');
const inputCreateUserName = document.getElementById('CreateUser_Name');
const inputCreateUserPatronymic = document.getElementById('CreateUser_Patronymic');
const inputCreateUserLastName = document.getElementById('CreateUser_LastName');


btnCreateUserCreate.onclick = function () {
    //Create User
    let newUserObject = {
            login: inputCreateUserLogin.value,
            password: inputCreateUserPassword.value,
            rolle: inputCreateUserRolle.value,
            Name: inputCreateUserName.value,
            Patronymic: inputCreateUserPatronymic.value,
            LastName: inputCreateUserLastName.value
    }
    eel.CreateNewUser(newUserObject)().then( res => {
        if (res == true){window.location.replace("usersPage.html");}
    })
}
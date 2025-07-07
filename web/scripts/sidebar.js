const sidebarNickname = document.getElementById('sidebar_nickname');
const sidebarMenu = document.getElementById('sidebar_menu');
const sidebarAdminka = document.getElementById('sidebar_adminka');


document.addEventListener('DOMContentLoaded', async function() {

    let authData = await eel.GetUserData()()

    if ( authData ) {
        console.log( "authefication Status: true" )
        console.log( authData )

        sidebarNickname.innerHTML = authData.Nickname
        sidebarMenu.innerHTML = `
            <p class="munu_caption">ВКС События:</p>
            <a href="#" class="menuBtn">Список ВКС (not active)</a> <br />
            <a href="tableListVKS.html" class="menuBtn">Таблица ВКС</a> <br />
            <a href="#" class="menuBtn">Отчеты ВКС (not active)</a> <br />
        `
        if (authData.rolle == "Admin") {
            sidebarAdminka.innerHTML = `
            <p class="munu_caption">Настройки:</p>
            <a href="settings.html" class="menuBtn">Settins</a> <br />
            <a href="usersPage.html" class="menuBtn">Users</a> <br />
        `
    }
        
    } else { console.log( "Unregistered user" ) }
    
} )

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
            <a href="tableListVKS.html" class="menu_button">Таблица ВКС</a>
            <a href="reportsPage.html" class="menu_button">Отчеты ВКС</a>
        `
        if (authData.rolle == "Admin") {
            sidebarAdminka.innerHTML = `
            <p class="munu_caption">Настройки:</p>
            <a href="settings.html" class="menu_button">Settins</a>
            <a href="usersPage.html" class="menu_button">Users</a>
            <a href="judgeManagerPage.html" class="menu_button">Судьи</a>
        `
    }
        
    } else { console.log( "Unregistered user" ) }
    
} )

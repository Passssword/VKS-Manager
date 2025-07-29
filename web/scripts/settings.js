const SettingsField = document.getElementById('settings_field');
const HallTableID = document.getElementById('HallTableID');
const judgeTableID = document.getElementById('judgeTableID');

const judge_Name = document.getElementById('judge_Name');
const judge_Status = document.getElementById('CreateJudge_Status');
const button_AddJudge = document.getElementById('btn_AddJudge');

const mapHalls = (halls) => {
    return halls.map(hall => {
        return (`
            <tr>
                <td>${hall.Id}</td>
                <td>${hall.HallName}</td>
                <td>${hall.IpAdress}</td>
                <td><button class="btn edit">Редактировать</button></td>
            </tr>
        `)
    })
}
const mapJudges = (judges) => {
    return judges.map(judge => {
        let judgeStatusStr = null
        if (judge[2] == 'Active') judgeStatusStr = 'Дейстующий'
        else if (judge[2] == 'Retired') judgeStatusStr = 'В отставке'
        else {judgeStatusStr = 'Нет данных'}
        return (`
            <tr>
                <td>${judge[0]}</td>
                <td>${judge[1]}</td>
                <td>${judgeStatusStr}</td>
                <td><button class="btn edit">Редактировать</button></td>
            </tr>
        `)
    })
}

const arrToString = (array) => {
    let stringValue = ""
    array.forEach(element => {
        stringValue += element
    });

    return stringValue
}
let hallsTableCaptions = `<tr>
                            <th>ID</th>
                            <th>Зал</th>
                            <th>IP Адресс</th>
                            <th>Кнопки действия</th>
                        </tr>`
let judgesTableCaptions = `<tr>
                            <th>ID</th>
                            <th>Судья</th>
                            <th>Статус</th>
                            <th>Кнопки действия</th>
                        </tr>`

document.addEventListener('DOMContentLoaded', async function() {

    let configData = await eel.ReadConfig()()
    let judgesData = await eel.GetAllJudges()()
    console.log("Чтение json конфиг файла -->")
    console.log(configData.Halls)
    console.log("Запрос списка судей из базы -->")
    console.log(judgesData)

    let hallsMap = mapHalls(configData.Halls)
    let hallsHTML = arrToString(hallsMap)

    HallTableID.innerHTML = hallsTableCaptions + hallsHTML

    let judgesMap = mapJudges(judgesData)
    let judgesHTML = arrToString(judgesMap)
    
    judgeTableID.innerHTML = judgesTableCaptions + judgesHTML
} )

button_AddJudge.onclick = function () {

    eel.CreateJudge(judge_Name.value, judge_Status.value)().then( res => {
        if (res) { window.location.replace("settings.html"); }
        else { console.log(res) }
    })
}
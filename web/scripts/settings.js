const input_delete_beginDate = document.getElementById('input_delete_beginDate');
const input_delete_endDate = document.getElementById('input_delete_endDate');
const btn_deleteAllForDate = document.getElementById('btn_deleteAllForDate');

const input_export_beginDate = document.getElementById('input_export_beginDate');
const input_export_endDate = document.getElementById('input_export_endDate');
const btn_exportWord = document.getElementById('btn_exportWord');

const SettingsField = document.getElementById('settings_field');
const HallTableID = document.getElementById('HallTableID');
const judgeTableID = document.getElementById('judgeTableID');

const judge_Name = document.getElementById('judge_Name');
const judge_Status = document.getElementById('CreateJudge_Status');
const button_AddJudge = document.getElementById('btn_AddJudge');


btn_deleteAllForDate.onclick = function () {
    // Обработчик удаления событий ВКС на выбранный диапазон дат

    // Получаем даты на начало дня и конец дня
    const beginDate = new Date(input_delete_beginDate.value).setHours(0)
    const endDate = new Date(input_delete_endDate.value).setHours(23,59,59)

    console.log("Дата на начало дня: "+beginDate)
    console.log("Дата на конец дня: "+endDate)

    eel.DeleteAllFromDiapazonDate(beginDate, endDate)().then( events => {
        console.log(events)
    })
    
}

btn_exportWord.onclick = function () {
    // Получаем даты на начало дня и конец дня
    const beginDate = new Date(input_export_beginDate.value).setHours(0)
    const endDate = new Date(input_export_endDate.value).setHours(23,59,59)

    console.log("Дата на начало дня: "+beginDate)
    console.log("Дата на конец дня: "+endDate)

    eel.GetAllFromDiapazonDate(beginDate, endDate)().then( events => {
        console.log(events)
        eel.CreateWordFile(events)
    })
}

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
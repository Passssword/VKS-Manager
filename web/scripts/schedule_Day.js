const reportDate = document.getElementById('reportDate');
const btn_createTimetable = document.getElementById('btn_createTimetable');
const schedule_Day_content_block = document.getElementById('schedule_Day_content');
const schedule_Day_table = document.getElementById('schedule_Day_table');
const schedule_Day_date = document.getElementById('schedule_Day_date');

btn_createTimetable.onclick = function () {
    // Получаем даты на начало дня и конец дня
    const beginDate = new Date(reportDate.value).setHours(0)
    const endDate = new Date(reportDate.value).setHours(23,59,59)

    eel.GetJudgesData()().then(async judgesData => {
        let Events = await eel.GetAllFromDiapazonDate(beginDate, endDate)()
        renderTable(Events, judgesData)
    })

    // Заполнение поля даты отчета
    schedule_Day_date.innerHTML = getDateFromMS(Date.parse(reportDate.value))
}

const renderTable = (data, judges) => {
    let schedule_Day_Table_Headers = `
        <tr>
            <th>№</th>
            <th>Время</th>
            <th>Объект ВКС</th>
            <th>Судья</th>
            <th>№ Зала</th>
            <th>Комментарий</th>
        </tr>`
    
    let createHTML_Table_Content = createHtmlTableContent(data, judges)
    
    
    schedule_Day_table.innerHTML = schedule_Day_Table_Headers + createHTML_Table_Content
}

const createHtmlTableContent = (dataContent, judgesDataObject) => {
    console.log(dataContent)
    let stringCounter = 0;
    return dataContent.map(dataObject => {
        stringCounter++
        let judgeObj = judgesDataObject.find( judgesData => judgesData.Id == dataObject[4])
        return `
            <tr>
                <td>${stringCounter}.</td>
                <td>${getDatetimeFromMS(dataObject[1])}</td>
                <td>${dataObject[2]}</td>
                <td>${judgeObj.name}</td>
                <td>${dataObject[5]}</td>
                <td>${dataObject[6]}</td>
            </tr>`
    })
}

const getDateFromMS = (date_ms) => {
    let iventDateTime = new Date( parseInt(date_ms) ).toISOString()
    return new Date(iventDateTime).toLocaleDateString()
}
const getDatetimeFromMS = (date_ms) => {
    let iventDate, iventTime = ""
        if (date_ms) {
            let iventDateTime = new Date( parseInt(date_ms) ).toISOString()
            iventDate = new Date(iventDateTime).toLocaleDateString()
            iventTime = new Date(iventDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            return `${iventDate} - ${iventTime}`
        } else { return `not date` }
}
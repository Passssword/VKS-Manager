const Sidebar_Block = document.querySelector('.sidebar')
const pageHeader = document.getElementById('pageHeader');
const sortSettingsBlock = document.getElementById('sortSettingsBlock');
const input_report_beginDate = document.getElementById('input_report_beginDate');
const input_report_endDate = document.getElementById('input_report_endDate');
const btn_createTimetable = document.getElementById('btn_createTimetable');
const schedule_Day_content_block = document.getElementById('schedule_Day_content');
const schedule_Day_table = document.getElementById('schedule_Day_table');
const schedule_Day_dateBegin = document.getElementById('schedule_Day_dateBegin');
const schedule_Day_dateEnd = document.getElementById('schedule_Day_dateEnd');
const btn_printTimetable = document.getElementById('btn_printTimetable');



btn_createTimetable.onclick = function () {
    // Получаем даты на начало дня и конец дня
    const beginDate = new Date(input_report_beginDate.value).setHours(0)
    const endDate = new Date(input_report_endDate.value).setHours(23,59,59)

    eel.GetJudgesData()().then(async judgesData => {
        let Events = await eel.GetAllFromDiapazonDate(beginDate, endDate)()
        renderTable(Events, judgesData)
    })

    // Заполнение поля даты отчета
    schedule_Day_dateBegin.innerHTML = getDateFromMS(Date.parse(input_report_beginDate.value))
    schedule_Day_dateEnd.innerHTML = getDateFromMS(Date.parse(input_report_endDate.value))
}

btn_printTimetable.onclick = function () {
    pageHeader.style.display = 'none'
    sortSettingsBlock.style.display = 'none'
    Sidebar_Block.style.display = 'none'
    window.print();
    pageHeader.style.display = 'block'
    sortSettingsBlock.style.display = 'block'
    Sidebar_Block.style.display = 'block'
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
    
    let createArray_Table_Content = createHtmlTableContent(data, judges)
    let createHTML_Table_Content = getHtmlFromArray(createArray_Table_Content)

    schedule_Day_table.innerHTML = schedule_Day_Table_Headers + createHTML_Table_Content
}

const createHtmlTableContent = (dataContent, judgesDataObject) => {
    console.log(dataContent)
    let stringCounter = 0;
    return dataContent.map(dataObject => {
        stringCounter++
        let judgeObj = judgesDataObject.find( judgesData => judgesData.Id == dataObject[4])
        return `<tr>
                    <td>${stringCounter}.</td>
                    <td>${getDatetimeFromMS(dataObject[1])}</td>
                    <td>${dataObject[2]}</td>
                    <td>${judgeObj.name}</td>
                    <td>${dataObject[5]}</td>
                    <td>${dataObject[6]}</td>
                </tr>`
    })
}

const getHtmlFromArray = (arrayContent) => {
    let stringValue = ""
    arrayContent.forEach(element => {
        stringValue += element
    });
    return stringValue
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
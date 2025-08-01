const reportDate_begin = document.getElementById('reportDate_begin');
const reportDate_end = document.getElementById('reportDate_end');
const btn_reportDate = document.getElementById('btn_reportDate');
const AllEventsCount = document.getElementById('reportDate_AllEventsCount');
const OutputCount = document.getElementById('reportDate_OutputCount');
const InputCount = document.getElementById('reportDate_InputCount');
const Hall2_Count = document.getElementById('reportDate_Hall2_count');
const Hall4_Count = document.getElementById('reportDate_Hall4_count');
const judgeTable = document.getElementById('judgeTableID');

function CalculateStatistics (eventsArray) {
    const results = {
        totalEvents: eventsArray.length,
        totalOutputsCount: 0,
        totalInputsCount: 0,
        totalHall2Count: 0,
        totalHall4Count: 0
    }
    eventsArray.forEach(element => {
        if(element[3] == 'Outbox') {results.totalOutputsCount++}
        if(element[3] == 'Inbox') {results.totalInputsCount++}
        if(element[5] == '2') {results.totalHall2Count++}
        if(element[5] == '4') {results.totalHall4Count++}
    })
    return results
}

btn_reportDate.onclick = function () {
    // Получаем даты на начало дня и конец дня
    const beginDate = new Date(reportDate_begin.value).setHours(0)
    const endDate = new Date(reportDate_end.value).setHours(23,59,59)

    // const reportDateSettingsObject = {
    //     reportDateBegin: beginDate,
    //     reportDateEnd: endDate
    // }

    console.log("Дата на начало дня: "+beginDate)
    console.log("Дата на конец дня: "+endDate)

    eel.GetAllFromDiapazonDate(beginDate, endDate)().then( events => {

        const resultStatistics = CalculateStatistics(events)
        
        AllEventsCount.innerHTML = resultStatistics.totalEvents
        OutputCount.innerHTML = resultStatistics.totalOutputsCount
        InputCount.innerHTML = resultStatistics.totalInputsCount
        Hall2_Count.innerHTML = resultStatistics.totalHall2Count
        Hall4_Count.innerHTML = resultStatistics.totalHall4Count
    })
}
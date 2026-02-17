

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
                <td>${judge[3]}</td>
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
let judgesTableCaptions = `<tr>
                            <th>ID</th>
                            <th>Судья</th>
                            <th>Статус</th>
                            <th>Кол-во ВКС</th>
                        </tr>`

function RenderJudgesTable (judgesArray) {
    let judgesMap = mapJudges(judgesArray)
    let judgesHTML = arrToString(judgesMap)
    judgeTable.innerHTML = judgesTableCaptions + judgesHTML
}
document.addEventListener('DOMContentLoaded', async function() {
    
    let judges = await eel.GetAllJudges()()
    
    // judgesData объявлен в другом модуле.
    // Сдесь подготавливаем объект судей для подъсчета кол-ва ВКС
    judgesData = judges.map( judge => {
        judge[3] = 0
        return judge
    })

    RenderJudgesTable(judgesData)
})

const VKSTable_id = document.getElementById('VKSTable_id');
const VKSTable_btnCreateVKS = document.getElementById('VKSTable_btnCreateVKS');

const mapIvents = (ivents, judgesData) => {

    return ivents.map(ivent => {
        let date = null;
        let dateIvent = null;
        let dateCreateIvent = null;

        let registrationDate, reqDate, reqTime = ""
        if(ivent[8]) {
            registrationDate = new Date( parseInt(ivent[8]) ).toISOString()
            reqDate = new Date(registrationDate).toLocaleDateString()
            reqTime = new Date(registrationDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            dateCreateIvent = `${reqDate} - ${reqTime}`
        } else { dateCreateIvent = `not date` }

        let iventDate, iventTime = ""
        if (ivent[1]) {
            let iventDateTime = new Date( parseInt(ivent[1]) ).toISOString()
            iventDate = new Date(iventDateTime).toLocaleDateString()
            iventTime = new Date(iventDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            dateIvent = `${iventDate} - ${iventTime}`
        } else { dateIvent = `not date` }

        let jaugeObj = judgesData.find( judgesData => judgesData.Id == ivent[4])

        return (`
            <tr class="VKSTable_tr_iventWrapper">
                  <td>${ivent[0]}</td>
                  <td><a href="#">${ivent[2]}</a></td>
                  <td><a href="#">${dateIvent}</a></td>
                  <td><a href="#">${ivent[3]}</a></td>
                  <td><a href="#">${isNaN(ivent[4]) ? ivent[4]+' -edit' : jaugeObj.name}</a></td>
                  <td><a href="#">${ivent[5]}</a></td>
                  <td><a href="#">${ivent[7]}</a></td>
                  <td><a href="#">${dateCreateIvent}</a></td>
                  <td>
                    <button class="btn print">Print</button>
                    <button class="btn edit">Edit</button>
                    <button class="btn delete">Delete</button>
                  </td>
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

const AddEventsButtons = (ivenstArr) => {
    const buttonEdit = document.querySelectorAll('.edit')
    const buttonDelete = document.querySelectorAll('.delete')

    let buttonEditIventCount = 0;
    buttonEdit.forEach( element => {
        const ivent = ivenstArr[buttonEditIventCount]
        buttonEditIventCount++
        element.addEventListener('click', (elem) => {
            eel.SetIventEdiPageData(ivent[0], ivent[1], ivent[2], ivent[3], ivent[4], ivent[5], ivent[6], ivent[7], ivent[8])().then( res => {
                if(res == true) {window.location.replace("edit-VKS-Page.html");}
                else {console.log("Somethink wrong")}
            })
        })
    })

    let buttonDeleteIventCount = 0;
    buttonDelete.forEach( element => {
        const ivent = ivenstArr[buttonDeleteIventCount]
        buttonDeleteIventCount++
        element.addEventListener('click', (elem) => {
                const result = confirm("Хотите удалить событие ВКС?")
                if(result == true) {
                        eel.DeleteIvent(ivent[0])().then( res => {
                                if (res== true) {window.location.replace("tableListVKS.html");}
                        })
                }
        })
    })
}

let usersTableCaptions = `<tr>
                            <th>ID</th>
                            <th>Объект ВКС</th>
                            <th>Дата / Время</th>
                            <th>Вх. / Исх.</th>
                            <th>Судья</th>
                            <th>№ Зала</th>
                            <th>Зарегистрировал</th>
                            <th>Дата регистрации</th>
                            <th>Кнопки</th>
                        </tr>`

eel.GetJudgesData()().then(async judgesData => {
    console.log(judgesData)
    let Ivents = await eel.GetAllIvents()()
    console.log(Ivents)

    let iventsMap = mapIvents(Ivents, judgesData)
    let iventsHTML = arrToString(iventsMap)

    VKSTable_id.innerHTML = usersTableCaptions + iventsHTML
    AddEventsButtons(Ivents)
})

VKSTable_btnCreateVKS.onclick = function () {window.location.replace("create-VKS.html");}


// eel.GetAllIvents()().then( ivents => {
//     console.log(ivents)

//     let iventsMap = mapIvents(ivents)
//     let iventsHTML = arrToString(iventsMap)

//     VKSTable_id.innerHTML = usersTableCaptions + iventsHTML
//     AddEventsButtons(ivents)

//     VKSTable_btnCreateVKS.onclick = function () {window.location.replace("create-VKS.html");}
// })
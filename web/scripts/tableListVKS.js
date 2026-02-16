
const Sidebar_Block = mpb1 = document.querySelector('.sidebar')
const VKSList_header_Block = mpb1 = document.querySelector('.VKSList_header')
const VKSList_filters_Block = mpb1 = document.querySelector('.VKSList_subheader')
const VKSTable_id = document.getElementById('VKSTable_id');
const VKSTable_btnCreateVKS = document.getElementById('VKSTable_btnCreateVKS');
const VKSTable_scheduleDay = document.getElementById('VKSTable_scheduleDay');
const Print_InfoVKS_block = document.getElementById('Print_InfoVKS');

const Print_InfoVKS_table = document.getElementById('Print_InfoVKS_tableID');
const Print_InfoVKS_Table_initiator = document.getElementById('Print_InfoVKS_Table_initiator');
const Print_InfoVKS_Table_object = document.getElementById('Print_InfoVKS_Table_object');
const Print_InfoVKS_Table_dateIvent = document.getElementById('Print_InfoVKS_Table_dateIvent');
const Print_InfoVKS_Table_judge = document.getElementById('Print_InfoVKS_Table_judge');
const Print_InfoVKS_Table_hall = document.getElementById('Print_InfoVKS_Table_hall');
const Print_InfoVKS_Table_comment = document.getElementById('Print_InfoVKS_Table_comment');

const Print_InfoVKS_workName = document.getElementById('Print_InfoVKS_workName');
const Print_InfoVKS_dateCreateIvent = document.getElementById('Print_InfoVKS_dateCreateIvent');
const Print_InfoVKS_datePrint = document.getElementById('Print_InfoVKS_datePrint');

let judgesDataObject = null;

const getDateFromMS = async (date_ms) => {
    let iventDate, iventTime = ""
        if (date_ms) {
            let iventDateTime = new Date( parseInt(date_ms) ).toISOString()
            iventDate = new Date(iventDateTime).toLocaleDateString()
            iventTime = new Date(iventDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            return `${iventDate} - ${iventTime}`
        } else { return `not date` }
}

const mapIvents = (ivents, judgesData) => {
    let stringCounter = 0

    return ivents.map(ivent => {
        stringCounter++
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

        let judgeObj = judgesData.find( judgesData => judgesData.Id == ivent[4])
        return (`
            <tr class="VKSTable_tr_iventWrapper">
                  <td>${stringCounter}.</td>
                  <td><a href="#">${ivent[2]}</a></td>
                  <td><a href="#">${dateIvent}</a></td>
                  <td><a href="#">${ivent[3] == 'Inbox' ? 'Входящий ВКС' : 'Исходящий ВКС'}</a></td>
                  <td><a href="#">${judgeObj.name}</a></td>
                  <td><a href="#">${ivent[5]}</a></td>
                  <!-- <td><a href="#">${ivent[7]}</a></td> -->
                  <!-- <td><a href="#">${dateCreateIvent}</a></td> -->
                  <td>
                    <button class="btn print">Печать</button>
                    <button class="btn edit">Редактировать</button>
                    <button class="btn delete">Удалить</button>
                  </td>
            </tr>`)
    })
}

const arrToString = (array) => {
    let stringValue = ""
    array.forEach(element => {
        stringValue += element
    });

    return stringValue
}

const AddEventsButtons = (ivenstArr, halls) => {
    const buttonEdit = document.querySelectorAll('.edit')
    const buttonDelete = document.querySelectorAll('.delete')
    const buttonPrint = document.querySelectorAll('.print')

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

    let buttonPrintIventCount = 0;
    buttonPrint.forEach( element => {
        const ivent = ivenstArr[buttonPrintIventCount]
        buttonPrintIventCount++
        element.addEventListener('click', async (elem) => {
            
            let dateNow = new Date()
            let hallObject = null;


            if(ivent[3] == 'Inbox') {Print_InfoVKS_Table_initiator.innerHTML = ivent[2]}
            else {Print_InfoVKS_Table_initiator.innerHTML = 'Холмский городской суд'}
            Print_InfoVKS_Table_object.innerHTML = ivent[2]
            Print_InfoVKS_Table_dateIvent.innerHTML = await getDateFromMS(ivent[1])
            Print_InfoVKS_Table_judge.innerHTML = judgesDataObject.find( judgesData => judgesData.Id == ivent[4]).name
            if ( ivent[5] == 2 ) {Print_InfoVKS_Table_hall.innerHTML = `${halls[0].HallName} - ${halls[0].IpAdress}`}
            if ( ivent[5] == 4 ) {Print_InfoVKS_Table_hall.innerHTML = `${halls[1].HallName} - ${halls[1].IpAdress}`}
            Print_InfoVKS_Table_comment.innerHTML = ivent[6]
            Print_InfoVKS_workName.innerHTML = ivent[7]
            Print_InfoVKS_dateCreateIvent.innerHTML = await getDateFromMS(ivent[8])
            Print_InfoVKS_datePrint.innerHTML = await getDateFromMS(Date.parse(dateNow))

            Sidebar_Block.style.display = 'none'
            VKSList_header_Block.style.display = 'none'
            VKSList_filters_Block.style.display = 'none'
            Print_InfoVKS_block.style.display = 'block'
            VKSTable_id.style.display = 'none'
            window.print();
            Sidebar_Block.style.display = 'block'
            VKSList_header_Block.style.display = 'block'
            VKSList_filters_Block.style.display = 'block'
            Print_InfoVKS_block.style.display = 'none'
            VKSTable_id.style.display = 'table'
        })
    })
}

let usersTableCaptions = `<tr>
                            <th>№</th>
                            <th>Объект ВКС</th>
                            <th>Дата / Время</th>
                            <th>Вх. / Исх.</th>
                            <th>Судья</th>
                            <th>№ Зала</th>
                            <!-- <th>Зарегистрировал</th> -->
                            <!-- <th>Дата регистрации</th> -->
                            <th>Кнопки</th>
                        </tr>`

eel.GetJudgesData()().then(async judgesData => {
    console.log(judgesData)
    let Ivents = await eel.GetAllIvents()()
    let configData = await eel.ReadConfig()()
    console.log(Ivents)

    let iventsMap = mapIvents(Ivents, judgesData)
    let iventsHTML = arrToString(iventsMap)

    VKSTable_id.innerHTML = usersTableCaptions + iventsHTML
    AddEventsButtons(Ivents, configData.Halls)

    judgesDataObject = judgesData;
})

VKSTable_btnCreateVKS.onclick = function () {window.location.replace("create-VKS.html");}
VKSTable_scheduleDay.onclick = function () {window.location.replace("schedule_Day.html");}

// eel.GetAllIvents()().then( ivents => {
//     console.log(ivents)

//     let iventsMap = mapIvents(ivents)
//     let iventsHTML = arrToString(iventsMap)

//     VKSTable_id.innerHTML = usersTableCaptions + iventsHTML
//     AddEventsButtons(ivents)

//     VKSTable_btnCreateVKS.onclick = function () {window.location.replace("create-VKS.html");}
// })


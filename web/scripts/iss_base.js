const ISS_Table_id = document.getElementById('iss_list_table');

const parse_iss_baseData = async (issData) => {

    const rowCaption = document.createElement("tr");
    const thCaptionHall = document.createElement('th');
    thCaptionHall.textContent = `Помещение ВКС`;
    const thCaptionIP = document.createElement('th');
    thCaptionIP.textContent = `IP-адресс`;
    const thCaptionTerminal = document.createElement('th');
    thCaptionTerminal.textContent = `Терминал`;

    rowCaption.appendChild(thCaptionHall);
    rowCaption.appendChild(thCaptionIP);
    rowCaption.appendChild(thCaptionTerminal);
    ISS_Table_id.appendChild(rowCaption);

    for (const key in issData) {
        const rowCourt = document.createElement("tr");
        const th = document.createElement('th');
        th.textContent = `${issData[key].name}  |  ${issData[key].state}`;
        th.colSpan = 3;
        th.classList.add('iss_list_table_header');
        rowCourt.appendChild(th);
        ISS_Table_id.appendChild(rowCourt); // вставляем построчно
        
        for (const [name, info] of Object.entries(issData[key].halls)) {
            const rowHall = document.createElement("tr");
            const tdName = document.createElement('td');
            tdName.textContent = `${info["name"]}`;
            const tdIp = document.createElement('td');
            tdIp.textContent = `${info["ip-adress"]}`;
            const tdTerminal = document.createElement('td');
            tdTerminal.textContent = `${info["terminal"]}`;
            
            rowHall.appendChild(tdName);
            rowHall.appendChild(tdIp);
            rowHall.appendChild(tdTerminal);
            ISS_Table_id.appendChild(rowHall);
            
          }
      }

    return true
}

document.addEventListener('DOMContentLoaded', async function() {
    eel.iss_baseReadData()().then(async iss_baseData => { parse_iss_baseData(iss_baseData) })
} )
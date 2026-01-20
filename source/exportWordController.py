import eel
from docx import Document
from docx.enum.style import WD_STYLE_TYPE
from datetime import datetime
from source.stateManager import GetJudgesData

@eel.expose
def CreateWordFile(events):
    judgesList = GetJudgesData()

    print("ivent object: " + str(events[0]))
    print("ID: " + str(events[0][0]))

    # ivent object: [19, '1736402400000', 'Наро-Фоминский городской суд', 
    #                'Inbox', '10', '4', 'Участие подсудимой Паниной Л.Е.', 
    #                '--- --- ---', '1752127334000']

    doc = Document()  
    # Добавить заголовок  
    heading = doc.add_heading('ГРАФИК ПРОВЕДЕНИЯ ВИДЕОКОНФЕРЕНЦ-СВЯЗИ В ХОЛМСКОМ ГОРОДСКОМ СУДЕ', 0)
    heading.style = doc.styles['Heading 1']
    # Добавить абзац  
    doc.add_paragraph('''Выборка на диапазон дат: 00.00.0000 - 00.00.0000''')

    table = doc.add_table(rows=1, cols=5)
    table.style = doc.styles['Table Grid']
    hdr_cells = table.rows[0].cells
    hdr_cells[0].text = 'Дата и время начала'
    hdr_cells[1].text = '№ Зала'
    hdr_cells[2].text = 'Ф.И.О.судьи'
    hdr_cells[3].text = 'Суд, рассматривающий дело (учреждение, УФСИН)'
    hdr_cells[4].text = 'Сущность заявки (предмет, допрос свидетеля по делу, ходатайство в порядке ст. 396-399 УПК РФ и т.д.)'

    for event in events:
        dateIvent = ''
        if (event[1]):
            converted_date = datetime.fromtimestamp(int(event[1]) / 1000)
            # let iventDateTime = new Date( parseInt(ivent[1]) ).toISOString()
            # iventDate = new Date(iventDateTime).toLocaleDateString()
            # iventTime = new Date(iventDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            dateIvent = str(converted_date)
        else: dateIvent = 'not date'
        
        row_cells = table.add_row().cells
        row_cells[0].text = dateIvent
        row_cells[1].text = event[5]
        row_cells[2].text = str(FindJudgeFromList(judgesList, int(event[4])))
        row_cells[3].text = event[2]
        row_cells[4].text = event[6]

    doc.add_page_break()

    # Сохранить документ  
    doc.save('my_document.docx')

    return True

def FindJudgeFromList(list, id):
    for elem in list:
        if elem['Id'] == id:
            return elem['name']
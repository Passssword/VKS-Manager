import eel
import sqlite3


@eel.expose
def GetAllIvents():
    try:
        connection = sqlite3.connect('ivents.db')
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM ivents')
        ivents = cursor.fetchall()
        connection.close()
        
        return sorted(ivents, key=lambda x: x[1])

    except Exception as Error:
        print(Error)
        return "Error"

@eel.expose
def CreateNewIvent(iventData):
    createTableQuery = '''
        CREATE TABLE IF NOT EXISTS ivents(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          stateReserve TEXT,
          iventDate TEXT NOT NULL,
          iventObject TEXT,
          iventType TEXT,
          iventJudge TEXT,
          iventHall TEXT,
          iventDescription TEXT,
          iventWorker TEXT,
          iventRegistrationDate TEXT
          )
        '''
    sqlQuery = f'''INSERT INTO ivents(
        iventDate,
        iventObject,
        iventType,
        iventJudge,
        iventHall,
        iventDescription,
        iventWorker,
        iventRegistrationDate) 
        VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ? )'''
    try:
        connection = sqlite3.connect('ivents.db')
        cursor = connection.cursor()
        cursor.execute(createTableQuery)
        cursor.execute(sqlQuery, (
            iventData['iventReserve'],
            iventData['iventDate'],
            iventData['iventObject'],
            iventData['iventType'],
            iventData['iventJudge'],
            iventData['iventHall'],
            iventData['iventDescription'],
            iventData['iventWorker'],
            iventData['registrationDate'],
        ))
        connection.commit()
        connection.close()
        return True
    
    except Exception as Error:
        print(Error)
        return "Error"

@eel.expose
def UpdateIvent(iventData):
    sqlQuery = '''
        UPDATE ivents SET 
        iventDate = ?,
        iventObject = ?,
        iventType = ?,
        iventJudge = ?,
        iventHall = ?,
        iventDescription = ? 
        WHERE id = ?;'''
    try:
        connection = sqlite3.connect('ivents.db')
        cursor = connection.cursor()
        cursor.execute(
            sqlQuery, (
            iventData['iventDate'],
            iventData['iventObject'],
            iventData['iventType'],
            iventData['iventJudge'],
            iventData['iventHall'],
            iventData['iventDescription'],
            iventData['id'])
            )
        connection.commit()
        connection.close()
        return True
    except Exception as Error:
        print(Error)
        return "Error"

@eel.expose
def DeleteIvent(iventID):
    sqlQuery = f"DELETE FROM ivents WHERE id={iventID}"

    try:
        connection = sqlite3.connect('ivents.db')
        cursor = connection.cursor()
        cursor.execute(sqlQuery)
        connection.commit()
        connection.close()
        return True
    except Exception as Error:
        print(Error)
        return "Error"
    
@eel.expose
def GetAllFromDiapazonDate(dateBegin, dateEnd):
    sqlQuery = f'''SELECT * FROM ivents WHERE iventDate > {dateBegin} AND iventDate < {dateEnd}'''
    print(sqlQuery)
    try:
        connection = sqlite3.connect('ivents.db')
        cursor = connection.cursor()
        cursor.execute(sqlQuery)
        ivents = cursor.fetchall()
        connection.close()
        return sorted(ivents, key=lambda x: x[1])
    except Exception as Error:
        print(Error)
        return "Error"

@eel.expose
def DeleteAllFromDiapazonDate(dateBegin, dateEnd):
    # Получить события на диапазон дат
    resultList = GetAllFromDiapazonDate(dateBegin, dateEnd)
    
    # Сформировать объект списка с вложенными кортежами
    ids_list = []
    for element in resultList:
        temporary_tuple = (element[0],)
        ids_list.append(temporary_tuple)
        print(element[0])

    # Удалить события из базы 
    sqlQuery = f'''DELETE from ivents WHERE id=?'''
    try:
        connection = sqlite3.connect('ivents.db')
        cursor = connection.cursor()
        cursor.executemany(sqlQuery, ids_list)
        connection.commit()
        print("Удалено записей:", cursor.rowcount)
        connection.commit()
        cursor.close()
        return "Ok"
    except Exception as Error:
        print(Error)
        return "Error"
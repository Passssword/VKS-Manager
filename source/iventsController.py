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
        
        # sorted_ivenst = sorted(ivents, key=lambda x: x[1])
        # print(sorted_ivenst)
        return sorted(ivents, key=lambda x: x[1])

    except Exception as Error:
        print(Error)
        return "Error"

@eel.expose
def CreateNewIvent(iventData):
    sqlQuery = f'''INSERT INTO ivents(
        iventDate,
        iventObject,
        iventType,
        iventJudge,
        iventHall,
        iventDescription,
        iventWorker,
        iventRegistrationDate) 
        VALUES( ?, ?, ?, ?, ?, ?, ?, ? )'''
    try:
        connection = sqlite3.connect('ivents.db')
        cursor = connection.cursor()
        cursor.execute(sqlQuery, (
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
        return ivents
    except Exception as Error:
        print(Error)
        return "Error"
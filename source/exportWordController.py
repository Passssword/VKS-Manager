import eel
from docx import Document
from docx.enum.style import WD_STYLE_TYPE

@eel.expose
def CreateWordFile(events):
    print(events)
    return True
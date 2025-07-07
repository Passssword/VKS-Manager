import eel
import source.usersController
import source.iventsController
import source.stateManager
import source.autheficationController

eel.init('web')

eel.start('loginPage.html',
          mode='edge'
    #   size=(700,400),
    #   geometry={'tableListVKS.html': {}}
      )

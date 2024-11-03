const Router = require("express")
const router=new Router()
const tableController=require('../controllers/tableController')

router.post('/createTable',tableController.createTable)

router.post('/joinTable',tableController.joinTable)

router.post('/leaveTable',tableController.leaveTable)

router.post('/bet',tableController.placeBet)

router.post('/shipWinnings',tableController.shipWinnings)

router.post('/fold',tableController.fold)

router.get('/:tableId/getTable/',tableController.getTableById)

router.get('/:tableId/start',tableController.startGame)

router.get('/:tableId/deal',tableController.sharedCardsDeal)

router.get('/getAllTables',tableController.getAllTables)

router.get('/del',tableController.delAllTables)



module.exports=router
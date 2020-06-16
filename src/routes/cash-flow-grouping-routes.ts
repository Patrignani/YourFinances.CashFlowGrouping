import * as cashFlowGroupingController from '../controllers/cash-flow-grouping-controller'
import * as express from "express";

const router = express.Router();

router.post('/', cashFlowGroupingController.Post);
router.get('/', cashFlowGroupingController.GetAll);
router.get('/:id', cashFlowGroupingController.GetById);
router.delete('/:id',cashFlowGroupingController.Delete);
router.put('/ActiveInactive/:id',cashFlowGroupingController.ActiveInactive);
router.put('/:id',cashFlowGroupingController.Update);

export default router;
import CashFlowGrouping, { ICashFlowGrouping, ValidCashFlowGrouping } from '../models/cash-flow-grouping';
import { ResultModel } from '../models/response/result-model';
import * as  noder from 'noder.io';
import { Ioc } from "../config/ioc";

export async function Post(req: any, res: any) {

    let value = new ResultModel<ICashFlowGrouping>();

    try {

        var result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        let cashFlowGrouping: ICashFlowGrouping = new CashFlowGrouping(
            {
                active: req.body.active,
                identification: req.body.identification,
                accountId: result.Account_Id,
                typeBox: req.body.typeBox,
                editionUserId: result.Id_User
            });

        value = ValidCashFlowGrouping(cashFlowGrouping);

        if (value.success) {
            await cashFlowGrouping.save()
            res.status(201).json(value);
        }
        else {
            res.status(400).json(value);
        }
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

export async function GetById(req: any, res: any) {
    let value = new ResultModel<ICashFlowGrouping>();
    try {
        const cashFlowGrouping = await CashFlowGrouping.findOne({ _id: req.params.id });

        value.success = true;
        value.data = cashFlowGrouping;

        res.status(200).json(value);
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

export async function GetAll(req: any, res: any) {
    try {
        var object: ICashFlowGrouping[] = await CashFlowGrouping.find({ active: true });
        //var object: ICashFlowGrouping[] = await CashFlowGrouping.find();
        res.status(200).json(object);
    }
    catch (e) {
        res.status(400).send(e);
    }
}

export async function ActiveInactive(req: any, res: any) {
    let value = new ResultModel<ICashFlowGrouping>();
    try {

        const cashFlowGrouping = await CashFlowGrouping.findOne({ _id: req.params.id });

        if (cashFlowGrouping) {
            var result = noder.$inject(Ioc.TOKEN, function (user) {
                return user;
            });

            cashFlowGrouping.active = req.query.active;
            cashFlowGrouping.editionUserId = result.Id_User;
        }

        await cashFlowGrouping.save();

        value.data = cashFlowGrouping;
        value.success = true;

        res.status(200).json(value);
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

export async function Delete(req: any, res: any) {
    let value = new ResultModel<ICashFlowGrouping>();
    try {

        const cashFlowGrouping = await CashFlowGrouping.findOne({ _id: req.params.id });
        cashFlowGrouping.delete();
        await cashFlowGrouping.save();

        value.data = cashFlowGrouping;
        value.success = true;

        res.status(200).json(value);
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

export async function Update(req: any, res: any) {
    let value = new ResultModel<ICashFlowGrouping>();
    try {

        const cashFlowGrouping = await CashFlowGrouping.findOne({ _id: req.params.id });

        if (cashFlowGrouping) {

            var result = noder.$inject(Ioc.TOKEN, function (user) {
                return user;
            });

            cashFlowGrouping.active = req.body.active;
            cashFlowGrouping.identification = req.body.identification;
            cashFlowGrouping.typeBox = req.body.typeBox;
            cashFlowGrouping.editionUserId = result.Id_User;

            value = ValidCashFlowGrouping(cashFlowGrouping);

            if (value.success) {
                await cashFlowGrouping.save();

                value.data = cashFlowGrouping;
                value.success = true;

                res.status(200).json(value);
            }
            else{
                res.status(400).json(value);
            }
        }
        else {
            value.messages.push("Não foi encontrado nenhum registro com esse Id");
            value.success = false;
            res.status(400).json(value);
        }
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}



import CashFlowGrouping, { ICashFlowGrouping } from '../models/cash-flow-grouping';

export async function RegisterInitCashFlowToAccount(accountId: number) {

    let cashFlowGroupingSalary: ICashFlowGrouping = new CashFlowGrouping(
        {
            accountId: accountId,
            active: true,
            identification: 'Salário',
            typeBox: 1,
            editionUserId: 1
        });

    let cashFlowGroupingElectricityBill: ICashFlowGrouping = new CashFlowGrouping(
        {
            accountId: accountId,
            active: true,
            identification: 'Conta de Luz',
            typeBox: -1,
            editionUserId: 1
        });

    let cashFlowGroupingMarket: ICashFlowGrouping = new CashFlowGrouping(
        {
            accountId: accountId,
            active: true,
            identification: 'Mercado',
            typeBox: -1,
            editionUserId: 1
        });

    let cashFlowGroupingServeral: ICashFlowGrouping = new CashFlowGrouping(
        {
            accountId: accountId,
            active: true,
            identification: 'Diversos',
            typeBox: -1,
            editionUserId: 1
        });

    await cashFlowGroupingSalary.save();
    await cashFlowGroupingElectricityBill.save();
    await cashFlowGroupingMarket.save();
    await cashFlowGroupingServeral.save();
}

export async function InitRegister() {
    var cashFlow: ICashFlowGrouping[] = await CashFlowGrouping.find({ accountId: 1 });

    if (cashFlow.length == 0)
        RegisterInitCashFlowToAccount(1);
}
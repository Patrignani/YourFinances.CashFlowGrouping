import * as amqp from 'amqplib/callback_api'
import { SystemConfig } from '../config/system-config'
import { RegisterInitCashFlowToAccount } from '../service/account-service';

export async function AccountHandler() {


    amqp.connect(SystemConfig.RABBITMQCONNECTION, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            channel.consume('AccountCommandInsert', (msg) => {
                if (msg.content) {
                    var accountCommand = JSON.parse(msg.content.toString());
                    console.log(accountCommand);
                    RegisterInitCashFlowToAccount(accountCommand.AccountId);
                }
            }, {
                noAck: true
            });
        });
    });

}

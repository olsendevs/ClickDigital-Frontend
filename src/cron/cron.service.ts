// cron.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatId } from '@open-wa/wa-automate';
import * as cron from 'node-cron';
import * as schedule from 'node-schedule';
import { CustomerRepository } from 'src/customer/repositories/customer.repository';
import { MessageConfigsRepository } from 'src/message-configs/repositories/message-configs.repository';
import { OpenWAService } from 'src/open-wa/open-wa.service';

@Injectable()
export class CronService implements OnModuleInit {
  constructor(
    private customerRepository: CustomerRepository,
    private messageConfigsRepository: MessageConfigsRepository,
    private openWAService: OpenWAService,
  ) {}
  onModuleInit() {
    cron.schedule('0 0 * * *', async () => {
      try {
        const customers = await this.customerRepository.findActive();
        customers.forEach(async (customer) => {
          const messageConfigs =
            await this.messageConfigsRepository.findByUserId(customer.userId);
          const chatId = (customer.whatsapp + '@c.us') as ChatId;

          let validateDate = new Date(customer.validateDate);
          let tomorow = new Date();
          tomorow = new Date(tomorow.setDate(tomorow.getDate() + 1));
          tomorow = new Date(tomorow.setHours(12));
          tomorow = new Date(tomorow.setMinutes(0));

          const fiveDaysBefore = new Date(
            validateDate.setDate(validateDate.getDate() - 5),
          );
          if (fiveDaysBefore.getDay() == tomorow.getDay()) {
            if (
              messageConfigs.fiveDaysBefore != '' &&
              customer.sendNotificationOn.fiveDaysBefore.sended == false
            ) {
              schedule.scheduleJob(tomorow, async () => {
                await this.openWAService.startSession(customer.userId);
                await this.openWAService.sendMessage(
                  chatId,
                  messageConfigs.fiveDaysBefore,
                );
              });
              customer.sendNotificationOn.fiveDaysBefore.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }

          validateDate = new Date(customer.validateDate);
          const threeDaysBefore = new Date(
            validateDate.setDate(validateDate.getDate() - 3),
          );
          if (threeDaysBefore.getDay() == tomorow.getDay()) {
            if (
              messageConfigs.threeDaysBefore != '' &&
              customer.sendNotificationOn.threeDaysBefore.sended == false
            ) {
              schedule.scheduleJob(tomorow, async () => {
                await this.openWAService.startSession(customer.userId);
                await this.openWAService.sendMessage(
                  chatId,
                  messageConfigs.threeDaysBefore,
                );
              });
              customer.sendNotificationOn.threeDaysBefore.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }

          validateDate = new Date(customer.validateDate);
          const oneDayBefore = new Date(
            validateDate.setDate(validateDate.getDate() - 1),
          );
          if (oneDayBefore.getDay() == tomorow.getDay()) {
            if (
              messageConfigs.oneDayBefore != '' &&
              customer.sendNotificationOn.oneDayBefore.sended == false
            ) {
              schedule.scheduleJob(tomorow, async () => {
                await this.openWAService.startSession(customer.userId);
                await this.openWAService.sendMessage(
                  chatId,
                  messageConfigs.oneDayBefore,
                );
              });
              customer.sendNotificationOn.oneDayBefore.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }

          validateDate = new Date(customer.validateDate);
          const EndDay = new Date(validateDate.setDate(validateDate.getDate()));
          if (EndDay.getDay() == tomorow.getDay()) {
            if (
              messageConfigs.EndDay != '' &&
              customer.sendNotificationOn.EndDay.sended == false
            ) {
              schedule.scheduleJob(tomorow, async () => {
                await this.openWAService.startSession(customer.userId);
                await this.openWAService.sendMessage(
                  chatId,
                  messageConfigs.EndDay,
                );
              });
              customer.sendNotificationOn.EndDay.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }

          validateDate = new Date(customer.validateDate);
          const oneDayAfter = new Date(
            validateDate.setDate(validateDate.getDate() + 1),
          );
          if (oneDayAfter.getDay() == tomorow.getDay()) {
            if (
              messageConfigs.oneDayAfter != '' &&
              customer.sendNotificationOn.oneDayAfter.sended == false
            ) {
              schedule.scheduleJob(tomorow, async () => {
                await this.openWAService.startSession(customer.userId);
                await this.openWAService.sendMessage(
                  chatId,
                  messageConfigs.oneDayAfter,
                );
              });
              customer.sendNotificationOn.oneDayAfter.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }
        });
      } catch (e) {}
    });
  }
}

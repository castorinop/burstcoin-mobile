/*
    Copyright 2017 icewave.org
*/

import { Component, OnInit, NgModule } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Page } from "ui/page";
import { Settings } from "../../../../lib/model";
import { AccountService, NotificationService } from "../../../../lib/services";

// >> passing-parameters
@Component({
    moduleId: module.id,
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {

    addressParts: string[];

    constructor(
        private accountService: AccountService,
        private params: ModalDialogParams,
        private page: Page,
        private notificationService: NotificationService,
        private translateService: TranslateService
    ) {
        this.addressParts = [];
        this.page.on("unloaded", () => {
            this.params.closeCallback();
        });
    }

    ngOnInit() {

    }

    public onTapOk() {
        if (this.accountService.isBurstcoinAddress(this.accountService.constructBurstAddress(this.addressParts))) {
            this.params.closeCallback(this.accountService.constructBurstAddress(this.addressParts));
        } else {
            this.translateService.get('NOTIFICATIONS.ADDRESS').subscribe((res: string) => {
                this.notificationService.info(res);
            });
        }
    }

    public formatAddress() {
        for (let i = 0; i < this.addressParts.length; i++) {
            this.addressParts[i] = this.addressParts[i].toUpperCase()
        }
    }
}
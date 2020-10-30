import { Injectable } from '@nestjs/common';
import { lawForm } from './interface/law.interface';
import { EligibleTerritory } from '../globals/eligibleTerrioty.enum';

@Injectable()
export class LawService {

    constructor() {}

    async isOverseasTerritories(place: string) {
        if (place === EligibleTerritory.AG || place === EligibleTerritory.AS ||
            place === EligibleTerritory.BM || place === EligibleTerritory.BA ||
            place === EligibleTerritory.IO || place === EligibleTerritory.BV ||
            place === EligibleTerritory.CM || place === EligibleTerritory.FK ||
            place === EligibleTerritory.GB || place === EligibleTerritory.MS ||
            place === EligibleTerritory.PC || place === EligibleTerritory.HL ||
            place === EligibleTerritory.TC || place === EligibleTerritory.TK ||
            place === EligibleTerritory.CC) {
                return true;
            } else {
                return false;
            }
    }

    async isRulesActivated(activatedRules: string[], rulesCheck: string) {
        activatedRules.forEach(elem => {
            if (elem === rulesCheck) {
                return true;
            }
        });
        return false;
    }

    async isBornAfter(brithData: string, yearsLimite: string) {
        const yearsBirth = brithData.substr(6);

        var n = +yearsBirth;
        var b = +yearsLimite;

        if (n >= b) {
            return true;
        } else {
            return false;
        }
    }

    async isMajor(birthDate: string) {
        const month = birthDate.substr(3, 2);
        const years = birthDate.substr(6);
        const dateMonth = "11";
        const dateYears = "2020";

        var m = +month;
        var y = +years;
        var dm = +dateMonth;
        var dy = +dateYears;

        if (m <= dm && (y + 18) <= dy) {
            return true;
        } else {
            return false;
        }
    }
}

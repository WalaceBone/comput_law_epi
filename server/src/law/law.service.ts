import { Injectable } from '@nestjs/common';
import { lawForm } from './interface/law.interface';
import { EligibleTerritory } from '../globals/eligibleTerrioty.enum';

@Injectable()
export class LawService {

    constructor() {}

    async isOverseasTerritories(place: string) {
        if (place === EligibleTerritory.AG.toLowerCase() || place === EligibleTerritory.AS.toLowerCase() ||
            place === EligibleTerritory.BM.toLowerCase() || place === EligibleTerritory.BA.toLowerCase() ||
            place === EligibleTerritory.IO.toLowerCase() || place === EligibleTerritory.BV.toLowerCase() ||
            place === EligibleTerritory.CM.toLowerCase() || place === EligibleTerritory.FK.toLowerCase() ||
            place === EligibleTerritory.GB.toLowerCase() || place === EligibleTerritory.MS.toLowerCase() ||
            place === EligibleTerritory.PC.toLowerCase() || place === EligibleTerritory.HL.toLowerCase() ||
            place === EligibleTerritory.TC.toLowerCase() || place === EligibleTerritory.TK.toLowerCase() ||
            place === EligibleTerritory.CC.toLowerCase()) {
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
}

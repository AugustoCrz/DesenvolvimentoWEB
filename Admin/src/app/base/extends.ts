/**
 * Created by vagnerss on 28/04/17.
 */
/**
 * Created by vagnerss on 19/11/16.
 */

interface String {
    padLeft: (size, caracter) => string;
    replaceAll: (needle, replacement) => string;
    isValidDate: () => boolean;
}

String.prototype.padLeft = function (size, caracter) {
    return Array(size - this.length + 1).join(caracter || ' ') + this;
};

String.prototype.replaceAll = function (needle, replacement) {
    return this.split(needle).join(replacement);
};

String.prototype.isValidDate = function () {

    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(this)) {
        return false;
    }

    const parts = this.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
        return false;
    }

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];

};


interface Layout {
    init: Function;
}

declare var Layout: Layout;

interface App {
    showAlert: Function;
    pusher: Function;
    POST: Function;
    GET: Function;
}

declare var App: App;

interface Chart {

    chartDeliveryDay: Function;
    chartDeliveryZone: Function;
    chartOrder: Function;
    chartPayment: Function;
    chartPreparing: Function;
    chartTicket: Function;
    chartEvolutionDailyOrder: Function;
    chartEvolutionDailyRevenues: Function;
    chartOrderMonth: Function;
    chartRevenuesMonth: Function;
    chartEvolutionOrder: Function;
    chartEvolutionRevenues: Function;

}

declare var Chart: Chart;

import moment from "moment";
import "moment/dist/locale/es-mx"
moment.locale("es-mx");

export const getDate = (unformatDate: string): any => {
    if (moment(unformatDate).isSame(moment(), 'day')) return "Hoy";
    if (moment(unformatDate).isSame(moment().subtract(1, 'day'), 'day')) return "Ayer";
    return moment(unformatDate).format("LLLL");
}
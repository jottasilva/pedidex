import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
export default function formatDate(dateString) {
    return dayjs(dateString).locale('pt-br').format('DD [de] MMMM [de] YYYY').toUpperCase();
  }
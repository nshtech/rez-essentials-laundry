export default function statusBody(customerinfo) {
    const laundrystatus = customerinfo.laundrystatus;
    if (laundrystatus) {

        if (laundrystatus == 'picked-up') {
            const result = 'Washing and Folding';
            return result;
        }
        else if (laundrystatus == 'out-of-service') {
            const result = 'No service this week';
            return result;
        }
        else if (laundrystatus === 'delivered-to-dorm') {
            const result = 'Delivered';
            return result;
        }
        else if (laundrystatus === 'delivered-to-SH') {
            const result = 'On the way';
            return result;
        }
        else if (laundrystatus == 'missing') {
            const result = 'No service this week';
            return result;
        }
    }
}
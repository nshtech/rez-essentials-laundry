// Images 

export default function description(customerinfo) {
    const laundrystatus = customerinfo.laundrystatus;
    if (laundrystatus) {

        if (laundrystatus == 'picked-up') {
            return 'Your laundry is currently being washed and will be with you shortly.';
        }
        else if (laundrystatus == 'out-of-service') {
            return 'We miss you! Your laundry bag is out of service this week.';
        }
        else if (laundrystatus === 'delivered-to-dorm') {
            return 'Your clean laundry has been delivered to your dorm.';
        }
        else if (laundrystatus === 'delivered-to-SH') {
            return 'Your fresh laundry is on its way to you.';
        }
        else {
            return 'N/A'
        }
    }
}
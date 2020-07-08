// Images 
import PickedUP from '../../images/picked-up.png'
import Delivered from '../../images/delivered-to-dorm.png'
import NoService from '../../images/out-of-service.png'
import OntheWay from '../../images/on-the-way.png'

export default function statusImage(customerinfo) {
    const laundrystatus = customerinfo.laundrystatus;
    if (laundrystatus) {

        if (laundrystatus == 'picked-up') {
            return PickedUP;
        }
        else if (laundrystatus == 'out-of-service') {
            return NoService;
        }
        else if (laundrystatus === 'delivered-to-dorm') {
            return Delivered;
        }
        else if (laundrystatus === 'delivered-to-SH') {
            return OntheWay;
        }
    }
}
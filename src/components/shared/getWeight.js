export default function getWeight(customerinfo) {
    const weekweight = customerinfo.weekweight;
    if (weekweight) {

        if (weekweight == 'N/A') {
            return "- -";
        }
        else {
            return weekweight;
        }
    }
}

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
        deliveryOption = option
    }
    });

    return deliveryOption || deliveryOption[0];
}


function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {

    /*let remainigDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while (remainigDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');

        if (!isWeekend(deliveryDate)) {
            remainigDays--
        }
    }*/

    const today = dayjs(); // Getting todays date
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days') // getting the delivery date with consideration of all the three options
    const dateString = deliveryDate.format('dddd, MMMM DD') // converting it to a more presentable and readbale format


    return dateString
}
export const getDateAndTime = () => {
    const currentDate = new Date();
    const date = currentDate.getFullYear() + '-' + 
                     String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(currentDate.getDate()).padStart(2, '0');

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return { date, time };
};

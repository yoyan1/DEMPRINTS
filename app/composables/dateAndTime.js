
export const getDateAndTime = () =>{
    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const time = currentDate.toTimeString().split(" ")[0];

    return {date, time}
}
// Function to format date as "January 1, 2024"
export function formatDate(dateString) {
    const date = new Date(dateString);
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  

export  function formatTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; 

    return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
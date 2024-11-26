// Function to format date as "January 1, 2024"
export function formatDate(dateString) {
    const date = new Date(dateString);
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  

export  function formatTime(timeString) {
    const date = new Date('1970-01-01T' + timeString + 'Z'); 
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  
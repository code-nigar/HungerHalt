// export default function countdownTimer(startTime, endTime) {
    
//     console.log(startTime + "-" + endTime + " = " + (endTime - startTime));
  
//     let remSec, remMin, remHr, remDay;
  
//     remSec = Math.round(((endTime - startTime) / 1000) % 60);
//     remMin = Math.floor(((endTime - startTime) / (60 * 1000)) % 60);
//     remHr = Math.floor(((endTime - startTime) / (60 * 60 * 1000)) % 24);
//     remDay = Math.floor((endTime - startTime) / (24 * 60 * 60 * 1000) % 30);
//     console.log(
//       remSec + "s \n" + remMin + "m \n" + remHr + "h \n" + remDay + "d \n" 
//     )

//     return { remDay, remHr, remMin, remSec }

// }
// import countdownTimer from './timerFunction'
// import { useEffect, useState } from "react";

// export default function Timer({data}) {

//   const [days, setDays] = useState(0)
//   const [hours, setHours] = useState(0)
//   const [minutes, setMinutes] = useState(0)
//   const [seconds, setSeconds] = useState(0)
//   let [creationTime, setCreationTime] = useState(new Date())

//   useEffect(()=>{
    
//     let outputObj = countdownTimer(creationTime, data.duration)
//     console.log("effect says", countdownTimer(data.createdAt, data.duration));

//     // setDays(Days);
//     // setHours(Hours);
//     // setMinutes(Minutes);
//     // setSeconds(Seconds);
//     setDays(outputObj.remDay);
//     setHours(outputObj.remHr);
//     setMinutes(outputObj.remMin);
//     setSeconds(outputObj.remSec);

//     //keep the timer running while end time occurs
//     if(creationTime.getTime() < data.duration.getTime()){
//         setCreationTime(new Date());
//     }

//     //duration time ka nam badal ky end time rakhlo zyada acha rhega samjhne mai

//   }, [creationTime])
  


//   return (
//     <div className="timer">
//       <div className="timer-label">Ends In:</div>
//       <h4 className="days">
//         <span>{days}</span>
//         <span className="days-label">DAYS</span>
//       </h4>
//       <span>:</span>
//       <h4 className="hours">
//         <span>{hours}</span>
//         <span className="hours-label">HOURS</span>
//       </h4>
//       <span>:</span>
//       <h4 className="minutes">
//         <span>{minutes}</span>
//         <span className="minutes-label">MINUTES</span>
//       </h4>
//       <span>:</span>
//       <h4 className="seconds">
//         <span>{seconds}</span>
//         <span className="seconds-label">SECONDS</span>
//       </h4>
//     </div>
//   );
// }
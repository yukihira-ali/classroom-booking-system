import { useState, useEffect } from "react";

export default function CurrentDate() {
    //currentDate is a state variable that holds the current date and time.
    //setCurrentDate is the function to update the currentDate state.
    //useState(new Date()) initializes currentDate with the current date and time when the component is first rendered.
    const [currentDate, setCurrentDate] = useState(new Date());
    //useEffect is used to run the code inside it when the component is first mounted
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        //Return cleanup: ensures that when the component is unmounted (removed from the DOM), the interval is cleared, preventing memory leaks
        return () => {
            clearInterval(intervalId);
        }
    }, [])


    return (
        <div className="d-flex flex-column align-items-center">
            {/* Displays a label "Date and Time" */}
            <span className="font-weight-bold">Date and Time</span>
            {/* Displays the currentDate in a human-readable format based on the user's locale */}
            <span className="text-muted">{currentDate.toLocaleString()}</span>
        </div>
    );
}
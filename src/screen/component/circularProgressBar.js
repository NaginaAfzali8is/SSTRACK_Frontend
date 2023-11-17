import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar({ activityPercentage, size, emptyUrl }) {
  const [progress, setProgress] = useState();

  useEffect(() => {
    // Simulate a process that updates the progress over time
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 10);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);

  // Calculate the strokeDashoffset and color based on progress
  const circumference = 314; // Total circumference of the circle
  // Calculate the strokeDashoffset to start from the right side
  const strokeDashoffset = circumference - (activityPercentage / 100) * circumference;
  // Conditionally set the color to red if activityPercentage is 0.00
  const color = activityPercentage === 0.00 || emptyUrl === 0 ? 'red' : `hsl(${activityPercentage}, 100%, 50%)`;

  const circleStyle = {
    stroke: color,
    strokeDasharray: circumference,
    strokeDashoffset: strokeDashoffset,
    // Rotate the circle by 90 degrees to make it vertical
    transform: 'rotate(-90deg)',
    transformOrigin: 'center',
  };

  return (
    // <div className="App">
    //   <div className="progress-container mt-1">
    //     <svg className="progress-circle" viewBox="0 0 100 100" width={size} height={size}>
    //       <circle
    //         cx="50"
    //         cy="50"
    //         r="45"
    //         fill="transparent"
    //         strokeWidth="10"
    //         style={circleStyle}
    //       />
    //     </svg>
    //   </div>
    // </div>
    // <CircularProgressbar
    //   value={activityPercentage}
    //   styles={{
    //     trail: circleStyle,
    //     background: {
    //       fill: circleStyle.stroke
    //     }
    //   }}
    // />
    <CircularProgressbar
      value={activityPercentage}
      strokeWidth={20}
      styles={buildStyles({
        pathColor: activityPercentage === 0.00 || emptyUrl === 0 ? 'red' : `hsl(${activityPercentage}, 100%, 50%)`,
        // trailColor: 'transparent',
        // backgroundColor: 'transparent',
      })}
    />
  );
}

export default CircularProgressBar;

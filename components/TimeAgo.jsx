'use client'
import React, { useState, useEffect } from 'react';

const TimeAgo = ({ timestamp,size }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate the difference between current time and the timestamp
      const now = new Date().getTime();
      const difference = now - timestamp;

      // Determine the human-readable time ago
      let timeAgo = '';
      if (difference < 1000 * 60) {
        timeAgo = 'Şimdi';
      } else if (difference < 1000 * 60 * 60) {
        timeAgo = `${Math.floor(difference / (1000 * 60))} dk önce`;
      } else if (difference < 1000 * 60 * 60 * 24) {
        timeAgo = `${Math.floor(difference / (1000 * 60 * 60))} s önce`;
      } else {
        timeAgo = `${Math.floor(difference / (1000 * 60 * 60 * 24))} g önce`;
      }

      // Update the timeAgo state
      setTimeAgo(timeAgo);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <div style={{fontSize:size}}>{timeAgo}</div>;
};

export default TimeAgo;
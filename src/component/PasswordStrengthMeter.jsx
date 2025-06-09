/* eslint-disable react/prop-types */
// components/PasswordStrengthMeter.jsx
import { useState, useEffect } from 'react';

const PasswordStrengthMeter = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  const calculateStrength = (pwd) => {
    let score = 0;
    const feedbackItems = [];

    if (!pwd) {
      setStrength(0);
      setFeedback([]);
      return;
    }

    // Length check
    if (pwd.length >= 8) {
      score += 25;
      feedbackItems.push({ text: 'At least 8 characters', met: true });
    } else {
      feedbackItems.push({ text: 'At least 8 characters', met: false });
    }

    // Lowercase check
    if (/[a-z]/.test(pwd)) {
      score += 25;
      feedbackItems.push({ text: 'One lowercase letter', met: true });
    } else {
      feedbackItems.push({ text: 'One lowercase letter', met: false });
    }

    // Uppercase check
    if (/[A-Z]/.test(pwd)) {
      score += 25;
      feedbackItems.push({ text: 'One uppercase letter', met: true });
    } else {
      feedbackItems.push({ text: 'One uppercase letter', met: false });
    }

    // Number check
    if (/\d/.test(pwd)) {
      score += 25;
      feedbackItems.push({ text: 'One number', met: true });
    } else {
      feedbackItems.push({ text: 'One number', met: false });
    }

    setStrength(score);
    setFeedback(feedbackItems);
  };

  const getStrengthColor = () => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-yellow-500';
    if (strength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-700 rounded-full h-1 gap-1">
          <div
            className={`h-1 rounded-full transition-all duration-300 gap-1 ${getStrengthColor()}`}
            style={{ width: `${strength}%` }}
          ></div>
        </div>
        <span
          className={`text-sm font-medium ${getStrengthColor().replace(
            'bg-',
            'text-'
          )}`}
        >
          {getStrengthText()}
        </span>
      </div> */}

      <ul className="text-sm space-y-1 gap-1">
        {feedback.map((item, index) => (
          <li
            key={index}
            className={`flex items-center space-x-2 gap-1 ${
              item.met ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <span>{item.met ? '✓' : '○'}</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrengthMeter;

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiButton() {
  useEffect(() => {
    // Menambahkan event listener untuk memicu efek confetti
    const button = document.getElementById('confetti-button');
    if (button) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, []);

  return (
    <button id='confetti-button' className='btn btn-primary' hidden></button>
  );
}

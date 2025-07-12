// hooks/useFaviconBadge.js
import { useEffect } from 'react';

function useFaviconBadge(count) {
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (!favicon) return;

    const img = new Image();
    img.src = favicon.href;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');

      // Draw original favicon
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 32, 32);

      if (count > 0) {
        // Draw red badge circle
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(24, 8, 8, 0, 2 * Math.PI);
        ctx.fill();

        // Draw white count text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(count > 99 ? '99+' : count.toString(), 24, 8);
      }

      // Replace favicon
      const newFaviconURL = canvas.toDataURL('image/png');
      favicon.href = newFaviconURL;
    };
  }, [count]);
}

export default useFaviconBadge;

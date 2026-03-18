import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // ເຮັດໃຫ້ເມົາສ໌ທຳອິດຫາຍໄປ (Optional, ແຕ່ແນະນຳໃຫ້ເຮັດຜ່ານ CSS)
    
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Cursor ຫຼັກ (ເຄື່ອນທີ່ໄວ)
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });

      // Follower (ເຄື່ອນທີ່ຊ້າກວ່າ ເພື່ອຄວາມ Smooth)
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(follower, {
        scale: 2.5,
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // ສີນ້ຳເງິນອ່ອນໆ
        borderColor: 'rgba(59, 130, 246, 1)',
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // ດັກຈັບ Hover Element ທັງໝົດ
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* ວົງມົນນ້ອຍ (ຈຸດໃຈກາງ) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* ວົງມົນໃຫຍ່ (ແລ່ນນຳຫຼັງ) */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
};

export default CustomCursor;

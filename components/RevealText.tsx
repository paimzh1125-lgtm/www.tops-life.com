import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface RevealTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  delay?: number;
  duration?: number;
}

const RevealText: React.FC<RevealTextProps> = ({ 
  text, 
  className = "", 
  tag = 'div', 
  delay = 0,
  duration = 1.2
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const Tag = tag;

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Split text logic manually since SplitText is premium
    const words = containerRef.current.querySelectorAll('.word');
    
    gsap.fromTo(words, 
      { 
        y: 60, 
        opacity: 0,
        filter: 'blur(10px)'
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: duration,
        stagger: 0.05,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [text, delay, duration]);

  // Split string into words wrapped in spans
  const renderText = () => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em]">
         <span className="word inline-block">{word}</span>
      </span>
    ));
  };

  return (
    <Tag ref={containerRef as any} className={className}>
      {renderText()}
    </Tag>
  );
};

export default RevealText;
import { curve, heroBackground, robot } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef, useState, useEffect } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";

const Hero = () => {
  const parallaxRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Handle video progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration;
  };

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Transform Mathematics Learning with&nbsp;AI&nbsp;Powered&nbsp;
            <span className="inline-block relative">
              NumenAI{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Experience the future of mathematics education with NumenAI. Our AI-powered tutor combines Augmented Reality and gesture-based learning to make complex mathematical concepts easy to understand and visualize.
          </p>
          <Button href="/pricing" white>
            Get started
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              
              <div className="relative">
                <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] relative group">
                  <video
                    ref={videoRef}
                    src={robot}
                    className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%] cursor-pointer"
                    width={1024}
                    height={490}
                    alt="AI"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onClick={handleVideoClick}
                  />

                  {/* Control overlay - ensure it's above the video */}
                  <div className="absolute inset-0 z-20">
                    {/* Control buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={toggleMute}
                        className="p-2 rounded-full bg-n-8/80 hover:bg-n-8 transition-colors duration-200 cursor-pointer"
                      >
                        {isMuted ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-n-1">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 12C17.0039 13.3308 16.4774 14.6024 15.54 15.54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-n-1">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M23 9L17 15M17 9L23 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>

                      <button
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-n-8/80 hover:bg-n-8 transition-colors duration-200 cursor-pointer"
                      >
                        {isPlaying ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-n-1">
                            <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                            <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-n-1">
                            <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Video progress bar */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-2 bg-n-8/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                      onClick={handleProgressClick}
                    >
                      <div 
                        className="h-full bg-color-1 transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2 z-10" />

                  <ScrollParallax isAbsolutelyPositioned>
                    <ul className="hidden absolute -left-[7rem] top-[60%] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex z-20">
                      {heroIcons.map((icon, index) => (
                        <li className="p-5" key={index}>
                          <img src={icon} width={24} height={25} alt={icon} />
                        </li>
                      ))}
                    </ul>
                  </ScrollParallax>

                  <ScrollParallax isAbsolutelyPositioned>
                    <Notification
                      className="hidden absolute -right-[7rem] top-[50%] w-[18rem] xl:flex z-20"
                      title="Code generation"
                    />
                  </ScrollParallax>
                </div>
              </div>
            </div>

            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles />
        </div>

        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;

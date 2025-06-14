import useMediaQuery from "@/hooks/useMediaQuery";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

// motion variants
const motionVariants = {
  groupImage: {
    hidden: { top: "-7rem", transition: { duration: 0.8, ease: "easeInOut" } },
    visible: (isMobile: boolean) => ({
      top: isMobile ? "30vh" : "7vh",
      transition: { duration: 0.8, ease: "easeInOut" },
    }),
  },
  imageSlide: {
    hidden: { y: "-30vh", transition: { duration: 0.8, ease: "easeInOut" } },
    visible: { y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  },
  floating: {
    initial: { scale: 1 },
    animate: {
      scale: [0.8, 1.1, 1.0],
      transition: {
        duration: 0.6,
        ease: "circInOut",
        delay: 1,
      },
    },
  },
  fadeText: {
    initial: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 1.6,
      },
    },
  },
};

function FeatureSection() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const containerRef = useRef(null);
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isInView1 = useInView(sectionRef1, { once: true, margin: "-50%" });
  const isInView2 = useInView(sectionRef2, { once: true, margin: "-50%" });

  const groupTextOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.2, 0.4, 0.6],
    [0, 1, 1, 0],
  );
  const inviteTextOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    return groupTextOpacity.onChange((latest) => {
      const isVisibleThreshold = latest >= 0.1;
      setTextVisible(isVisibleThreshold);
    });
  }, [groupTextOpacity]);

  const groupTextStyle = useMemo(
    () => ({
      opacity: groupTextOpacity,
    }),
    [groupTextOpacity],
  );
  const inviteTextStyle = useMemo(
    () => ({
      opacity: inviteTextOpacity,
    }),
    [inviteTextOpacity],
  );

  return (
    <>
      <div ref={containerRef} className="px-4 h-[400vh] relative ">
        <motion.section className={`sticky top-[5rem] sm:top-[30%] px-4 `}>
          <motion.div
            ref={sectionRef1}
            className={`p-[1px] max-w-[62rem] mx-auto rounded-[2.5rem] h-[85vh] sm:h-[30rem] ${
              isInView1
                ? "bg-gradient-to-r from-emerald-500 to-lime-300"
                : "bg-[rgba(248,250,252,0.1)]"
            }`}
          >
            <div className="relative w-full h-full rounded-[2.5rem] bg-bg-primary backdrop-blur-[12px] shadow-[0_0_12px_2px_rgba(255,255,255,0.25)] overflow-hidden">
              <motion.p
                style={groupTextStyle}
                className="absolute top-12 left-8 sm:top-[5.3rem] sm:left-[4rem] md:text-2xl"
              >
                <Image
                  src="/icons/landing/icon-landing-folder.svg"
                  alt="폴더 아이콘"
                  width={48}
                  height={48}
                  className="mb-2 sm:mb-4"
                />
                그룹으로
                <br />할 일을 관리해요
              </motion.p>

              <motion.div
                variants={motionVariants.groupImage}
                initial="hidden"
                animate={textVisible ? "visible" : "hidden"}
                custom={isMobile}
                className="relative top-[7rem] h-[calc(100vh-8rem)] overflow-hidden px-8"
              >
                <motion.div
                  variants={motionVariants.imageSlide}
                  initial="hidden"
                  animate={textVisible ? "visible" : "hidden"}
                  className="relative sm:absolute w-full max-w-[23rem] aspect-[375/812] overflow-hidden rounded-[1.5rem] sm:right-[4rem]"
                >
                  <Image
                    src="/images/landing/landing-feature-bg.png"
                    fill
                    alt="예시 이미지"
                  />

                  <motion.div
                    style={inviteTextStyle}
                    className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]"
                  >
                    <div className="w-full h-full flex justify-center items-end overflow-hidden">
                      <div className="relative w-full max-w-[23rem] aspect-[375/195] relative overflow-hidden rounded-xl">
                        <Image
                          src="/images/landing/landing-modal.png"
                          fill
                          alt="멤버 초대 모달"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.p
                style={inviteTextStyle}
                className="absolute bottom-12 left-8 sm:bottom-[5.3rem] sm:left-[4rem] md:text-2xl"
              >
                <Image
                  src="/icons/landing/icon-landing-message.svg"
                  alt="메일 아이콘"
                  width={48}
                  height={48}
                  className="mb-2 sm:mb-4"
                />
                간단하게 멤버들을 <br />
                초대해요
              </motion.p>
            </div>
          </motion.div>
        </motion.section>
      </div>
      <div className="px-4 h-[200vh] mt-8">
        <motion.section className="sticky top-[5rem] sm:top-[30%] px-4">
          <motion.div
            ref={sectionRef2}
            className={`p-[1px] max-w-[62rem] mx-auto rounded-[2.5rem] h-[85vh] sm:h-[30rem] ${
              isInView2
                ? "bg-gradient-to-r from-emerald-500 to-lime-300"
                : "bg-[rgba(248,250,252,0.1)]"
            }`}
          >
            <div className="relative w-full h-full rounded-[2.5rem] bg-[#020617] backdrop-blur-[12px] shadow-[0_0_12px_2px_rgba(255,255,255,0.25)] overflow-hidden">
              <div className="relative bottom-0 h-[calc(100vh-8rem)] overflow-hidden px-8 sm:px-[4rem]">
                <div className="relative w-full max-w-[23rem] aspect-[375/566] sm:-translate-y-[15vh]">
                  <Image
                    src="/images/landing/landing-feature-bg02.png"
                    alt="할일 완료 예시"
                    fill
                  />

                  <div>
                    <motion.div
                      variants={motionVariants.floating}
                      initial="initial"
                      animate={isInView2 ? "animate" : "initial"}
                      className="absolute bottom-2 right-2"
                    >
                      <Image
                        src="/images/landing/landing-floating.png"
                        width={111}
                        height={35}
                        alt="완료하기"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.p
                variants={motionVariants.fadeText}
                initial="initial"
                animate={isInView2 ? "visible" : "initial"}
                className="absolute bottom-12 left-8 sm:right-[4rem] sm:left-auto md:text-2xl"
              >
                <Image
                  src="/icons/landing/icon-landing-check.svg"
                  alt="체크 아이콘"
                  width={48}
                  height={48}
                  className="mb-2 sm:mb-4"
                />
                할 일도 간편하게 <br />
                체크해요
              </motion.p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}

export default FeatureSection;

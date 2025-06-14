"use client";

import React, { useCallback, useEffect, useRef } from "react";

const GRID_SIZE = 80;
const GRID_COLOR = "rgb(41, 48, 65)";
const HIGHLIGHT_COLOR = "#1cedac";
const HIGHLIGHT_RADIUS = 80;

const HIGHLIGHT_LINE_LENGTH = 250;
const HIGHLIGHT_FADE_OFFSET = 60;

interface MousePosition {
  x: number;
  y: number;
}

interface InteractiveGridBgProps {
  currentMousePos: MousePosition;
  className?: string;
}

function InteractiveGridBg({
  currentMousePos,
  className,
}: InteractiveGridBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = GRID_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = GRID_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (currentMousePos.x !== -1 && currentMousePos.y !== -1) {
        const applyGradient = (
          linePos: number,
          mouseCoord: number,
          isVertical: boolean,
          lineLength: number,
        ) => {
          const distanceToMouse = Math.abs(
            linePos - (isVertical ? currentMousePos.x : currentMousePos.y),
          );

          if (distanceToMouse < HIGHLIGHT_RADIUS) {
            let startCoord = mouseCoord - HIGHLIGHT_LINE_LENGTH / 2;
            let endCoord = mouseCoord + HIGHLIGHT_LINE_LENGTH / 2;

            startCoord = Math.max(0, startCoord);
            endCoord = Math.min(lineLength, endCoord);

            ctx.beginPath();
            if (isVertical) {
              ctx.moveTo(linePos, startCoord);
              ctx.lineTo(linePos, endCoord);
            } else {
              ctx.moveTo(startCoord, linePos);
              ctx.lineTo(endCoord, linePos);
            }

            const alpha = Math.max(
              0,
              1 -
                (distanceToMouse - HIGHLIGHT_FADE_OFFSET) /
                  (HIGHLIGHT_RADIUS - HIGHLIGHT_FADE_OFFSET),
            );
            ctx.strokeStyle = `${HIGHLIGHT_COLOR.slice(0, 7)}${Math.floor(
              alpha * 255,
            )
              .toString(16)
              .padStart(2, "0")}`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        };

        for (let x = 0; x <= width; x += GRID_SIZE) {
          applyGradient(x, currentMousePos.y, true, height);
        }

        for (let y = 0; y <= height; y += GRID_SIZE) {
          applyGradient(y, currentMousePos.x, false, width);
        }
      }
    },
    [currentMousePos],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.8;
      drawGrid(ctx, canvas.width, canvas.height);
    };

    const animate = () => {
      handleResize();

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawGrid]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 w-full h-[70vh] ${className || ""}`}
    />
  );
}

export default InteractiveGridBg;

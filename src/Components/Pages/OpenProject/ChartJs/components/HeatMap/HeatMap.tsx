import useResizeObserver from "@react-hook/resize-observer";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeatMapContainer } from "./Style";
import { getMatchedData } from "@/Hook";

const HeatMap = ({
  hrms,
  mainData,
  setLineData,
  type,
  dividerValue,
  setDividerValue,
  getType,
}: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dividerRatio, setDividerRatio] = useState<number>(0.5);
  const [counts, setCounts] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const marginRatio = 0.01;
  const margin = (hrms.max - hrms.min) * marginRatio;

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio;
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;
    const extraHeight = 10;
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.scale(scale, scale);
    ctx.translate(0, extraHeight);
    hrms.numbers.forEach((value: any) => {
      const normalized =
        (value - (hrms.min - margin)) / (hrms.max - hrms.min + 2 * margin || 1);
      const x = normalized * canvasWidth;
      ctx.beginPath();
      ctx.moveTo(x, 10);
      ctx.lineTo(x, canvasHeight - 10);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    const dividerPosition = dividerRatio * canvasWidth;
    const leftPoints = hrms.numbers.filter(
      (value: any) =>
        ((value - (hrms.min - margin)) /
          (hrms.max - hrms.min + 2 * margin || 1)) *
          canvasWidth <
        dividerPosition
    );
    const rightPoints = hrms.numbers.filter(
      (value: any) =>
        ((value - (hrms.min - margin)) /
          (hrms.max - hrms.min + 2 * margin || 1)) *
          canvasWidth >=
        dividerPosition
    );
    setCounts({ left: leftPoints.length, right: rightPoints.length });
    const currentDividerValue = hrms.min + dividerRatio * (hrms.max - hrms.min);
    setDividerValue(currentDividerValue);

    const beforeData = getMatchedData(
      leftPoints ?? [],
      mainData,
      "befor",
      getType
    );
    const afterData = getMatchedData(
      rightPoints ?? [],
      mainData,
      "after",
      getType
    );

    setLineData((prev: any) => ({
      ...prev,
      [type]: {
        ...(prev[type] || {}),
        before: beforeData,
        after: afterData,
      },
    }));
  }, [dividerRatio, hrms, mainData, getType, type, margin]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      if (isDragging) {
        const newDividerRatio = Math.min(Math.max(mouseX / rect.width, 0), 1);
        setDividerRatio(newDividerRatio);
      }
    }
  };

  useResizeObserver(containerRef, (entry) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = entry.contentRect.width;
    render();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    render();
  }, [dividerRatio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    render();
  }, [canvasRef.current, hrms]);

  const handleTouchStart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !canvasRef.current) return;
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const newDividerRatio = Math.min(Math.max(touchX / rect.width, 0), 1);
    setDividerRatio(newDividerRatio);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (hrms?.numbers?.length > 0 && mainData?.length > 0) {
      render();
    }
  }, [render]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);
  return (
    <HeatMapContainer
      $counts={counts}
      $dividerRatio={dividerRatio}
      $isDragging={isDragging}
    >
      <div className="canvasContainer" ref={containerRef}>
        <p className="LeftCounter">{counts.left}</p>
        <p className="RightCounter">{counts.right}</p>
        <div className="main">
          <canvas ref={canvasRef}></canvas>
          <span className="bgCanvas"></span>
          <div
            className="lineContainer"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={handleTouchStart}
          >
            <div className="circleBlack"></div>
            <div className="line"></div>
          </div>
        </div>
        <p className="currentPoint">{dividerValue.toFixed(3)}</p>
        <p className="hrmsMin">{hrms.min !== Infinity ? hrms.min : 0}</p>
        <p className="hrmsMax">{hrms.max !== -Infinity ? hrms.max : 0}</p>
      </div>
    </HeatMapContainer>
  );
};

export default HeatMap;
// .replace(/\.000$/, "")

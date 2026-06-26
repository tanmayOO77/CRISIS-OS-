import { jsPDF } from "jspdf";
import { CrisisOutput } from "../types/crisis";

export function generateCrisisPDF(data: CrisisOutput): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let currentY = 15;

  // Helper: Top divider rule
  const drawDivider = (y: number, color = [40, 40, 40]) => {
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
  };

  // Helper: Text Wrapping Multi-Line
  const drawWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * lineHeight;
  };

  // --- HEADER SECTION ---
  doc.setFillColor(15, 15, 15); // Dark theme flag
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 210, 255); // Cyan
  doc.text("CRISIS OS — SECURE PLANNED BLUEPRINT", margin, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`SESSION RECORD: #COS-${Math.floor(1000 + Math.random() * 9000).toString()}`, margin, 21);
  doc.text(`SYSTEM UTC TIMESTAMP: ${new Date().toISOString()}`, margin, 25);

  // Logo Badge Placeholder
  doc.setDrawColor(0, 210, 255);
  doc.setLineWidth(0.5);
  doc.rect(pageWidth - margin - 25, 10, 25, 15);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("ACTIVE NODE", pageWidth - margin - 23, 19);

  currentY = 45;

  // --- CRISIS PROFILE SECTION ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  const titleHeight = drawWrappedText(data.crisisTitle, margin, currentY, pageWidth - margin * 2, 6);
  currentY += titleHeight + 4;

  // Key Metadata Badges Grid
  doc.setFillColor(245, 247, 250);
  doc.rect(margin, currentY, pageWidth - margin * 2, 16, "F");
  doc.setDrawColor(220, 224, 230);
  doc.rect(margin, currentY, pageWidth - margin * 2, 16, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(100, 110, 120);
  doc.text("CATEGORY", margin + 5, currentY + 5);
  doc.text("SEVERITY", margin + 50, currentY + 5);
  doc.text("TIMELINE / BURNDOWN", margin + 95, currentY + 5);
  doc.text("INTENSITY", margin + 145, currentY + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.text(data.category.toUpperCase(), margin + 5, currentY + 11);
  doc.text(data.severity.toUpperCase(), margin + 50, currentY + 11);
  doc.text(data.timeRemaining.toUpperCase(), margin + 95, currentY + 11);
  doc.text(`${data.urgencyScore}/100 Score`, margin + 145, currentY + 11);

  currentY += 24;

  // --- IMMEDIATE INJUNCTION (HIGHLIGHTED ACTION BOX) ---
  doc.setFillColor(254, 242, 242); // Soft red background
  doc.rect(margin, currentY, pageWidth - margin * 2, 22, "F");
  doc.setDrawColor(239, 68, 68); // Red border
  doc.setLineWidth(0.8);
  doc.rect(margin, currentY, pageWidth - margin * 2, 22, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(185, 28, 28); // Deep red
  doc.text("CRITICAL: IMMEDIATE ACTUATOR REQUISITE", margin + 5, currentY + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39); // Deep dark
  const maxActionWidth = pageWidth - margin * 2 - 10;
  drawWrappedText(data.immediateAction, margin + 5, currentY + 13, maxActionWidth, 5);

  currentY += 28;

  // --- MISSION OBJECTIVE ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 24, 39);
  doc.text("MISSION TARGET OBJECTIVE", margin, currentY);
  currentY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  const objectiveHeight = drawWrappedText(data.missionObjective, margin, currentY, pageWidth - margin * 2, 5);
  currentY += objectiveHeight + 8;

  drawDivider(currentY);
  currentY += 8;

  // --- CHRONOLOGICAL PLAN TIMELINE ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text("CHRONOLOGICAL COUNTER-MEASURES TIMELINE", margin, currentY);
  currentY += 7;

  // Header for Counter-tasks List
  doc.setFillColor(249, 250, 251);
  doc.rect(margin, currentY, pageWidth - margin * 2, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text("TIME", margin + 8, currentY + 5.5);
  doc.text("RECOVER PLAN COUNTER-TASK", margin + 34, currentY + 5.5);
  doc.text("DURATION", margin + 145, currentY + 5.5);
  doc.text("PRIORITY", margin + 168, currentY + 5.5);

  currentY += 12;

  data.rescuePlan.forEach((task, idx) => {
    // Check if near page bottom, append new page
    if (currentY > pageHeight - 35) {
      doc.addPage();
      currentY = 20;

      // Repeat small heading on subsequent pages
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("CRISIS OS — CHRONOLOGICAL BLUEPRINT (CONTINUED)", margin, currentY);
      drawDivider(currentY + 3);
      currentY += 10;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(17, 24, 39);

    // Empty selector box [ ]
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.4);
    doc.rect(margin, currentY - 3, 4, 4);

    // Time
    doc.text(task.time, margin + 8, currentY);

    // Priority Check for color coding
    const prioColor = task.priority.toLowerCase() === "high" || task.priority.toLowerCase() === "critical" ? [185, 28, 28] : [55, 65, 81];
    doc.setTextColor(prioColor[0], prioColor[1], prioColor[2]);
    doc.text(task.priority.toUpperCase(), margin + 168, currentY);

    // Duration / Task
    doc.setTextColor(107, 114, 128);
    doc.text(task.duration, margin + 145, currentY);

    doc.setTextColor(17, 24, 39);
    // Draw task title
    const taskTitleHeight = drawWrappedText(task.task, margin + 34, currentY, 100, 4);
    
    // Draw task details below title
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(75, 85, 99);
    const descHeight = drawWrappedText(task.description, margin + 34, currentY + taskTitleHeight + 0.5, 100, 3.5);

    currentY += taskTitleHeight + descHeight + 6;
  });

  // --- OUTCOME ANALYSIS GRAPHICS (PROBABILITY SHIFT) ---
  if (currentY > pageHeight - 40) {
    doc.addPage();
    currentY = 20;
  } else {
    currentY += 4;
  }

  drawDivider(currentY, [200, 200, 200]);
  currentY += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 24, 39);
  doc.text("PROBABILITY SHIFT RECONSTITUTION", margin, currentY);
  currentY += 6;

  // Shift block drawing
  doc.setFillColor(254, 242, 242);
  doc.rect(margin, currentY, 85, 18, "F");
  doc.setDrawColor(252, 165, 165);
  doc.rect(margin, currentY, 85, 18, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(185, 28, 28);
  doc.text("OUTCOME WITHOUT PLAN", margin + 4, currentY + 5);
  doc.setFontSize(12);
  doc.text(`${data.successProbability.withoutPlan}%`, margin + 4, currentY + 12);

  doc.setFillColor(240, 253, 250);
  doc.rect(margin + 95, currentY, 85, 18, "F");
  doc.setDrawColor(153, 246, 228);
  doc.rect(margin + 95, currentY, 85, 18, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(13, 148, 136);
  doc.text("RECONSTITUTED PREDICTION", margin + 99, currentY + 5);
  doc.setFontSize(12);
  doc.text(`${data.successProbability.withPlan}% Successful Outcomes`, margin + 99, currentY + 12);

  currentY += 28;

  // --- REQUISITE RESOURCES SECTION ---
  if (data.resources && data.resources.length > 0) {
    if (currentY > pageHeight - 50) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(17, 24, 39);
    doc.text("REQUISITE RECOVERY RESOURCE SETS", margin, currentY);
    currentY += 5;

    data.resources.forEach((res) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(20, 80, 180);
      doc.text(`${res.title.substring(0, 50)} [${res.type.toUpperCase()}]`, margin, currentY);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 100, 100);
      doc.text(res.url, margin, currentY + 3.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(75, 85, 99);
      const resReasonHeight = drawWrappedText(res.reason, margin, currentY + 7.5, pageWidth - margin * 2, 3.5);

      currentY += resReasonHeight + 11;
    });
  }

  // Footer Tagline on final page
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Emergency manual prepared autonomously by Crisis OS Command Center.", margin, pageHeight - 10);

  // Trigger Save
  const safeTitle = data.crisisTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").substring(0, 30);
  doc.save(`crisis-os-plan-${safeTitle || "recovery"}.pdf`);
}

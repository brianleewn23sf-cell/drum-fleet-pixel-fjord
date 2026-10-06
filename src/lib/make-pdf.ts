import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function elementToPdfBlob(el: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#f3efe6",
    windowWidth: Math.max(el.scrollWidth, 800),
  });
  const img = canvas.toDataURL("image/jpeg", 0.92);
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgW = pageW;
  const imgH = (canvas.height * pageW) / canvas.width;
  let heightLeft = imgH;
  let y = 0;
  pdf.addImage(img, "JPEG", 0, y, imgW, imgH);
  heightLeft -= pageH;
  while (heightLeft > 0) {
    y -= pageH;
    pdf.addPage();
    pdf.addImage(img, "JPEG", 0, y, imgW, imgH);
    heightLeft -= pageH;
  }
  return pdf.output("blob");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function sharePdfFile(blob: Blob, filename: string, title: string, text: string) {
  const file = new File([blob], filename, { type: "application/pdf" });
  const nav = navigator as Navigator & {
    canShare?: (data: ShareData) => boolean;
  };
  if (typeof nav.share === "function" && nav.canShare?.({ files: [file] })) {
    await nav.share({ files: [file], title, text });
    return "shared";
  }
  downloadBlob(blob, filename);
  return "downloaded";
}

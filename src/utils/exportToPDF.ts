
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportToPDF(elementId: string, title: string){
    const input = document.getElementById(elementId);

    if(!input) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.setFontSize(16);
    pdf.text(title, 40, 40);
    pdf.addImage(imgData, "PNG", 40, 60, pdfWidth - 80, pdfHeight);
    pdf.save(`${title.replace(/\s+/g, "_")}.pdf`);
}
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';

export const printPDF = async (domElement: any) => {
  const canvas = await html2canvas(domElement);

  const img = canvas.toDataURL('image/png');

  const pdf = new jsPdf();

  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  pdf.addImage(img, 'JPEG', 0, 0, width, height);
  pdf.save('recharged-cv.pdf');
};

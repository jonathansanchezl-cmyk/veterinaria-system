import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportarPDF(

    titulo,

    columnas,

    datos

){

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(

        titulo,

        14,

        20

    );

    autoTable(

        doc,

        {

            head:[columnas],

            body:datos,

            startY:30

        }

    );

    doc.save(

        `${titulo}.pdf`

    );

}

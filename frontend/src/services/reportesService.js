import api from "./api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


/**
 * ============================================
 * Obtener un reporte según el tipo y filtros
 * ============================================
 */
export const obtenerReporte = async (filtros = {}) => {

    const params = {};

    if (filtros.tipo && filtros.tipo !== "TODOS") {

        params.tipo = filtros.tipo.toLowerCase();

    }

    if (filtros.desde) {

        params.desde = filtros.desde;

    }

    if (filtros.hasta) {

        params.hasta = filtros.hasta;

    }

    const { data } = await api.get("/reportes", {

        params

    });

    return data;

};

/**
 * ============================================
 * Vista previa
 * ============================================
 */
export const vistaPrevia = async (tipo) => {

    const { data } = await api.get("/reportes", {

        params: {

            tipo: tipo.toLowerCase()

        }

    });

    return data;

};

/**
 * ============================================
 * Exportar Excel
 * (Se implementará en la siguiente fase)
 * ============================================
 */

export const exportarExcel = async (tipo) => {

    const respuesta = await vistaPrevia(tipo);

    const datos = respuesta.registros || [];

    if (datos.length === 0) {

        throw new Error("No existen datos para exportar.");

    }

    const worksheet = XLSX.utils.json_to_sheet(datos);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        tipo

    );

    const excelBuffer = XLSX.write(

        workbook,

        {

            bookType: "xlsx",

            type: "array"

        }

    );

    const archivo = new Blob(

        [

            excelBuffer

        ],

        {

            type:

                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        }

    );

    saveAs(

        archivo,

        `${tipo}_${new Date().toISOString().substring(0,10)}.xlsx`

    );






    return vistaPrevia(tipo);

};

/**
 * ============================================
 * Exportar PDF
 * (Se implementará en la siguiente fase)
 * ============================================
 */
export const exportarPDF = async (tipo) => {

    const respuesta = await vistaPrevia(tipo);

    const datos = respuesta.registros || [];

    if (datos.length === 0) {

        throw new Error("No existen datos para exportar.");

    }

    const pdf = new jsPDF({

        orientation: "landscape",

        unit: "mm",

        format: "a4"

    });

    // ======================================
    // CABECERA
    // ======================================

    pdf.setFontSize(18);

    pdf.setTextColor(22, 78, 99);

    pdf.text(

        "SISTEMA VETERINARIO ANIMALIA",

        14,

        18

    );

    pdf.setFontSize(14);

    pdf.text(

        `Reporte de ${tipo}`,

        14,

        28

    );

    pdf.setFontSize(10);

    pdf.setTextColor(90);

    pdf.text(

        `Fecha de emisión: ${new Date().toLocaleString("es-PE")}`,

        14,

        35

    );

    // ======================================
    // TABLA
    // ======================================

    const columnas = Object.keys(datos[0]);

    const filas = datos.map((item) =>

        columnas.map((c) => item[c])

    );

    autoTable(pdf, {

        startY: 42,

        head: [

            columnas

        ],

        body: filas,

        styles: {

            fontSize: 8

        },

        headStyles: {

            fillColor: [30, 64, 175]

        },

        alternateRowStyles: {

            fillColor: [245, 245, 245]

        }

    });

    // ======================================
    // PIE
    // ======================================

    const paginas = pdf.getNumberOfPages();

    for (let i = 1; i <= paginas; i++) {

        pdf.setPage(i);

        pdf.setFontSize(9);

        pdf.text(

            `Página ${i} de ${paginas}`,

            250,

            195

        );

    }

    pdf.save(

        `${tipo}_${new Date().toISOString().substring(0,10)}.pdf`

    );



    return vistaPrevia(tipo);

};
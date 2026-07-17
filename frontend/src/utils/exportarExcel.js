import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportarExcel(datos, nombreArchivo) {

    const hoja = XLSX.utils.json_to_sheet(datos);

    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        libro,

        hoja,

        "Datos"

    );

    const excel = XLSX.write(

        libro,

        {

            bookType: "xlsx",

            type: "array"

        }

    );

    const archivo = new Blob(

        [excel],

        {

            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        }

    );

    saveAs(

        archivo,

        `${nombreArchivo}.xlsx`

    );

}

import {useEffect,useState} from "react";

import {obtenerDashboard}

from "../services/dashboardService";

export default function useDashboard(){

    const[data,setData]=useState(null);

    const[loading,setLoading]=useState(true);

    const cargar=async()=>{

        try{

            const response=

            await obtenerDashboard();

            setData(response.data);

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        cargar();

    },[]);

    return{

        data,

        loading,

        recargar:cargar

    };

}

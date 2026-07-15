export const required=(valor)=>{

    return valor!==undefined &&

           valor!==null &&

           valor!=="";

};

export const email=(valor)=>{

    return /\S+@\S+\.\S+/.test(valor);

};

export const telefono=(valor)=>{

    return /^[0-9]{9}$/.test(valor);

};

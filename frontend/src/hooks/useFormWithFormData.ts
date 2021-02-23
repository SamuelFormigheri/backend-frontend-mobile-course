import { useCallback } from "react";

const useFormData = () => {

    const formDataToJson = useCallback((formData: FormData) => {
        var object: any = {};
        var tempObj: any = object;
        formData.forEach((value, key) => {
            if(key.includes('.')){
                var aux = tempObj;
                // eslint-disable-next-line
                key.split('.').map((k: string, i: number, val: string[]) => {
                if(k.includes('[') && k.includes(']')){
                    var index = k.substring(k.lastIndexOf('[') + 1, k.lastIndexOf(']'));
                    var newName = k.substring(0, k.lastIndexOf('['));
                    
                    if(!aux[newName])
                        aux[newName] = [];
                    if(!aux[newName][index]) 
                      aux[newName][index] = {};
                    aux = aux[newName][index];
                    if(i === val.length - 1){
                      aux = value;
                    }
                  }else{
                    if(!aux[k])
                      aux[k] = {};
                    aux = (aux[k] = (i === val.length - 1 ? value : {}));
                  }
                });
            }else{
                object[key] = value;
            }
        });
        return tempObj;
    },[]);

    return {
        formDataToJson
    }
}

export default useFormData;
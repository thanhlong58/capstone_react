export const USER_LOGIN  = 'userLogin';
export const TOKEN =  'accesToken';
export const Domain =  'https://shop.cyberlearn.vn'



 const configClient = {
    setStoreJson : (name,data) => {
        let sData = JSON.stringify(data)
        localStorage.setItem(name,sData)
    },
    getStoreJson : (name) => {
        if (localStorage.getItem(name)) {
            let sData = localStorage.getItem(name)
            let data = JSON.parse(sData)
            return data
        }
        return {}
    },

    //lưu chuối 
    setStore :  (name,data) => {
        localStorage.setItem(name,data)
    },
    //lấy chuỗi  
    getStore : (name ) => {
        if (localStorage.getItem(name)) {
            return localStorage.get(name)

        }
        return undefined;
    }
}

export const {setStoreJson,getStoreJson,setStore,getStore} =configClient;



//tạo clone cho axioss 

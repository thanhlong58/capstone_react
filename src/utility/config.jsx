//Tập tin lưu các dữ liệu hằng số hoặc các utility function

import axios from "axios";
import { customNavigate } from "..";
import Swal from "sweetalert2";
export const ARR_CART = 'arrCart'
export const USER_LOGIN = 'userLogin';
export const TOKEN = 'accessToken';
export const DOMAIN = 'https://shop.cyberlearn.vn';

const configClient = {
    setStoreJson: (name, data) => {
        let sData = JSON.stringify(data);
        localStorage.setItem(name, sData);
    },
    getStoreJson: (name) => {
        if (localStorage.getItem(name)) {
            let sData = localStorage.getItem(name);
            let data = JSON.parse(sData);
            return data;
        }
        return {};
    },
    //lưu chuỗi
    setStore: (name, data) => {
        localStorage.setItem(name, data);
    },
    //lấy chuỗi
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name);;
        }
        return undefined;
    }, setCookieJson(name, value, days) {
        //Biến đổi data thành string
        value = JSON.stringify(value);
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }, getCookieJson(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return JSON.parse(c.substring(nameEQ.length, c.length))
            }
        }
        return null;
    }, deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}


export const { setStoreJson, getStoreJson, setStore, getStore,getCookieJson,setCookieJson,deleteCookie } = configClient;

//Tạo bản sao của axios 
export const http = axios.create({
    baseURL: DOMAIN,
    
});

//Cấu hình interceptor cho request (api gửi đi)
http.interceptors.request.use((req)=> {
    // req.data = {...req.data,'abc':'123'}
    req.headers = {...req.headers,
        TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMDQzODQwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAwNTg2MDAwfQ.nqyOmcwBXyqINN0ROA_xI8TKx0Jk05_lwRy4Cdv0j_8`
    }
    if(getStoreJson(USER_LOGIN)){
        req.headers = {...req.headers,
            Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`
        }
    }


    return req;
},err => {
    return Promise.reject(err)
})

//Cấu hình cho interceptor cho response (kết quả trả về)
http.interceptors.response.use((res)=> {
    // res.data.result = 'abc';
    console.log(res.data)
    //Tất cả kết quả trả về từ http đều chạy hàm này
    return res;
}, err => {
    //Xử lý lỗi 
    if(err.response?.status === 401) {
        //Nếu chưa đủ quyền thì đá về login
        customNavigate.push('/login');
        return;
    }
    if(err.response?.status === 400 || err.response?.status  === 404){
        customNavigate.push('/');
        return;

    }
    if(err.response?.status === 500) {
        console.log(err.response?.status)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '"An internal server error occurred. Please try again later.',
            footer: '<a href="">Why do I have this issue?</a>'
          })
       return;
    }
    return Promise.reject(err);
});
/* 
    request: là dữ liệu gửi lên server
    response: là dữ liệu trả về từ server
    status thông dụng:
    200: OK Dữ liệu thao tác trên server thành công và trả về client
    201: Dữ liệu đã được khởi tạo ở phía server
    400: bad request (dữ liệu gửi đi không hợp lệ)
    404: not found (không tìm thấy dữ liệu - do sai link api )
    500: error in server (lỗi xảy ra tại server nguyên nhân có thể cho frontend gửi sai định dạng hoặc backend xử lý logic bị lỗi)
    401: unauthorize (không có quyền truy cập vào api - có thể do thiếu token hoặc token hết hạn)
    403: forbiden (chưa đủ quyền truy cập vào api đó)
*/
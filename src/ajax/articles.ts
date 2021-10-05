import instance from "./interceptors";
import Cookies from "js-cookie";


export function getArticleList(query: any, props: any) {
    instance
        .post('http://localhost:8181/articles',
            JSON.stringify(query),
            {timeout: 86400000, headers: {
                    'Content-type': "application/json",
                    "dataType": "json",
                }}).then((res: any) => {
        if (res.status === 200 && res.data) {
            props.listSuccess(res)
        } else {
            props.listFailure(res)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
};

export function save(data: any, props: any) {
    const qs = require("qs");
    instance
        .post('http://localhost:8181/saveArticle',
            JSON.stringify(data),
            {timeout: 86400000, headers: {
                    'Content-type': "application/json",
                    "dataType": "json",
                    "authorization": Cookies.get("authorization")
                }}).then((res: any) => {
        if (res.status === 200 && res.data) {
            props.saveSuccess(res)
        } else {
            props.saveFailure(res)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
}

export function find(id: number, props: any) {
    instance
        .get(`http://localhost:8181/article/${id}`,
            {timeout: 86400000, headers: {
                    "dataType": "json",
                }}).then((res: any) => {
        if (res.status === 200 && res.data) {
            props.findSuccess(res)
        } else {
            props.findFailure(res)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
}

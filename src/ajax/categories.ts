import instance from "./interceptors";
import client from "../config/client";

export function getCategories(query: any, props: any) {
    instance
        .post(`${client.endpoint}/categories`,
            JSON.stringify(query),
            {timeout: 86400000, headers: {
                    'Content-type': "application/json",
                    "dataType": "json",
                }}).then((res: any) => {
        if (res.status === 200 && res.data) {
            props.listCategorySuccess(res)
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
        .post(`${client.endpoint}/saveArticle`,
            JSON.stringify(data),
            {timeout: 86400000, headers: {
                    'Content-type': "application/json",
                    "dataType": "json",
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
        .get(`${client.endpoint}/article/${id}`,
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

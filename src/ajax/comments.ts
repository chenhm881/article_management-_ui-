import instance from "./interceptors";
import client from "../config/client";
import qs from "qs";
import Cookies from "js-cookie";

export function getComments(query: any, props: any) {
    instance
        .post(`${client.endpoint}/comments`,
            qs.stringify(query),
            {timeout: 86400000, headers: {
                    'Content-type': "application/x-www-form-urlencoded;charset=utf-8",
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

export function save(query: any, props: any) {
    instance
        .post(`${client.endpoint}/comment/save`,
             query,
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


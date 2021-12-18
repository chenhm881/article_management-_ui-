import instance from "./interceptors";
import client from "../config/client";


export function getTags(query: any, props: any) {
    instance
        .post(`${client.endpoint}/tags`,
            query,
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


import instance from "./interceptors";
import client from "../config/client";


export function getTags(query: any, props: any) {
    instance
        .post(`${client.endpoint}/tags`,
            JSON.stringify(query),
            {timeout: 86400000, headers: {
                    'Content-type': "application/json",
                    "dataType": "json",
                }}).then((res: any) => {
        if (res.status === 200 && res.data) {
            props.listTagSuccess(res)
        } else {
            props.listFailure(res)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
};


function wrapPromise(promise) {
    let status = "pending";
    let response;

    const suspender = promise.then(
        res => {
            status = "success";
            response = res;
        },
        err => {
            status = "error";
            response = err;
        }
    );

    const read = () => {
        switch(status) {
            case "pending":
                throw suspender;
            case "error":
                throw response;
            case "success":
                return response;
        }
    }

    return { read };
}

export default wrapPromise;

// const wrapPromise = (promise) => {
//     let status = "pending";
//     let result;
//     let suspend = promise().then(
//         res => {
//             status = "success";
//             result = res;
//         },
//         err => {
//             status = "error";
//             result = err;
//         }
//     );

//     return {
//         read() {
//             if(status === "pending") {
//                 throw suspend;
//             } else if (status === "error") {
//                 throw result;
//             } else if (status === "success") {
//                 return result;
//             }
//         }
//     }
// }

// export default wrapPromise;
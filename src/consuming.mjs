import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
    axios.get('http://localhost:3000/orders/1')
    .then(({data}) => {
        setText(JSON.stringify(data));
    });
}

export function getCatch() {
    // axios.get('http://localhost:3000/orders/123')
    // .then((result) => {
    //     console.log(result);
    //     if(result.status === 200){
    //         setText((JSON.stringify(result.data)));
    //     }else {
    //         setText("Error");
    //     }
    // });

    axios.get('http://localhost:3000/orders/123')
    .then(({data}) => {
        setText(JSON.stringify(data));
    })
    .catch((error) => {
        setText(error);
    });
}

export function chain() {
    axios.get('http://localhost:3000/orders/1')
    .then(({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        setText(`City: ${data.city}`);
    });
}

export function chainCatch() {
    // axios.get('http://localhost:3000/orders/1')
    // .then(({data}) => {
    //     axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);

    //     throw new Error("Error!");
    // })
    // .catch(err => {
    //     setText(err);
    //     // return {data: {}};
    //     throw new Error("Second Error");
    // })
    // .then(({data}) => {
    //     setText(`City: ${data.city}`);
    // })
    // .catch(err => setText(err));

    axios.get('http://localhost:3000/orders/1')
    .then(({data}) => {
         axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        setText(`City: ${data.city}`);
    })
    .catch((error) => {
        setText(error);
    });
}

export function final() {
    showWaiting();
    axios.get('http://localhost:3000/orders/1')
    .then(({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        setText(`City: ${data.city}`);
    })
    .catch((error) => {
        setText(error);
    })
    .finally(() => {
        setTimeout(() => {
            hideWaiting();
        },1500);

        appendText(' -- Completely Done');
    });
}
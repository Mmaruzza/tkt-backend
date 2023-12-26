const pooldata = require('./poolpg')

const getDBProduct = (id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT * FROM public.f_ticketera_product_get_product_by_id($1);', [id], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0]);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const createDBProduct = (nombre, modelo, habilitado, marca_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_product_create($1,$2,$3,$4)', [nombre, modelo, habilitado, marca_id], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_product_create);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const deleteDBProduct = (id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_product_delete($1)', [id], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0]['ok']);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });

    return return_promise;
}

const updateDBProduct = (id, nombre, modelo, habilitado, marca_id) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from public.f_ticketera_product_update($1,$2,$3,$4,$5)', [id, nombre, modelo, habilitado, marca_id], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_product_update);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });


    return return_promise;
}

module.exports = {
    getDBProduct,
    createDBProduct,
    deleteDBProduct,
    updateDBProduct

}

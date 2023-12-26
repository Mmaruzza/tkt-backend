const { response } = require('express');
const { getDBProduct, createDBProduct, updateDBProduct, deleteDBProduct } = require('../databases/queries_products');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getProduct = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { label } = req;
    const { id } = req.body;

    let function_enter_time = new Date();
    logger.info(`getProduct. id:${id}`)
    try {

        getDBProduct(id)
            .then(result => {
                logger.info(`<== getProduct`);
                loggerCSV.info(`getProduct, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: { product: result },
                    msg: 'Listado de productos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getProduct => getProduct : params=> id=${id} error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getDBProduct : params=> id=${id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de productos.'
        });
    }
}

const createProduct = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    const { label } = req;

    const { nombre, modelo, habilitado, marca_id } = req.body;

    logger.info(`createProduct nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} `)

    try {

        createDBProduct(nombre, modelo, habilitado, marca_id)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { product: result },
                    msg: `Producto ${nombre} creado correctamente con id: ${nombre}`
                });
            })
            .catch(dataError => {
                logger.error(`createProduct => createDBProduct : params=> nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear el producto. `
                });
            });

    } catch (error) {
        logger.error(`createBrand => createDBProduct : params=> nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateProduct = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { label } = req;

    const { id, nombre, modelo, habilitado, marca_id } = req.body;
    logger.info(`updateProduct nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} `)

    try {
        updateDBProduct(id, nombre, modelo, habilitado, marca_id)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    item: { product: result },
                    msg: `Producto '${nombre}' fue actualizado correctamente.`
                });
            })
            .catch(dataError => {
                logger.error(`updateProduct => updateDBProduct : params=> nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo actualizar el producto '${nombre}' `
                });
            });

    } catch (error) {
        logger.error(`updateProduct : params=> nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteProduct = async (req, res = response) => {

    const { id } = req.body;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteCompany id:${id}`)

    try {
        deleteDBProduct(id)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    item: result,
                    msg: `Producto id: ${id} fue eliminado correctamente`
                });
            })
            .catch(dataError => {
                logger.error(`deleteProduct => deleteDBProduct: params=> id=${id} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo eliminar el producto '${id}' `
                });

            });
    } catch (error) {
        logger.error(`deleteProduct: params=> id=${id} error=> ${error}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: `No se pudo eliminar el producto '${id}' `
        });
    }
}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
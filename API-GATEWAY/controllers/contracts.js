const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const getAllContracts = async (req, res = response) => {
    const { label: username } = req;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> getAllContracts - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllContracts";

    try {
        logger.info(`==> getAllContracts`)
        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, {}, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getAllContracts - username:${username}`);
                loggerCSV.info(`getAllContracts,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Contrato obtenido correctamente.'
                });
            } else {
                logger.error(`getAllContracts : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion loginRouter`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getAllContracts : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getContractsByCompany = async (req, res = response) => {
    const { label: username } = req;
    const { empresa_id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> getContractsByCompany - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getContractsByCompany";

    try {
        logger.info(`getContractsByCompany empresa_id:${empresa_id}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { empresa_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getContractsByCompany - username:${username}`);
                loggerCSV.info(`getContractsByCompany,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Producto obtenido correctamente.'
                });
            } else {
                logger.error(`getContractsByCompany- : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion loginRouter`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getContractsByCompany : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const createContract = async (req, res = response) => {
    const { label: username } = req;
    const { nombre, direccion, telefono, mail } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> createContract - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/createContract";

    try {
        logger.info(`createContract nombre:${nombre} direccion:${direccion} telefono:${telefono} mail:${mail} `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { nombre, direccion, telefono, mail }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== createContract - username:${username}`);
                loggerCSV.info(`createContract,${(new Date() - function_enter_time) / 1000}`)
                const { Contract } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { Contract },
                    msg: 'Contrato creado correctamente.'
                });
            } else {
                logger.error(`createContract : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion loginRouter`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`createContract : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const updateContract = async (req, res = response) => {
    const { label: username } = req;
    const { id } = req.body;
    const { nombre, direccion, telefono, mail, habilitado } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> updateContract - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/updateContract`;

    try {

        logger.info(`updateContract id:${id} nombre:${nombre} direccion:${direccion} telefono:${telefono} mail:${mail} habilitado:${habilitado}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { id, nombre, direccion, telefono, mail, habilitado }, 'PUT');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== updateContract - username:${username}`);
                loggerCSV.info(`updateContract,${(new Date() - function_enter_time) / 1000}`)
                const { Contract } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { Contract },
                    msg: 'Contrato actualizado correctamente.'
                });
            } else {
                logger.error(`updateContract : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    //  value: body.value,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion loginRouter`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }
    } catch (error) {
        logger.error(`updateContract : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteContract = async (req, res = response) => {

    const { label: username } = req;
    const { id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> deleteContract - username:${username}`);

    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/deleteContract`;

    try {
        const rol = await getUserRol(username)
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== deleteContract - id:${id}`);
                loggerCSV.info(`updateContract,${(new Date() - function_enter_time) / 1000}`)
                const { Contract } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { Contract },
                    msg: 'Contrato actualizado correctamente.'
                });
            } else {
                logger.error(`deleteContract : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion loginRouter`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }
    } catch (error) {
        logger.error(`deleteContract : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    createContract,
    updateContract,
    deleteContract,
    getAllContracts,
    getContractsByCompany
}